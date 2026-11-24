# WasteSort Mini — Engineering Rules

## Repository

Preserve the established repository structure.

Do not create or commit a datasets/ directory.

Use .gitkeep for empty project directories.

## Data

Record original dataset URLs, versions, licenses,
download dates and limitations.

Never publish raw dataset images without permission.

Check corrupt images, class labels and duplicates.

Prevent train/validation/test leakage.

## Machine Learning

Use reproducible random seeds.

Train using training data only.

Select checkpoints using validation only.

Evaluate held-out test after selection.

Report accuracy, macro-F1, per-class metrics,
confusion matrix and external-domain limitations.

## Deployment

Keep secrets out of Git.

Validate model inputs.

Do not claim real-world recycling accuracy
without independent evaluation.
