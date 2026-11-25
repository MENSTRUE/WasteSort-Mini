# Day 41 — Local deployment

Backend runs on localhost `127.0.0.1:8000` and frontend on `127.0.0.1:5173`.

## Inference contract
- POST `/api/v1/predict` with multipart `file`; accepted JPEG/PNG/WebP, <= 10 MB.
- Uses actual `models/mobilenetv3_best.pt` Kaggle checkpoint, `weights_only=True`.
- Image transform: EXIF transpose, RGB, resize 256, center crop 224, tensor + ImageNet normalization.
- 9 original RealWaste categories as specified in checkpoint, no mock predictions.
- Frontend history is ephemeral session state only.

## Safety and limitations
- Local API has no authentication. Do not expose port 8000 to a public internet interface without auth, rate limiting, and monitoring.
- Input image classification is not a reliable assessment of chemical composition or municipal recycling eligibility.
- Confidence comes from uncalibrated softmax.
- TrashNet out-of-domain performance substantially lower than RealWaste held-out test.
- README LICENSE applies to original software only; model weights and datasets retain upstream restrictions.
