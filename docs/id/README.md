# WasteSort Mini — Dokumentasi teknis Bahasa Indonesia

[Main README](../../README.md) · [English](../en/README.md)

Panduan ini mendokumentasikan prototipe penelitian klasifikasi sembilan kelas RealWaste dan batasan ilmiahnya; ini bukan sertifikasi produksi.

## Bab terperinci

- [Provenans dan lisensi dataset](dataset_provenance.md)
- [Metodologi training dan preprocessing](methodology.md)
- [Eksperimen dan seleksi champion](experiments.md)
- [Kartu model / penggunaan](model_card.md)
- [Evaluasi held-out dan eksternal](evaluation.md)
- [Arsitektur dan kontrak API](architecture.md)
- [Reproduksibilitas](reproducibility.md)
- [Setup lokal dan kesiapan produksi](deployment.md)
- [Batasan dan batas klaim](limitations.md)
- [Troubleshooting](troubleshooting.md)

## Ringkasan bukti saat ini

| Bukti | Nilai |
|---|---|
| RealWaste usable images | 4,752 |
| Train / validation / test | 3,326 / 713 / 713 |
| RealWaste held-out accuracy | 90.18% |
| RealWaste held-out macro-F1 | 91.03% |
| TrashNet shifted five-class accuracy | 35.44% |

Git clone tidak memuat checkpoint tepercaya `models/mobilenetv3_best.pt`. Baca notebook dan README model sebelum menjalankan inferensi.
