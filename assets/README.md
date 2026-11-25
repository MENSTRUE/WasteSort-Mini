# Visual evidence and image licensing

## Committed files
- `plots/class_distribution.png`: nine-class RealWaste distribution evidence.
- `plots/test_confusion_matrix.png`: held-out test confusion matrix.
- `plots/test_failure_gallery.png`: selected failure examples, not a statistically complete error audit.
- `screenshots/Screenshot 2026-11-25 *.png`: nine local interface screenshots from development; public deployment not established.
- `examples/manual_test/test_*.jpg`: nine original RealWaste images currently committed for manual application smoke tests. **These are upstream data photos, not independent test photos.** Confirm RealWaste attribution/redistribution terms before public reuse; their continued repository tracking is a rights-review item.
- `diagrams/`: reserved for approved diagrams; architecture Mermaid currently resides inside Markdown documentation.

## Guidelines
Link existing visuals by relative paths; include accurate captions, provenance and reference metrics. Do not invent screenshots, draw synthetic results or mistake an image preview for experimental performance. Example path from this folder: `![Confusion matrix](plots/test_confusion_matrix.png)`. Exclude private/personally sensitive photographs and all full raw datasets from commits. Prefer add/remove actions only after license review.
