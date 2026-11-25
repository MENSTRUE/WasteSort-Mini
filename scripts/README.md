# Windows development utilities

Two PowerShell 5.1 entrypoints are tracked:

| Script | Purpose | Caveats |
|---|---|---|
| `START_BACKEND.ps1` | Creates Python 3.11 venv if missing; installs torch/torchvision if unavailable and backend dependencies; starts uvicorn on loopback port 8000 | First torch installation may be large; script does not establish model accuracy |
| `START_FRONTEND.ps1` | `npm install` if `node_modules` missing; starts Vite | Does not perform production build; use `npm.cmd run build` manually |

## Usage
```powershell
cd "D:\porto@ day\day 41"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\scripts\START_BACKEND.ps1"
# Second terminal:
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\scripts\START_FRONTEND.ps1"
```

Prefer explicit `npm.cmd` in interactive PowerShell if `npm.ps1` is blocked. `-ExecutionPolicy Bypass` only applies to the launched subprocess, but only execute trusted project scripts after reviewing them. The scripts do not publish to GitHub, download source datasets, or upload pictures. Validate `/api/v1/ready` and real single-image prediction before accepting a local end-to-end PASS. For fixes see [`../docs/en/troubleshooting.md`](../docs/en/troubleshooting.md) or [`../docs/id/troubleshooting.md`](../docs/id/troubleshooting.md).
