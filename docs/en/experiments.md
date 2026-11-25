# Experiment design and selection

[Documentation index](README.md) · [Indonesian](../id/experiments.md) · [Repository README](../../README.md)

The notebook compares a non-deep baseline with MobileNetV3-Small. The manifest records **baseline validation macro-F1 0.3350**, **MobileNetV3 validation macro-F1 0.9026**, and **best deep epoch 12**. Champion selection uses higher validation macro-F1; the declared tie-breaker favors the simpler baseline. Held-out test was not the selection criterion.

The 12-epoch `reports/training_history.csv` is a trace of training loss and validation metrics. Use it to diagnose under-/over-fitting; do not select an improved epoch after observing test outcomes. The RealWaste test accuracy 0.9018 and macro-F1 0.9103 are separate from TrashNet's 0.3544 five-class subset. The external result reveals a generalization gap, but differences in classes, backgrounds and photographic domain prevent attributing it solely to any single cause.

**Next experiments:** source-separated or new-photo test collection; stronger augmentations; class-aware error analysis; calibration curve/ECE; conservative abstention policy; repeat with independent seeds. These are **planned**, not reported completed experiments.

## Evidence and follow-up

Primary figures and code are versioned in the root repository: `reports/`, `notebooks/`, `backend/` and `frontend/`. If later experiments change results, update BOTH translations and link the new artifacts, retaining earlier reproducible evidence.
