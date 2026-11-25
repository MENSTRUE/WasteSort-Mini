# Held-out evaluation and error analysis

[Documentation index](README.md) · [Indonesian](../id/evaluation.md) · [Repository README](../../README.md)

The immutable evidence is `reports/heldout_test_metrics.json`, `reports/run_manifest.json` and `reports/trashnet_external_check.json`. Test denominator is **713** images; recorded overall accuracy **90.18%** and macro-F1 **91.03%**. Validation macro-F1 **90.26%** selected the checkpoint at epoch 12. Baseline validation macro-F1 **33.50%**.

| Class | Test n | F1 |
|---|---:|---:|
| Cardboard | 69 | 89.36% |
| Food Organics | 62 | 96.06% |
| Glass | 63 | 91.20% |
| Metal | 118 | 88.51% |
| Miscellaneous Trash | 75 | 85.52% |
| Paper | 75 | 90.91% |
| Plastic | 138 | 86.32% |
| Textile Trash | 48 | 93.75% |
| Vegetation | 65 | 97.67% |

The weakest F1 classes are Miscellaneous Trash and Plastic; examine `assets/plots/test_confusion_matrix.png` and `assets/plots/test_failure_gallery.png` for context, rather than extrapolating failure rates to all environments. Hash checks report no exact RGB overlap but no source-disjointness assurance. TrashNet five-class subset accuracy **35.44%** on 2,390 images highlights domain-shift risk and mapping limitations.

**Not measured:** confidence calibration, sensitivity to lighting/backgrounds, robustness to multi-material items, prospective production inference latency and independent real-world waste sorting accuracy.

## Evidence and follow-up

Primary figures and code are versioned in the root repository: `reports/`, `notebooks/`, `backend/` and `frontend/`. If later experiments change results, update BOTH translations and link the new artifacts, retaining earlier reproducible evidence.
