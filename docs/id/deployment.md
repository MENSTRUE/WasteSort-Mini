# Deployment lokal dan batas produksi

[Indeks dokumentasi](README.md) · [English](../en/deployment.md) · [Repository README](../../README.md)

**Bukti baru sampai deployment lokal**, belum produksi publik. Dari root proyek pada PowerShell: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\scripts\START_BACKEND.ps1"` dan terminal lain `powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\scripts\START_FRONTEND.ps1"`. Backend `127.0.0.1:8000`, frontend `127.0.0.1:5173`. Memerlukan Python 3.11 (menurut script), pasangan PyTorch CPU+torchvision kompatibel, dependency FastAPI, Node.js/npm, dan checkpoint `.pt` lokal tepercaya.

**Pemeriksaan:** `Invoke-RestMethod http://127.0.0.1:8000/api/v1/health` lanjut `/api/v1/ready` (wajib true) dan `/api/v1/model`; jalankan `npm.cmd run build` di frontend. Unggah satu foto melalui UI dan pastikan `POST /api/v1/predict` menghasilkan sembilan ranking. Health sukses tidak sama dengan model siap. `MODEL_PATH` mengganti lokasi checkpoint; `CORS_ORIGINS` menentukan origin diizinkan; `VITE_API_BASE_URL` menentukan URL API frontend.

**Keamanan sebelum publikasi:** autentikasi, rate limiting, uji DoS/decompression bomb, batas konkurensi request, HTTPS, kebijakan privasi/log, sandbox dan pembaruan dependency, validasi model pada data eksternal, kuota, CORS publik, monitoring dan respons insiden. Saat ini **belum diimplementasikan**. Jangan mengekspos dev server ke internet. `README_APP.md` dan `docs/DEPLOYMENT.md` dipertahankan sebagai catatan setup lama.

## Bukti dan tindak lanjut

Angka dan kode asli terlacak dalam `reports/`, `notebooks/`, `backend/`, dan `frontend/` di root repository. Jika eksperimen baru mengubah hasil, perbarui KEDUA bahasa serta tautkan artefak baru tanpa menghapus bukti lama yang dapat direproduksi.
