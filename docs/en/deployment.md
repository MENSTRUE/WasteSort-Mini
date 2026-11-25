# Local deployment and production boundaries

[Documentation index](README.md) · [Indonesian](../id/deployment.md) · [Repository README](../../README.md)

**Supported evidence is local development**, not public production deployment. From project root on Windows PowerShell: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\scripts\START_BACKEND.ps1"` and in a separate console `powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\scripts\START_FRONTEND.ps1"`. Backend on `127.0.0.1:8000`, frontend on `127.0.0.1:5173`. Requires Python 3.11 (startup script), a compatible CPU PyTorch+torchvision pair, FastAPI dependencies, Node.js, npm, and a local trusted `.pt` checkpoint.

**Check:** `Invoke-RestMethod http://127.0.0.1:8000/api/v1/health` then `/api/v1/ready` (must show true) and `/api/v1/model`; run frontend `npm.cmd run build`. Test an uploaded image through the UI; check `POST /api/v1/predict` has nine rankings. Health success alone does not establish readiness. `MODEL_PATH` overrides local checkpoint location; `CORS_ORIGINS` supplies comma-separated allowed origins; `VITE_API_BASE_URL` selects client API base URL.

**Security before public release:** authenticated access, rate limits, DoS and decompression bomb testing, request concurrency limits, HTTPS, privacy notice, access logging policy, sandbox/patching, dependency pinning, external model validation, resource quotas, public-facing CORS policy, monitoring and incident handling. Currently **not implemented**. Do not expose the development server to the internet. `README_APP.md` and `docs/DEPLOYMENT.md` remain retained as earlier local-setup notes.

## Evidence and follow-up

Primary figures and code are versioned in the root repository: `reports/`, `notebooks/`, `backend/` and `frontend/`. If later experiments change results, update BOTH translations and link the new artifacts, retaining earlier reproducible evidence.
