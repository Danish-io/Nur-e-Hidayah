# Nur-e-Hidayah

An advanced Quran web application featuring translations, tafseer, and AI-powered semantic search.

## Structure

- `frontend/web`: Next.js 14 Frontend
- `backend/api`: Node.js Express Backend
- `backend/ai-service`: Python FastAPI AI Service
- `packages/ui`: Shared UI components

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Servers**:
    ```bash
    npm run dev
    ```

## Configuration

- **Database**: PostgreSQL is required. Update `apps/api/.env` with your `DATABASE_URL`.
- **AI Service**: Requires Python 3.9+. Install dependencies in `apps/ai-service` and run `main.py`.
