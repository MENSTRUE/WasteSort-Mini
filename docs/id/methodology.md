# Metodologi

[Indeks dokumentasi](README.md) · [English](../en/methodology.md) · [Repository README](../../README.md)

Alur: (1) ambil RealWaste dari UCI, (2) audit decoding gambar dan taksonomi kelas, (3) kelompokkan duplikat hash piksel RGB identik, (4) stratifikasi 3.326 train / 713 validation / 713 test, (5) latih baseline klasik dan MobileNetV3-Small pretrained pada training, (6) pilih model berdasar macro-F1 validation, (7) evaluasi model beku pada test RealWaste, (8) cek pergeseran domain TrashNet terpisah, (9) ekspor checkpoint dan laporan.

Seed tercatat: 42. Epoch terpilih 12; riwayat training berada di `reports/training_history.csv`. Notebook `notebooks/WasteSort_Day41_Kaggle.ipynb` menjadi rujukan hyperparameter, augmentasi dan optimizer yang belum tertulis di manifest. Jangan menebak konfigurasi dari nama grafik. API menggunakan koreksi EXIF, RGB, `Resize(256)`, `CenterCrop(224)`, `ToTensor()`, serta normalisasi ImageNet. Ini klasifikasi, bukan segmentasi, penghitungan objek atau identifikasi resin.

**Batasan leakage:** overlap hash RGB identik nol, namun independensi pengambilan gambar per lokasi/adegan dan near-duplicate perceptual belum terbukti. Kalibrasi, ketahanan pada benda multibahan dan kesesuaian aturan pembuangan lokal belum dievaluasi.

## Bukti dan tindak lanjut

Angka dan kode asli terlacak dalam `reports/`, `notebooks/`, `backend/`, dan `frontend/` di root repository. Jika eksperimen baru mengubah hasil, perbarui KEDUA bahasa serta tautkan artefak baru tanpa menghapus bukti lama yang dapat direproduksi.
