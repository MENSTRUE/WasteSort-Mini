# FastAPI service — WasteSort Mini

**Entry point:** `app/main.py`. **Framework:** FastAPI + Pillow + PyTorch/torchvision. Startup lifespan loads the model from `MODEL_PATH` or `../models/mobilenetv3_best.pt`; it does **not** fetch weights or fall back to mock inference. Missing/bad checkpoints return `ready:false` with an `error`, and `POST /predict` returns 503. Reload after changing the checkpoint.

## Endpoints
| Verb | Path | Behavior |
|---|---|---|
| GET | `/api/v1/health` | API process health, not model readiness |
| GET | `/api/v1/ready` | Checkpoint found, loaded, class mapping and load error |
| GET | `/api/v1/model` | Model metadata, class names, held-out summary from JSON if available |
| POST | `/api/v1/predict` | Multipart field `file`, image input and nine ranked class probabilities |

### Predict contract
`multipart/form-data` key `file`; MIME `image/jpeg`, `image/png`, or `image/webp`; maximum 10 MiB; Pillow-confirmed format; max side 12,000 pixels. Returns `label`, `confidence`, `rankings` (`label`, `probability`), `tip`, image dimensions, model name and disclaimer. Failure: 503 model unavailable; 415 type mismatch; 413 file size/dimensions; 422 decode error. Orientation is EXIF corrected. Resize 256, crop 224, normalize with ImageNet values; `torch.inference_mode` processes trusted model weights.

## Local setup (Windows PowerShell)
From repository root run `powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\scripts\START_BACKEND.ps1"`. The script creates `backend/.venv` using Python 3.11 if absent, ensures compatible torch and torchvision, installs `requirements.txt`, then starts `uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload` from backend. API docs: `http://127.0.0.1:8000/docs`.

Run tests: `cd backend; .\.venv\Scripts\python.exe -m pip install pytest httpx; .\.venv\Scripts\python.exe -m pytest -q`. Tests currently cover health, model-info and readiness response shape; invalid-file and real-model end-to-end coverage must be added.

**Security:** CORS default allows localhost/127.0.0.1:5173; `CORS_ORIGINS` can customize. No authentication, rate limiting or public deployment. User images are not intentionally persisted; filesystem persistence and logs should be independently reviewed before deployment. More: [`../docs/en/architecture.md`](../docs/en/architecture.md), [`../docs/id/architecture.md`](../docs/id/architecture.md).
