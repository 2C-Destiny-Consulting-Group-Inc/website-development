# 2C Destiny Funding Lab

Funding Lab gives 2C Destiny a simple FastAPI + SQLite backend and a Shadcn-powered Next.js dashboard to log, score, and prioritize funding opportunities.

## Project structure

```
2c-funding-lab/
  backend/
    main.py          # FastAPI app + models + CRUD
    auto_import.py   # Optional Grants.gov importer
    requirements.txt
  frontend/
    app/
      page.tsx       # Funding Intelligence dashboard
      layout.tsx
      globals.css
    components/ui/   # Shadcn UI primitives
    lib/
      funding-api.ts # API helper used by the dashboard
    package.json
```

## Backend – FastAPI + SQLModel

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

* API docs live at http://127.0.0.1:8000/docs
* SQLite database file (`funding_lab.db`) is created automatically in `backend/`
* Optional Grants.gov importer:

```bash
python auto_import.py
```

## Frontend – Next.js + Shadcn UI

The frontend was bootstrapped with `create-next-app --typescript --tailwind --app` and wired up with Shadcn UI components.

```bash
cd frontend
npm install
npm run dev
```

By default the dashboard expects the backend at `http://127.0.0.1:8000` (see `lib/funding-api.ts`). Update the CORS list in `backend/main.py` if you deploy to a different origin.

## Notes

* `frontend/components/ui` contains all Shadcn UI building blocks (button, input, card, table, etc.).
* `lib/funding-api.ts` centralizes backend fetch helpers so the dashboard stays clean.
* The backend `calculate_priority` helper keeps the weighted scoring logic in one place; both manual entries and auto-imports reuse it.
