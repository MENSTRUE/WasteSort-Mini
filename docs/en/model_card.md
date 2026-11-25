# Model card

[Documentation index](README.md) · [Indonesian](../id/model_card.md) · [Repository README](../../README.md)

**Model name:** WasteSort Mini MobileNetV3-Small. **Type:** 9-way image classifier, checkpoint `models/mobilenetv3_best.pt` available locally and excluded from Git. **Framework:** torchvision + PyTorch. **Intended use:** educational classification of an image resembling RealWaste categories. **Not intended:** hazardous-waste triage, sorting machinery, polymer/resin verification, local recycling eligibility or public-safety decisions.

**Input:** single JPEG/PNG/WebP image, ≤10 MiB via API; EXIF-corrected RGB, resize 256, center crop 224, ImageNet mean `[0.485,0.456,0.406]` and std `[0.229,0.224,0.225]`. **Output:** nine ordered labels, ranked uncalibrated softmax scores, winner and cautionary tip. Class order must be read from trusted checkpoint and validated against expected vocabulary.

**Evidence:** RealWaste held-out (713): accuracy 0.9018, macro-F1 0.9103. TrashNet shifted five-class subset (2,390): 0.3544 accuracy. **Important bias/limitations:** unverified near duplicates/collection-source overlap; mixed-material objects; different image backgrounds; not uncertainty calibrated; limited field representativeness. Low confidence is not automatically an out-of-distribution detector. Performance should not be described as recycling accuracy.

**Loading/security:** backend requires a checkpoint dictionary with `model` state_dict and `classes`; `torch.load(weights_only=True)` and strict state_dict loading. Only load trusted artifacts, verify provenance and hash. There is no auto-download fallback. A `ready:true` status only confirms loaded parameters, not performance.

## Evidence and follow-up

Primary figures and code are versioned in the root repository: `reports/`, `notebooks/`, `backend/` and `frontend/`. If later experiments change results, update BOTH translations and link the new artifacts, retaining earlier reproducible evidence.
