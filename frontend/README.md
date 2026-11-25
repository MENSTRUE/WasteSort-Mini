# Interactive React frontend

**Stack:** React 19, TypeScript 5.7, Vite 6, lucide-react; components in `src/App.tsx`, styling in `src/styles.css`, app bootstrap in `src/main.tsx`. This is an interactive local **single-page application**, not a production-hosted service. No user accounts, persistent scan history, routing library, analytics provider, database, or offline guarantee appear in source.

## Implemented user journey
Open the analyzer, drag/drop or select JPG/PNG/WebP (≤10 MiB), inspect a local preview, click Analyze when `/api/v1/ready` is true, send `FormData` POST to `/api/v1/predict`, display top predicted label, percentage-format ranked uncalibrated scores, caution note, optionally expand all nine rankings. The Recent scans view stores up to 15 summaries **in React state only**. About the model reads metadata from `/api/v1/model`. Model readiness is fetched at startup and when clicking refresh; it is not a heartbeat.

## Setup and build
```powershell
cd "D:\porto@ day\day 41rontend"
npm.cmd install
npm.cmd run build
npm.cmd run dev -- --host 127.0.0.1 --port 5173
```

Local `VITE_API_BASE_URL=http://127.0.0.1:8000` may be configured through `.env`; `.env.example` is provided. `src/vite-env.d.ts` enables TypeScript `import.meta.env`. Backend must separately run at port 8000. `npm.cmd run build` compiles TS then Vite; test real API connection through browser.

## UX limitations and next tests
File preview and recent-list state are not durable. No confidence calibration, out-of-domain warning, multilingual translation framework, progress tracking server-side, accessibility audit, responsive device matrix, or automated browser e2e is evidenced. Review drag/drop keyboard accessibility and error wording. Do not display server status as scientific certainty. See [`../docs/en/architecture.md`](../docs/en/architecture.md), [`../docs/id/architecture.md`](../docs/id/architecture.md).
