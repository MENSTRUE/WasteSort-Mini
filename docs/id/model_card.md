# Kartu model

[Indeks dokumentasi](README.md) · [English](../en/model_card.md) · [Repository README](../../README.md)

**Nama model:** WasteSort Mini MobileNetV3-Small. **Jenis:** klasifikasi gambar sembilan kelas; checkpoint `models/mobilenetv3_best.pt` disimpan lokal dan tidak masuk Git. **Framework:** torchvision + PyTorch. **Penggunaan:** edukasi/pengenalan kategori visual ala RealWaste. **Bukan untuk:** klasifikasi limbah berbahaya, mesin pemilah, verifikasi resin, aturan penerimaan daur ulang daerah atau keputusan keselamatan.

**Input:** satu JPEG/PNG/WebP maksimal 10 MiB melalui API; RGB dengan orientasi EXIF, resize 256, crop tengah 224, mean ImageNet `[0.485,0.456,0.406]` dan std `[0.229,0.224,0.225]`. **Output:** sembilan label berurutan, skor softmax belum terkalibrasi, prediksi utama dan catatan pemilahan. Urutan kelas wajib dibaca dari checkpoint tepercaya dan diverifikasi dengan kosakata sembilan kelas.

**Bukti:** test RealWaste (713) akurasi 0,9018, macro-F1 0,9103. Subset lima kelas TrashNet beda domain (2.390) akurasi 0,3544. **Bias/batasan:** near duplicate/overlap sumber belum terverifikasi; benda multibahan; latar gambar berbeda; belum ada kalibrasi probabilitas; representasi foto lapangan terbatas. Skor rendah bukan detektor out-of-distribution otomatis. Jangan disebut akurasi daur ulang.

**Pemuatan/keamanan:** backend membutuhkan dictionary checkpoint berisi `model` state_dict dan `classes`; memakai `torch.load(weights_only=True)` serta strict state_dict. Hanya muat artefak tepercaya dan cek provenance/hash. Tidak ada auto-download fallback. `ready:true` hanya menunjukkan bobot termuat, bukan jaminan akurasi.

## Bukti dan tindak lanjut

Angka dan kode asli terlacak dalam `reports/`, `notebooks/`, `backend/`, dan `frontend/` di root repository. Jika eksperimen baru mengubah hasil, perbarui KEDUA bahasa serta tautkan artefak baru tanpa menghapus bukti lama yang dapat direproduksi.
