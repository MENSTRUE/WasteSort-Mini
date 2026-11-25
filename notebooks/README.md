# Experiment notebook and reproducibility

`WasteSort_Day41_Kaggle.ipynb` is the versioned notebook for the Day 41 RealWaste training run. It is a data and model experiment—not a substitute for the FastAPI application or a production training service.

## Inputs and expected results
- Primary: UCI RealWaste via `/kaggle/input/datasets/wafabila/wastesort-mini-dataset/realwaste_uci/realwaste-main/RealWaste`.
- Optional shifted-domain check: TrashNet under `trashnet_images/dataset-resized`.
- Recorded usable sample count 4,752; split 3,326 train / 713 validation / 713 test; seed 42.
- Champion selected on validation macro-F1. Source records: `../reports/champion_selection.json`, `../reports/run_manifest.json`, `../reports/leakage_audit.json`.
- Held-out performance: accuracy 90.18%, macro-F1 91.03%; external subset accuracy 35.44% (do not conflate evaluation protocols).

## Replay checklist
1. Obtain source datasets legally and attach Kaggle Input; paths may need adjustment for another account.
2. Inspect all input folder contents and decode/label audit outputs.
3. Run notebook in cell order with recorded environment or log new dependency versions.
4. Confirm exact RGB hash overlap zero; review potential near duplicates and scene source overlap.
5. Freeze selection before viewing held-out test metrics.
6. Save all JSON/CSV/plots and a trusted checkpoint with its class mapping; **do not commit raw ZIP or `.pt` to Git**.
7. Inspect `../docs/en/reproducibility.md` or `../docs/id/reproducibility.md`.

**Recorded Kaggle runtime:** Python 3.13.16, torch 2.11.0+cu130, torchvision 0.26.0+cu130, sklearn 1.6.1. Actual hyperparameters are determined from the notebook, not invented in this README. Re-running may produce different results with changed versions.
