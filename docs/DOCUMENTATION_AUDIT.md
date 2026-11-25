# Documentation evidence and change audit — 2026-11-25

**Audited repository:** `MENSTRUE/WasteSort-Mini`, branch `main`, commit `b63f9bbd118947ba3ae987f0f5ed8cb15f4a0e1d` as read through GitHub. Documentation patch was prepared against this snapshot. Before applying, compare `git status`, `git diff` and any new commits.

## Evidence read
- Backend: `backend/app/main.py`, `backend/requirements.txt`, `backend/tests/test_api.py`.
- Frontend: `frontend/src/App.tsx`, `frontend/package.json`, environment, `src/vite-env.d.ts` observed in tree.
- Experiments: `reports/heldout_test_metrics.json`, `run_manifest.json`, `champion_selection.json`, `leakage_audit.json`, `dataset_provenance.json`, `trashnet_external_check.json`, `training_history.csv`.
- Legacy documents: `README.md`, `AGENTS.md`, `README_APP.md`, `docs/DEPLOYMENT.md`; last two are preserved unchanged by this patch.
- Asset inventory from Git tree: three experiment plots, nine local screenshots, nine committed original sample JPGs; notebook present. The GitHub connector did not execute source code, run tests or inspect image visual content; filenames prove presence, not result correctness.

## Corrected legacy claims
- Root README previously marked backend/frontend as planned; they now exist and are documented as implemented, with unverified public deployment and field performance.
- Exact held-out metrics from original JSON replace rounded approximate prose.
- TrashNet 35.44% is carefully labeled a five-class subset out-of-domain check, not a nine-class held-out test.
- `assets/examples/manual_test/test_*.jpg` are already committed; redistribution/attribution review remains open.

## Known open items
- No proof of public deployment or independent physical waste-sort validation.
- Checkpoint binary unavailable in Git by policy; no independent checkpoint SHA reported.
- RealWaste demo JPG rights verification should be resolved before further public distribution.
- Full notebook parameter-by-parameter audit and execution not performed during this documentation-only operation.
- Automated test runs, frontend build, all image pixels and external URL HTTP status were not re-executed in this environment.
- Root .gitignore may need to exclude local `assets/examples/manual_test/` for future sample additions; already tracked files are unaffected by new ignore patterns.

## Intended changes
Updates `README.md`, `AGENTS.md`; adds matched docs/en and docs/id chapters plus component README and AGENTS where needed. Does not edit `backend/app/main.py`, `frontend/src/App.tsx`, the Kaggle notebook, reports, images, datasets, license or existing legacy setup documents. Check after applying: `git diff --check`, relative link checker report, `git diff --stat`, no unexpected deleted files.
