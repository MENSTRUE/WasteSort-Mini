# Backend agent instructions

Follow root `../AGENTS.md`. This component's source of truth is `app/main.py`, plus `tests/test_api.py`. Do not add mock inference fallback or allow model class-order drift. Maintain exact MIME/format/10 MiB/12,000 pixel validation; preserve EXIF transpose and ImageNet transforms. Use trusted `weights_only=True` checkpoint loading, verify expected class set and strict state_dict, and fail closed with 503 for missing models.

Before changing an endpoint: update its documented request/response contract, add a positive and negative test, ensure CORS scopes remain explicit and no raw image files are persisted. Do not mark public readiness without authentication, rate limiting, monitoring and operational review. Run pytest and API smoke checks; update both documentation languages after behavior changes.
