# Limitations and claim boundaries

[Documentation index](README.md) · [Indonesian](../id/limitations.md) · [Repository README](../../README.md)

**Research validity:** RealWaste held-out samples are stratified at image/hash level, not certified independent by scene, site or source. Exact RGB hash overlap is zero; perceptual near-duplicates are not exhaustively assessed. Reported 90.18% accuracy and 91.03% macro-F1 apply to the tested RealWaste split only. TrashNet five-class shifted subset accuracy is 35.44%, so cross-domain deployment is not established.

**Product limits:** a predicted `Plastic` category says nothing about PET/HDPE/PP resin, contamination, recyclability or local acceptance. Mixed-material, hazardous, low-light, blurry and out-of-domain objects can be misclassified. Softmax scores are not calibrated confidence or statistical guarantees. Caution text is general, not legal, environmental or municipal advice.

**Operational limits:** local only, no authentication or rate limiting, no scalable queue/observability, no deployed database, no independently confirmed privacy/security review. Checkpoint binaries are not stored in GitHub. Source-photo redistribution rights need verification (nine demo RealWaste JPGs are currently tracked). Progress must be recorded as implemented, experimentally verified or planned, without conflating these states.

**Acceptance priorities:** reproducible independent field dataset; group-aware or near-duplicate audit; per-class and shifted-domain evaluation; calibration and abstention tests; inference security tests; real checkpoint e2e; licensing cleanup before publicity.

## Evidence and follow-up

Primary figures and code are versioned in the root repository: `reports/`, `notebooks/`, `backend/` and `frontend/`. If later experiments change results, update BOTH translations and link the new artifacts, retaining earlier reproducible evidence.
