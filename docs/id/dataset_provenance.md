# Provenans dataset dan lisensi

[Indeks dokumentasi](README.md) · [English](../en/dataset_provenance.md) · [Repository README](../../README.md)

**Data utama:** UCI RealWaste ([dataset 908](https://archive.ics.uci.edu/dataset/908/realwaste)); lokasi eksperimen `realwaste_uci/realwaste-main/RealWaste` di `/kaggle/input/datasets/wafabila/wastesort-mini-dataset/`. Sebanyak 4.752 gambar layak pakai dari sembilan kelas: Cardboard, Food Organics, Glass, Metal, Miscellaneous Trash, Paper, Plastic, Textile Trash, Vegetation. Manifest tidak menyatakan TrashNet sebagai data training.

**Evaluasi luar domain:** [TrashNet](https://github.com/garythung/trashnet), jalur Kaggle `trashnet_images/dataset-resized`, evaluasi subset lima kelas yang saling berkaitan atas 2.390 gambar. Model tetap menghasilkan sembilan kelas; akurasi subset 35,44% tidak sama dengan test sembilan kelas RealWaste. Tanggal akses sumber tercatat 23 November 2026 UTC di `reports/dataset_provenance.json`.

**Lisensi:** Catatan Kaggle menyebut RealWaste CC BY 4.0 (verifikasi atribusi resmi dan syarat pemegang hak asal). Lisensi TrashNet untuk penggunaan ini belum diverifikasi. MIT pada `LICENSE` hanya berlaku bagi kode asli. Sembilan foto demo RealWaste sudah terlacak di `assets/examples/manual_test`; verifikasi izin redistribusi dan atribusi sebelum publikasi. Arsip Kaggle tidak otomatis memindahkan hak cipta.

**Integritas:** `reports/leakage_audit.json` menunjukkan nol overlap hash piksel RGB identik antar split dan tidak ada hash label berkonflik yang dikecualikan. Audit near-duplicate belum menyeluruh dan split independen per adegan/sumber belum terbukti. Jangan membagikan ulang gambar atau label dalam paket model tanpa izin. **Volume data tidak sama dengan banyaknya sampel lapangan independen.**

## Bukti dan tindak lanjut

Angka dan kode asli terlacak dalam `reports/`, `notebooks/`, `backend/`, dan `frontend/` di root repository. Jika eksperimen baru mengubah hasil, perbarui KEDUA bahasa serta tautkan artefak baru tanpa menghapus bukti lama yang dapat direproduksi.
