# Panduan troubleshooting

[Indeks dokumentasi](README.md) · [English](../en/troubleshooting.md) · [Repository README](../../README.md)

**TS2339 `ImportMeta.env`:** pastikan `frontend/src/vite-env.d.ts` memuat `/// <reference types="vite/client" />`, periksa tipe Vite dan jalankan `npm.cmd run build`.

**Warning `npm install`/esbuild:** lihat exit code `npm.cmd run build` sebelum menyatakan gagal; perizinan package manager dapat mempengaruhi install script native. Gunakan `npm.cmd` ketika PowerShell memblokir `npm.ps1`.

**`/ready` false atau 503:** cek `models/mobilenetv3_best.pt`, daftar kelas dan state_dict `model` sesuai API. Lihat respons `error`; gunakan checkpoint Kaggle tepercaya, bukan `.pt` sembarang. `weights_only=True` dapat menolak checkpoint tak kompatibel. Restart backend setelah mengganti model.

**CORS:** host frontend harus persis sesuai daftar `CORS_ORIGINS`; `localhost` dan `127.0.0.1` adalah origin berbeda. URL API default `http://127.0.0.1:8000`.

**415 / 413 / 422:** pastikan JPEG/PNG/WebP asli sesuai MIME, tidak kosong, maksimal 10 MB, dimensi maksimal 12.000 piksel, dan dapat dibaca. Uji `/health`, `/ready`, lalu POST nyata. Error upload tidak otomatis berarti model rusak.

**Folder manual_test kosong:** `Day41_Kaggle_Dataset.zip` bisa berupa ZIP pembungkus berisi ZIP lain; gambar sampel berada di `realwaste_uci.zip` bertingkat. Jangan mengira jumlah gambar dari ZIP pembungkus; tak harus commit foto asli untuk menguji API.

**Model hilang setelah clone:** memang diabaikan oleh `.gitignore`; buat ulang dari notebook atau ambil checkpoint tepercaya dengan urutan kelas sama. Jangan gunakan bobot acak/mock lalu mengklaim sudah valid.

## Bukti dan tindak lanjut

Angka dan kode asli terlacak dalam `reports/`, `notebooks/`, `backend/`, dan `frontend/` di root repository. Jika eksperimen baru mengubah hasil, perbarui KEDUA bahasa serta tautkan artefak baru tanpa menghapus bukti lama yang dapat direproduksi.
