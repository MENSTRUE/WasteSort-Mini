# Troubleshooting guide

[Documentation index](README.md) · [Indonesian](../id/troubleshooting.md) · [Repository README](../../README.md)

**`ImportMeta.env` TS2339:** `frontend/src/vite-env.d.ts` must include `/// <reference types="vite/client" />`; confirm Vite typings and run `npm.cmd run build`.

**`npm install`/esbuild warning:** inspect actual `npm.cmd run build` exit code before assuming failure; package manager permissions may affect native install scripts. Prefer `npm.cmd` on PowerShell when script policy blocks `npm.ps1`.

**`/ready` false or 503:** confirm `models/mobilenetv3_best.pt`, class names and `model` state_dict match API expectations. Check returned `error`; checkpoint should be a trusted Kaggle artifact, not arbitrary `.pt`. Model `weights_only=True` may reject incompatible checkpoints. Restart service after replacing model.

**CORS error:** ensure frontend host exactly matches one of `CORS_ORIGINS`; origins differ by `localhost` versus `127.0.0.1`. Default API URL is `http://127.0.0.1:8000`.

**415 / 413 / 422:** confirm JPEG/PNG/WebP content, MIME, nonempty bytes, file ≤10 MB, max image dimension 12,000 pixels, decodeable image. Test `/health`, then `/ready`, then an actual POST. Uploaded file errors do not prove model failure.

**Empty manual-test folder:** `Day41_Kaggle_Dataset.zip` can be a wrapper containing source archives; sample images are in the nested `realwaste_uci.zip`. Never infer image count from the outer ZIP alone; no need to commit raw images to test an API.

**Missing model after clone:** deliberate `.gitignore`; reproduce from notebook or obtain a trusted checkpoint with matching class list. Do not use random or mock weights as if validated.

## Evidence and follow-up

Primary figures and code are versioned in the root repository: `reports/`, `notebooks/`, `backend/` and `frontend/`. If later experiments change results, update BOTH translations and link the new artifacts, retaining earlier reproducible evidence.
