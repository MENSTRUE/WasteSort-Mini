# Local model registry and inference contract

## Checkpoint
`mobilenetv3_best.pt` is the local Kaggle MobileNetV3-Small checkpoint. It is intentionally **not committed** because `.gitignore` excludes PyTorch weights. The backend expects a *trusted dictionary checkpoint* with `model` (`state_dict`) and `classes` (exactly the nine unique RealWaste names), and loads with `torch.load(..., weights_only=True)` and `strict=True`.

## Input/output
JPEG, PNG, WebP file (≤10 MiB), EXIF transpose, RGB, resize 256, center crop 224×224, `ToTensor`, ImageNet mean `[.485,.456,.406]` and std `[.229,.224,.225]`. Output is nine ranked softmax probabilities and the highest category; **probabilities are not calibrated**. API inference uses a shared lock and CPU PyTorch; concurrency/performance has not been benchmarked.

## Evidence
Champion MobileNetV3-Small epoch 12; validation macro-F1 90.26%; held-out 713 images accuracy 90.18%, macro-F1 91.03%. Separate TrashNet shifted five-class subset 35.44% accuracy on 2,390. See `../reports/README.md`, `../docs/en/model_card.md`, `../docs/id/model_card.md`.

## Deployment/readiness
Place your trusted exported Kaggle checkpoint at `models/mobilenetv3_best.pt`; `/api/v1/ready` must return `model_loaded: true`. `ready` is not validation against a new site. Keep checkpoint hash, source notebook commit and label order together. Do not download untrusted `.pt` files or repackage pretrained weight licenses as MIT.
