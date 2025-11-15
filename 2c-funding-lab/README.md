# 2C Funding Lab

A full-stack application for managing funding opportunities and applications, built for 2C Destiny Consulting Group, Inc.

## Project Structure

```
2c-funding-lab/
├── backend/           # FastAPI backend server
│   ├── main.py       # Main API server with endpoints
│   ├── auto_import.py # Utility for dynamic module imports
│   └── requirements.txt # Python dependencies
└── frontend/         # Next.js frontend application
    ├── app/          # Next.js app directory
    │   ├── page.tsx  # Main landing page
    │   ├── layout.tsx # Root layout
    │   └── globals.css # Global styles
    ├── lib/          # Library utilities
    │   ├── funding-api.ts # API client
    │   └── utils.ts  # Utility functions
    ├── components/   # React components
    │   └── ui/       # Shadcn UI components
    └── (config files) # Next.js, TypeScript, Tailwind configs
```

## Backend

### Setup

1. Navigate to the backend directory:
   ```bash
   cd 2c-funding-lab/backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Backend

```bash
python3 main.py
```

The API will be available at `http://localhost:8000`

### API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /api/funding-opportunities` - Get all funding opportunities
- `GET /api/funding-opportunities/{id}` - Get specific funding opportunity
- `POST /api/applications` - Submit a new application
- `GET /api/applications` - Get all applications
- `GET /api/applications/{id}` - Get specific application
- `PUT /api/applications/{id}` - Update application status

## Frontend

### Setup

1. Navigate to the frontend directory:
   ```bash
   cd 2c-funding-lab/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file (optional):
   ```bash
   cp .env.example .env.local
   ```

### Running the Frontend

Development mode:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

Build for production:
```bash
npm run build
npm start
```

### Technologies Used

**Backend:**
- FastAPI - Modern, fast web framework for Python
- Pydantic - Data validation
- Uvicorn - ASGI server

**Frontend:**
- Next.js 14 - React framework
- TypeScript - Type-safe JavaScript
- Tailwind CSS - Utility-first CSS framework
- Shadcn UI - Re-usable component library
- Radix UI - Accessible component primitives

## Features

- View available funding opportunities
- Browse funding details (amount, deadline, eligibility)
- Submit funding applications
- Manage application status
- Responsive design with dark mode support

## Development

### Backend Development

The backend uses FastAPI's hot-reload feature. Any changes to Python files will automatically restart the server.

### Frontend Development

Next.js provides hot module replacement (HMR). Changes to components will be reflected immediately in the browser.

## Notes

- The backend currently uses in-memory storage for data. In production, connect to a proper database.
- CORS is configured to allow requests from localhost:3000 and localhost:3001.
- The frontend expects the backend to be running on port 8000 by default.

## License

© 2025 2C Destiny Consulting Group, Inc.
