# Methodology

[Documentation index](README.md) · [Indonesian](../id/methodology.md) · [Repository README](../../README.md)

Pipeline: (1) collect primary UCI RealWaste, (2) validate image decode/class taxonomy, (3) group exact decoded-RGB duplicates, (4) stratify into 3,326 train / 713 validation / 713 test, (5) fit classical baseline and pretrained lightweight MobileNetV3-Small on training only, (6) select using validation macro-F1, (7) evaluate the frozen model on RealWaste held-out test, (8) check TrashNet domain shift separately, (9) export checkpoint and report artifacts.

Recorded seed: 42. The selected epoch is 12; the training history is recorded at `reports/training_history.csv`. Notebook `notebooks/WasteSort_Day41_Kaggle.ipynb` is the authority on unlisted hyperparameters, augmentation and optimizer settings. Do not infer them from chart names. The API uses RGB EXIF orientation correction, `Resize(256)`, `CenterCrop(224)`, `ToTensor()`, ImageNet normalization. This is a classification task: it returns one dominant label, not segmentation, counts or resin chemistry.

**Leakage caveat:** zero exact RGB-pixel-hash overlap was checked, but source-scene grouping and perceptual-near-duplicate independence were not established. Calibration, robustness to mixed-material objects and local disposal suitability were not evaluated.

## Evidence and follow-up

Primary figures and code are versioned in the root repository: `reports/`, `notebooks/`, `backend/` and `frontend/`. If later experiments change results, update BOTH translations and link the new artifacts, retaining earlier reproducible evidence.
