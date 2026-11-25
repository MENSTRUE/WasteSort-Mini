# Batasan dan batas klaim

[Indeks dokumentasi](README.md) · [English](../en/limitations.md) · [Repository README](../../README.md)

**Validitas penelitian:** test held-out RealWaste dipecah per gambar/hash, belum terjamin independen per adegan/lokasi/sumber. Overlap hash RGB identik nol; near-duplicate perceptual belum diaudit menyeluruh. Akurasi 90,18% dan macro-F1 91,03% hanya berlaku pada split RealWaste yang diuji. Akurasi 35,44% subset lima kelas TrashNet berbeda domain menunjukkan generalisasi belum terjamin.

**Batasan produk:** prediksi kelas `Plastic` tidak membuktikan resin PET/HDPE/PP, kontaminasi, dapat didaur ulang atau diterima fasilitas setempat. Benda campuran/berbahaya, foto gelap/buram, dan objek di luar domain dapat salah diklasifikasi. Softmax bukan confidence terkalibrasi atau jaminan statistik. Tips bersifat umum, bukan aturan hukum/lingkungan/pemilahan daerah.

**Batas operasional:** hanya lokal, tanpa autentikasi/rate limit, tidak ada antrean skala besar atau observabilitas, database produksi maupun audit keamanan/privasi independen. Checkpoint tidak ada dalam GitHub. Hak redistribusi foto asal harus diverifikasi (sembilan foto RealWaste demo sudah terlacak). Status harus dipisahkan antara terimplementasi, diverifikasi, dan direncanakan.

**Prioritas penerimaan:** dataset lapangan independen; audit near duplicate dan grouping sumber; evaluasi per kelas serta domain berbeda; uji kalibrasi/abstain; pengujian keamanan inferensi; e2e checkpoint nyata; perapian lisensi sebelum publikasi.

## Bukti dan tindak lanjut

Angka dan kode asli terlacak dalam `reports/`, `notebooks/`, `backend/`, dan `frontend/` di root repository. Jika eksperimen baru mengubah hasil, perbarui KEDUA bahasa serta tautkan artefak baru tanpa menghapus bukti lama yang dapat direproduksi.
