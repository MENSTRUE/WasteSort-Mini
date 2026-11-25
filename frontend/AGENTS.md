# Frontend agent instructions

Follow root `../AGENTS.md`. Treat `src/App.tsx` and API `../backend/app/main.py` as matching contracts. Do not invent predictions or treat uncalibrated scores as certified confidence. Check file MIME and 10 MiB both in UI and server, handle HTTP errors and `ready:false`, and keep session-history language factual.

Preserve blue-gray visual system, responsive layout, keyboard-accessible upload and readable error states. Before a change run `npm.cmd run build`; when changing API names, coordinate backend updates and docs/en + docs/id. Never embed secrets in Vite environment variables. Do not claim persistent history or public deployment unless implemented and tested.
