# WasteSort Mini — Operational Agent Instructions

## Mission and current stage
Day 41 of 100 Days of Projects: RealWaste nine-class image classification; local React frontend and FastAPI inference backend, Kaggle MobileNetV3-Small. **Current:** ML artifacts and source code in GitHub, locally loaded checkpoint excluded. **Next:** rigorous e2e checks, source-disjoint evaluation, calibration, security hardening.

## Authoritative evidence order
1. `backend/app/main.py`, `frontend/src/App.tsx`, package definitions and tests for implemented behavior.
2. `reports/*.json` and the notebook for model training, dataset, splits and numerical results.
3. Existing docs, screenshots, and chat summaries as contextual materials, not substitutes for executable evidence.
4. External source pages solely for licensing and citations; explicitly mark unverified details.

## Filesystem invariants
Keep root files `README.md`, `AGENTS.md`, `LICENSE`, `.gitignore`, `.env.example`; directories `notebooks/`, `models/`, `reports/`, `assets/{plots,examples,screenshots,diagrams}/`, `backend/`, `frontend/`, `docs/`, `scripts/`. **Never create or commit `datasets/`**. Do not relocate existing assets or alter code during documentation-only changes. Check Git status/diff before committing.

## Data / experimental integrity
- Record source URL, revision, license, access date, taxonomy and all cleaning exclusions.
- Keep image hashes from different splits disjoint; group scenes or collection sources where IDs exist.
- Fit transforms and models on training data; choose champion on validation only; report held-out test after freeze.
- Never silently reuse a test set to tune the model; label exploration of a reused test set appropriately.
- Report RealWaste held-out metrics separately from shifted TrashNet five-class accuracy; do not infer cross-domain robustness.
- Confirm class names/order, 224 input crop and normalization against the actual checkpoint.
- Do not fake image predictions, sample data, screenshots, confidence calibration, deployment or training results.

## Backend contracts
- FastAPI endpoints: `GET /api/v1/health`, `/ready`, `/model`, and multipart `POST /predict` under `/api/v1`.
- Input: JPEG/PNG/WebP, max 10 MiB, validate actual image signature/size, avoid unsafe deserialization.
- Missing checkpoint: readiness false, predict 503; never replace with fake predictions.
- Keep CORS limited to explicit development origins; no public port exposure without auth, rate limiting, logging and threat review.
- Tests: health, readiness, model info, missing checkpoint, invalid MIME, bad images, size limit and real-checkpoint inference when available.

## Frontend contracts
- React + TypeScript + Vite. Keep MIME/size validation, accessible upload, error state, backend readiness and score disclaimers synchronized with API.
- Session scan history is ephemeral; do not promise durable privacy guarantees beyond implemented behavior.
- Do not call uncalibrated softmax a reliable confidence interval.
- Build check: `npm.cmd run build`; support responsive and keyboard users. Avoid fake API responses in production UI.

## Documentation and asset policy
- Maintain `docs/en/` and `docs/id/` at equal depth; update both for every factual change.
- Every metric links to a real JSON/CSV record, and rendered README images point to committed files.
- Treat RealWaste sample JPGs as third-party imagery; verify attribution/redistribution before publication.
- Preserve existing `README_APP.md`, `docs/DEPLOYMENT.md`, and licensing metadata.

## Definition of done
All touched tests/builds pass or failures are recorded; no sensitive/raw data committed; docs links resolve; training claims tied to evidence; original images/model binaries not accidentally redistributed; both language versions synchronized; `git diff --check`, `git status`, and commit log inspected.

## Prohibited actions
Fabricating metrics; changing held-out labels to improve scores; overwriting original datasets; adding `datasets/`; exposing secrets; marking local prototype production-ready; changing LICENSE for third-party assets; force pushing without explicit approval; deleting prior evidence on documentation-only work.

## Commit convention
`docs: ...` for documentation; `feat: ...` for actual features; `fix: ...` for tested bug fixes; `test: ...` for tests; `chore: ...` for maintenance. Review `git diff --stat` and check large files before staging.
