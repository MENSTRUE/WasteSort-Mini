# Dataset provenance and licensing

[Documentation index](README.md) · [Indonesian](../id/dataset_provenance.md) · [Repository README](../../README.md)

**Primary:** UCI RealWaste ([dataset 908](https://archive.ics.uci.edu/dataset/908/realwaste)); experiment path `realwaste_uci/realwaste-main/RealWaste` inside `/kaggle/input/datasets/wafabila/wastesort-mini-dataset/`. The experiment retained 4,752 usable images across nine labels: Cardboard, Food Organics, Glass, Metal, Miscellaneous Trash, Paper, Plastic, Textile Trash and Vegetation. No training on TrashNet is asserted by the run manifest.

**External evaluation:** [TrashNet](https://github.com/garythung/trashnet), Kaggle path `trashnet_images/dataset-resized`, assessed as a five-overlapping-class shifted-domain subset over 2,390 images. The classifier still has nine outputs; its 35.44% subset accuracy is not a nine-class RealWaste test metric. Source access was recorded on 2026-11-23 UTC in `reports/dataset_provenance.json`.

**Licenses:** Kaggle provenance lists RealWaste as CC BY 4.0 (verify the canonical UCI attribution and any original-holder requirements). The TrashNet license for this intended use remains under review. MIT in `LICENSE` applies only to original repository code. Nine RealWaste demo photos are already tracked at `assets/examples/manual_test`; verify redistribution permission and attribution before public use. Do not assume a Kaggle-hosted archive transfers copyright.

**Integrity:** `reports/leakage_audit.json` reports zero exact RGB pixel-hash overlap across splits and no excluded conflicting-label hashes. There is no exhaustive near-duplicate review or verified scene/source-disjoint split. Images and labels should not be redistributed as part of a model package without consent and clear license obligations. **Data size is not the effective independently collected sample count.**

## Evidence and follow-up

Primary figures and code are versioned in the root repository: `reports/`, `notebooks/`, `backend/` and `frontend/`. If later experiments change results, update BOTH translations and link the new artifacts, retaining earlier reproducible evidence.
