# Evaluasi dan analisis kesalahan

[Indeks dokumentasi](README.md) · [English](../en/evaluation.md) · [Repository README](../../README.md)

Bukti numerik berada di `reports/heldout_test_metrics.json`, `reports/run_manifest.json`, dan `reports/trashnet_external_check.json`. Denominator test **713** gambar; akurasi tercatat **90,18%** dan macro-F1 **91,03%**. Macro-F1 validation **90,26%** memilih checkpoint epoch 12. Macro-F1 validation baseline **33,50%**.

| Kelas | Jumlah test | F1 |
|---|---:|---:|
| Cardboard | 69 | 89.36% |
| Food Organics | 62 | 96.06% |
| Glass | 63 | 91.20% |
| Metal | 118 | 88.51% |
| Miscellaneous Trash | 75 | 85.52% |
| Paper | 75 | 90.91% |
| Plastic | 138 | 86.32% |
| Textile Trash | 48 | 93.75% |
| Vegetation | 65 | 97.67% |

F1 terendah: Miscellaneous Trash dan Plastic. Lihat `assets/plots/test_confusion_matrix.png` serta `assets/plots/test_failure_gallery.png` untuk konteks; jangan mengekstrapolasi kesalahan ke semua kondisi. Audit hash menunjukkan tidak ada overlap RGB identik, tetapi independensi sumber belum terjamin. Akurasi subset lima kelas TrashNet **35,44%** pada 2.390 gambar menunjukkan risiko domain shift dan batasan pemetaan label.

**Belum diukur:** kalibrasi confidence, sensitivitas terhadap cahaya/latar, ketahanan pada objek multibahan, latensi produksi prospektif, dan akurasi pemilahan nyata yang independen.

## Bukti dan tindak lanjut

Angka dan kode asli terlacak dalam `reports/`, `notebooks/`, `backend/`, dan `frontend/` di root repository. Jika eksperimen baru mengubah hasil, perbarui KEDUA bahasa serta tautkan artefak baru tanpa menghapus bukti lama yang dapat direproduksi.
