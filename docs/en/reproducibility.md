# Reproducibility and experiment lineage

[Documentation index](README.md) · [Indonesian](../id/reproducibility.md) · [Repository README](../../README.md)

**Sources of truth:** `notebooks/WasteSort_Day41_Kaggle.ipynb`, `reports/run_manifest.json`, `reports/champion_selection.json`, `reports/leakage_audit.json`, `reports/heldout_test_metrics.json`, `reports/training_history.csv` and `reports/trashnet_external_check.json`. Kaggle path used: `/kaggle/input/datasets/wafabila/wastesort-mini-dataset`. Seed 42, Python 3.13.16, torch 2.11.0+cu130, torchvision 0.26.0+cu130, sklearn 1.6.1 per manifest. Different library versions can alter numerical outcomes.

**Replay:** (1) obtain RealWaste under its original license; (2) attach the Kaggle input or adjust notebook paths; (3) run notebook from top with seeded split; (4) verify 4,752 accepted images and 3,326/713/713 counts; (5) confirm exact-hash leakage gate; (6) review validation champion selection; (7) inspect held-out metrics and external-check caveats; (8) export `.pt` checkpoint and metadata locally; (9) place trusted checkpoint at `models/mobilenetv3_best.pt`; (10) run API health/ready, test single-photo inference and frontend build.

**Do not fabricate parity:** a notebook executing with different version/splits is a new experiment. Preserve environment, data lineage and SHA-256 of exported weights when available. Git does not include model bytes or raw source archives. Network and hardware may differ between Kaggle GPU and local CPU.

## Evidence and follow-up

Primary figures and code are versioned in the root repository: `reports/`, `notebooks/`, `backend/` and `frontend/`. If later experiments change results, update BOTH translations and link the new artifacts, retaining earlier reproducible evidence.
