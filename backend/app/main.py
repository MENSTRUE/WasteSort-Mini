"""WasteSort Mini — real MobileNetV3 inference API (no mock predictions)."""
from __future__ import annotations
import io
import json
import os
import threading
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageOps, UnidentifiedImageError

BASE = Path(__file__).resolve().parents[2]
MODEL_PATH = Path(os.environ.get("MODEL_PATH", str(BASE / "models" / "mobilenetv3_best.pt")))
METRICS_PATH = BASE / "reports" / "heldout_test_metrics.json"
MAX_BYTES = 10 * 1024 * 1024
IMAGE_DIMENSION_LIMIT = 12_000
DEFAULT_CLASSES = ["Cardboard", "Food Organics", "Glass", "Metal", "Miscellaneous Trash", "Paper", "Plastic", "Textile Trash", "Vegetation"]
TIPS = {
    "Cardboard": "Kardus bersih bisa memiliki jalur pemilahan tersendiri. Periksa ketentuan daerahmu.",
    "Food Organics": "Sisa makanan mungkin cocok untuk pengomposan jika fasilitas tersedia.",
    "Glass": "Pisahkan kaca dengan hati-hati; hindari memasukkan pecahan tajam tanpa pengamanan.",
    "Metal": "Periksa apakah fasilitas setempat menerima jenis logam ini.",
    "Miscellaneous Trash": "Material campuran sering memerlukan pemeriksaan manual lebih lanjut.",
    "Paper": "Kertas kering dan bersih lebih mudah dipilah, tetapi aturan berbeda menurut lokasi.",
    "Plastic": "Foto saja tidak cukup untuk memastikan jenis resin atau apakah plastik bisa didaur ulang.",
    "Textile Trash": "Pertimbangkan penggunaan ulang atau program penampungan tekstil setempat.",
    "Vegetation": "Daun dan sisa tanaman mungkin dapat diolah menjadi kompos.",
}

class ModelStore:
    model: Any = None
    classes: list[str] = []
    error: str | None = None
    loaded: bool = False
    lock = threading.Lock()

store = ModelStore()

def load_model() -> None:
    """Load a trusted local Kaggle checkpoint, without downloading network weights."""
    with store.lock:
        if store.loaded:
            return
        store.loaded = True
        if not MODEL_PATH.is_file():
            store.error = f"Checkpoint not found: {MODEL_PATH}"
            return
        try:
            import torch
            from torch import nn
            from torchvision import models
            # PyTorch weights_only avoids general-purpose pickle deserialization.
            checkpoint = torch.load(MODEL_PATH, map_location="cpu", weights_only=True)
            if not isinstance(checkpoint, dict) or "model" not in checkpoint:
                raise ValueError("Expected Kaggle checkpoint with 'model' state_dict")
            classes = checkpoint.get("classes")
            if not isinstance(classes, (list, tuple)) or len(classes) != 9 or len(set(classes)) != 9:
                raise ValueError("Checkpoint must contain 9 unique class names")
            classes = [str(x) for x in classes]
            if set(classes) != set(DEFAULT_CLASSES):
                raise ValueError("Checkpoint classes differ from expected RealWaste 9-class taxonomy")
            net = models.mobilenet_v3_small(weights=None)
            net.classifier[3] = nn.Linear(net.classifier[3].in_features, len(classes))
            net.load_state_dict(checkpoint["model"], strict=True)
            net.eval()
            store.model = net
            store.classes = classes
            store.error = None
        except Exception as exc:
            store.error = f"{type(exc).__name__}: {exc}"
            store.model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    load_model()
    yield

app = FastAPI(title="WasteSort Mini API", version="1.0.0", lifespan=lifespan)
allowed = [v.strip() for v in os.environ.get("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",") if v.strip()]
app.add_middleware(CORSMiddleware, allow_origins=allowed, allow_credentials=False,
                   allow_methods=["GET", "POST"], allow_headers=["Content-Type"])

@app.get("/api/v1/health")
def health():
    return {"status": "ok", "service": "WasteSort Mini", "version": app.version}

@app.get("/api/v1/ready")
def ready():
    return {"ready": store.model is not None, "model_loaded": store.model is not None,
            "checkpoint_found": MODEL_PATH.is_file(), "model_name": "MobileNetV3-Small",
            "classes": store.classes if store.model is not None else DEFAULT_CLASSES,
            "error": store.error}

@app.get("/api/v1/model")
def model_info():
    metrics = None
    if METRICS_PATH.is_file():
        try:
            raw = json.loads(METRICS_PATH.read_text(encoding="utf-8-sig"))
            metrics = {"test_accuracy": raw.get("test_accuracy"),
                       "test_macro_f1": raw.get("test_macro_f1"),
                       "test_images": raw.get("test_images"),
                       "champion": raw.get("champion")}
        except (ValueError, OSError):
            pass
    return {"name": "MobileNetV3-Small", "dataset": "RealWaste", "task": "9-class waste material classification",
            "input_size": 224, "classes": store.classes if store.model is not None else DEFAULT_CLASSES,
            "metrics": metrics,
            "limitations": ["Image classification does not establish recyclability.",
                            "External TrashNet performance is substantially lower; domain shift remains.",
                            "Model is not calibrated for high-stakes material identification."]}

@app.post("/api/v1/predict")
async def predict(file: UploadFile = File(...)):
    if store.model is None:
        raise HTTPException(status_code=503, detail={"code": "MODEL_NOT_READY", "message": store.error or "Model not loaded"})
    if file.content_type not in {"image/jpeg", "image/png", "image/webp"}:
        raise HTTPException(status_code=415, detail="Use JPEG, PNG or WEBP image")
    content = await file.read(MAX_BYTES + 1)
    if not content or len(content) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="Image must be nonempty and at most 10 MB")
    try:
        with Image.open(io.BytesIO(content)) as source:
            if source.format not in {"JPEG", "PNG", "WEBP"}:
                raise HTTPException(status_code=415, detail="Unsupported image format")
            if max(source.size) > IMAGE_DIMENSION_LIMIT:
                raise HTTPException(status_code=413, detail="Image dimensions exceed allowed limit")
            image = ImageOps.exif_transpose(source).convert("RGB")
            image.load()
    except HTTPException:
        raise
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError) as exc:
        raise HTTPException(status_code=422, detail="Unable to decode a valid image") from exc
    import torch
    from torchvision import transforms
    tf = transforms.Compose([transforms.Resize(256), transforms.CenterCrop(224),
         transforms.ToTensor(), transforms.Normalize([.485,.456,.406],[.229,.224,.225])])
    tensor = tf(image).unsqueeze(0)
    with store.lock, torch.inference_mode():
        probabilities = torch.softmax(store.model(tensor), dim=1).squeeze(0).tolist()
    ranked = sorted([{"label": name, "probability": round(float(prob), 6)}
                     for name, prob in zip(store.classes, probabilities)],
                     key=lambda row: row["probability"], reverse=True)
    winner = ranked[0]
    return {"label": winner["label"], "confidence": winner["probability"],
            "rankings": ranked, "tip": TIPS.get(winner["label"], "Periksa aturan pemilahan daerahmu."),
            "image": {"width": image.width, "height": image.height},
            "model": "MobileNetV3-Small", "disclaimer": "AI estimation, not confirmed recycling guidance"}
