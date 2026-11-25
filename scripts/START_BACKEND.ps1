$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$backend = Join-Path $root "backend"

Set-Location $backend

# 1. Siapkan Python environment
$python = Join-Path $backend ".venv\Scripts\python.exe"

if (!(Test-Path $python)) {
    py -3.11 -m venv ".venv"

    if ($LASTEXITCODE -ne 0) {
        throw "Gagal membuat Python 3.11 environment."
    }
}

# 2. Periksa PyTorch + torchvision
Write-Host "`n[CHECK] PyTorch dan torchvision..." -ForegroundColor Cyan

& $python -c "import torch, torchvision; print('Torch:', torch.__version__, '| Torchvision:', torchvision.__version__)"

if ($LASTEXITCODE -ne 0) {

    Write-Host "`n[INSTALL] PyTorch CPU belum tersedia." -ForegroundColor Yellow

    & $python -m pip install `
        --prefer-binary `
        --timeout 120 `
        --retries 10 `
        torch torchvision `
        --index-url https://download.pytorch.org/whl/cpu

    if ($LASTEXITCODE -ne 0) {
        throw "PyTorch gagal diinstal. Periksa koneksi internet."
    }
}
else {
    Write-Host "[PASS] PyTorch sudah tersedia. Skip download." -ForegroundColor Green
}

# 3. Instal dependency FastAPI
Write-Host "`n[INSTALL] FastAPI dependencies..." -ForegroundColor Cyan

& $python -m pip install `
    --prefer-binary `
    --timeout 120 `
    --retries 10 `
    -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    throw "Instalasi requirements gagal."
}

# 4. Periksa model Kaggle
$model = Join-Path $root "models\mobilenetv3_best.pt"

if (Test-Path $model) {
    Write-Host "[PASS] Kaggle model ditemukan." -ForegroundColor Green
}
else {
    Write-Host "[WARNING] Model Kaggle belum ditemukan." -ForegroundColor Yellow
}

# 5. Jalankan API
Write-Host "`n[START] WasteSort Mini FastAPI" -ForegroundColor Green
Write-Host "API: http://127.0.0.1:8000"
Write-Host "Docs: http://127.0.0.1:8000/docs"
Write-Host "CTRL+C untuk menghentikan server."

& $python -m uvicorn app.main:app `
    --host 127.0.0.1 `
    --port 8000 `
    --reload

if ($LASTEXITCODE -ne 0) {
    throw "FastAPI gagal dijalankan."
}
