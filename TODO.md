# TODO

Deferred items to revisit in the future.

## Frontend: breaking dependency upgrades (clears the last 6 npm audit findings)

`npm audit` currently reports 6 vulnerabilities (2 critical, 1 high, 3 moderate),
all requiring breaking upgrades: the vite/esbuild/vite-node/vitest/@vitest/ui
chain and uuid. The two criticals are in vitest (dev/test tooling only — not
shipped to users), and the esbuild/vite issues only affect the local dev server.

Upgrade set: `vite@8`, `vitest@4`, `@vitest/ui@4`, `@vitejs/plugin-react@6`, `uuid@14`.

Notes from a previous attempt (worked end to end, then intentionally reverted):

- Vite 8 requires Node 20.19+, so `client-app/Dockerfile` must move off
  `node:18.20.8-alpine` (e.g. `node:22-alpine`).
- Vite 8 bundles with Rolldown/Oxc instead of esbuild, which refuses JSX in
  `.js` files. The old `esbuild: { loader: "jsx" }` block in `vite.config.js`
  has no reliable equivalent — the clean fix is renaming the ~30 JSX-containing
  files (`src/Components/**`, `Root.js`, `index.js`, and their tests) to `.jsx`
  via `git mv`, updating the `/src/index.js` reference in `index.html`, and
  deleting the esbuild/optimizeDeps JSX workarounds from `vite.config.js`.
  All imports are extensionless, so no import statements need changes.
- uuid 14 is a drop-in here: the only usage is `import { v4 } from "uuid"` in
  `src/Store/golfReducer.test.js`.
- Verify with: `npm run test:run` (211 tests), `npm run build`, `npm audit`
  (should report 0), and a Docker rebuild of the frontend.

## Backend: Python base image bump (clears the last 3 pip-audit findings)

`backend/requirements.txt` still has 3 advisories that cannot be fixed on
`python:3.9` (EOL since October 2025): click needs 8.3.3 and pytest needs 9.x,
both requiring Python >= 3.10.

- Bump `backend/Dockerfile` from `python:3.9` to `python:3.12` (or newer).
- Bump `SQLAlchemy==1.4.31` to `1.4.54` (same 1.4 line, needed for 3.12).
- The ancient pylint stack pinned in requirements.txt (pylint 2.6, astroid
  2.4.2, wrapt 1.12.1, lazy-object-proxy 1.4.3) will not build on 3.12 —
  either bump it or remove it from the runtime image entirely.
- Then bump `click` to 8.3.3+ and `pytest` to 9.x.
- Verify with the backend test suite inside the rebuilt image (47 tests).
