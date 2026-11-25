# Reproduksibilitas dan lineage

[Indeks dokumentasi](README.md) · [English](../en/reproducibility.md) · [Repository README](../../README.md)

**Sumber rujukan:** `notebooks/WasteSort_Day41_Kaggle.ipynb`, `reports/run_manifest.json`, `reports/champion_selection.json`, `reports/leakage_audit.json`, `reports/heldout_test_metrics.json`, `reports/training_history.csv`, `reports/trashnet_external_check.json`. Dataset Kaggle: `/kaggle/input/datasets/wafabila/wastesort-mini-dataset`. Seed 42; Python 3.13.16, torch 2.11.0+cu130, torchvision 0.26.0+cu130, sklearn 1.6.1 menurut manifest. Perubahan versi library dapat mengubah hasil.

**Reproduksi:** (1) dapatkan RealWaste sesuai lisensi; (2) pasang input Kaggle atau sesuaikan path notebook; (3) jalankan sel dari awal dengan seed; (4) pastikan 4.752 gambar dan split 3.326/713/713; (5) verifikasi hash anti-leakage; (6) periksa seleksi champion dari validation; (7) baca metrik held-out serta keterbatasan eksternal; (8) ekspor checkpoint `.pt` dan metadata lokal; (9) simpan checkpoint tepercaya di `models/mobilenetv3_best.pt`; (10) jalankan API health/ready, satu foto uji dan build frontend.

**Jangan menyamakan eksperimen berbeda:** notebook dengan versi/split berubah adalah eksperimen baru. Simpan environment, lineage dan SHA-256 bobot model jika tersedia. Git tidak memuat model atau arsip dataset asli. Kaggle GPU berbeda dengan laptop CPU.

## Bukti dan tindak lanjut

Angka dan kode asli terlacak dalam `reports/`, `notebooks/`, `backend/`, dan `frontend/` di root repository. Jika eksperimen baru mengubah hasil, perbarui KEDUA bahasa serta tautkan artefak baru tanpa menghapus bukti lama yang dapat direproduksi.
