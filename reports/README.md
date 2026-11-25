# Experiment evidence and interpretation

This folder holds machine-readable results. Treat JSON/CSV as authoritative over summaries. Do not edit source reports to improve metrics or merge validation and held-out test figures.

| File | Contents |
|---|---|
| `run_manifest.json` | Seed, framework, image counts, splits, model and limitations |
| `dataset_provenance.json` | UCI RealWaste / TrashNet paths, dates and license notes |
| `leakage_audit.json` | Exact pixel-hash overlap check, unresolved source/near-duplicate questions |
| `champion_selection.json` | Baseline vs MobileNetV3 validation macro-F1 and epoch 12 selection |
| `training_history.csv` | Epoch-level train loss and validation metrics |
| `heldout_test_metrics.json` | Held-out accuracy 90.18%, macro-F1 91.03%, per-class metrics |
| `trashnet_external_check.json` | 35.44% five-overlapping-class shifted-domain result, 2,390 images |
| `test_predictions.csv`, `split_manifest.csv` | Per-example results and reproducibility split listing |
| `decode_failures.json` | Image reading exceptions in recorded run |
| `artifact_inventory.csv` | File inventory generated during artifact import |

Visual counterparts: [`../assets/plots/class_distribution.png`](../assets/plots/class_distribution.png), [`../assets/plots/test_confusion_matrix.png`](../assets/plots/test_confusion_matrix.png), [`../assets/plots/test_failure_gallery.png`](../assets/plots/test_failure_gallery.png). Full English [evaluation](../docs/en/evaluation.md), Indonesian [evaluasi](../docs/id/evaluation.md). Actual held-out test is *not* a prospective field test.
