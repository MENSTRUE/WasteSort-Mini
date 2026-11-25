# WasteSort Mini — English technical documentation

[Main README](../../README.md) · [Bahasa Indonesia](../id/README.md)

This manual documents the implemented nine-class RealWaste research prototype and its scientific boundaries. It is not a production assurance report.

## Detailed chapters

- [Data provenance and licensing](dataset_provenance.md)
- [Training and preprocessing methodology](methodology.md)
- [Experiments and champion selection](experiments.md)
- [Model card / intended use](model_card.md)
- [Held-out and external evaluation](evaluation.md)
- [Architecture and API contracts](architecture.md)
- [Reproducibility](reproducibility.md)
- [Local setup and production readiness](deployment.md)
- [Limitations and claim boundaries](limitations.md)
- [Troubleshooting](troubleshooting.md)

## Current evidence snapshot

| Evidence | Value |
|---|---|
| RealWaste usable images | 4,752 |
| Train / validation / test | 3,326 / 713 / 713 |
| RealWaste held-out accuracy | 90.18% |
| RealWaste held-out macro-F1 | 91.03% |
| TrashNet shifted five-class accuracy | 35.44% |

A Git clone does not include the trusted checkpoint `models/mobilenetv3_best.pt`. Refer to the notebook and model README before serving inference.
