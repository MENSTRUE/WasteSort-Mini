# WasteSort Mini — Full Stack App V1

## What it does
A modern blue-gray React app powered by real Kaggle MobileNetV3-Small inference through FastAPI. It supports image drag and drop, validation, preview, rank probabilities, contextual sorting notes, current-session history, model readiness, and model metadata.

## Installation (Windows PowerShell)

Start terminal at project root `D:\porto\100 day\day 41`.

### Backend (terminal 1)
```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\START_BACKEND.ps1
```
Requires Python 3.11 via `py -3.11` and installed model file `models/mobilenetv3_best.pt`. Installing CPU torch and dependencies requires internet. Run at http://127.0.0.1:8000/docs .

### Frontend (terminal 2)
```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\START_FRONTEND.ps1
```
Requires Node.js + npm, browse http://127.0.0.1:5173 .

### Checks
```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/v1/ready
Invoke-RestMethod http://127.0.0.1:8000/api/v1/model
```

### API test
```powershell
cd backend
.\.venv\Scripts\python.exe -m pip install pytest httpx
.\.venv\Scripts\python.exe -m pytest -q
```

### Frontend build
```powershell
cd frontend
npm run build
```

## Checkpoint compatibility
The Kaggle Day 41 checkpoint must contain `{'model': state_dict, 'classes': original_class_names, ...}`. The backend loads `torchvision.models.mobilenet_v3_small(weights=None)`, changes its final classifier layer, and restores state_dict (strict=True). It uses no internet at inference.

## Dataset and model licensing
MIT in the repository covers original code; data and third-party weights have their own conditions. Avoid committing large model binaries to GitHub.
