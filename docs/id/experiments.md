# Desain eksperimen

[Indeks dokumentasi](README.md) · [English](../en/experiments.md) · [Repository README](../../README.md)

Notebook membandingkan baseline non-deep dengan MobileNetV3-Small. Manifest mencatat **macro-F1 validasi baseline 0,3350**, **macro-F1 validasi MobileNetV3 0,9026**, dan **epoch terbaik 12**. Model dipilih dari macro-F1 validation, dengan aturan seri memilih baseline yang lebih sederhana. Test held-out tidak dipakai untuk seleksi.

`reports/training_history.csv` berisi jejak 12 epoch berupa training loss dan metrik validasi. Gunakan untuk analisis under-/over-fitting, bukan memilih ulang epoch setelah melihat test. Akurasi test RealWaste 0,9018 dan macro-F1 0,9103 berbeda dari akurasi subset lima kelas TrashNet 0,3544. Ada kesenjangan generalisasi, namun perbedaan kelas, latar dan karakter foto mencegah atribusi kepada satu penyebab saja.

**Eksperimen berikutnya:** test foto baru atau pemisahan sumber; augmentasi lebih kuat; analisis kesalahan per kelas; kurva kalibrasi/ECE; kebijakan abstain; eksperimen beberapa seed. Ini semua **rencana**, belum hasil yang sudah terbukti.

## Bukti dan tindak lanjut

Angka dan kode asli terlacak dalam `reports/`, `notebooks/`, `backend/`, dan `frontend/` di root repository. Jika eksperimen baru mengubah hasil, perbarui KEDUA bahasa serta tautkan artefak baru tanpa menghapus bukti lama yang dapat direproduksi.
