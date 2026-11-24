# WasteSort Mini

**Day 41 — 100 Days of Projects**

WasteSort Mini is a computer vision project for
classifying waste materials from photographs.

## Project Overview

- Task: Image classification
- Dataset: RealWaste (UCI)
- Model: MobileNetV3-Small
- Classes: 9 original RealWaste categories
- External evaluation: TrashNet
- Backend: FastAPI (planned)
- Frontend: React (planned)

## Machine Learning Workflow

1. Dataset provenance and audit
2. Duplicate and leakage checks
3. Stratified train/validation/test split
4. Baseline experiments
5. MobileNetV3-Small training
6. Validation-based checkpoint selection
7. Held-out test evaluation
8. External dataset evaluation
9. Export inference artifacts

## Preliminary Results

The Kaggle experiment achieved approximately
90% held-out classification accuracy.

External evaluation showed substantial
cross-dataset generalization limitations.

Detailed metrics and their exact provenance
will be stored in reports/.

## Repository Structure

- notebooks/ — ML experiments
- models/ — model metadata and documentation
- reports/ — evaluation and provenance
- assets/ — plots, examples and screenshots
- backend/ — FastAPI application
- frontend/ — React application
- docs/ — technical documentation
- scripts/ — utilities

## Data Policy

Raw datasets and large trained weights are
not committed to Git.

Dataset sources, licenses and access instructions
must be documented before redistribution.

## Limitations

Predictions do not establish whether a material
is accepted by a local recycling facility.

Results on one dataset do not guarantee
generalization to real-world waste photographs.

## License

MIT License applies to original repository code
and documentation unless stated otherwise.

Third-party datasets and pretrained weights
retain their respective licenses.
