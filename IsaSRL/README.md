# IsaSRL Modern Platform

Architecture 3-tiers:

- frontend: Next.js (App Router) + TypeScript + Tailwind CSS
- backend: Node.js + Express
- database: PostgreSQL (Docker)

## Docker quick start (frontend + backend + database)

Run from the database folder:

```bash
cd database
copy .env.example .env
docker compose up --build -d
```

Edit `.env` before first run and set strong passwords for:

- `POSTGRES_PASSWORD`
- `PGADMIN_DEFAULT_PASSWORD`

Open the website on http://localhost:3000

API available on http://localhost:4000

pgAdmin available on http://localhost:5050

pgAdmin login:

- email: value of `PGADMIN_DEFAULT_EMAIL` in `.env`
- password: value of `PGADMIN_DEFAULT_PASSWORD` in `.env`

The PostgreSQL server is auto-configured from `database/pgadmin/servers.json`, so no manual server setup is required.
For security, pgAdmin no longer stores DB password in project files. At first connection, enter the DB password from `.env` (`POSTGRES_PASSWORD`) and optionally save it in pgAdmin.

To see logs:

```bash
docker compose logs -f
```

To stop all services:

```bash
docker compose down
```

If you change pgAdmin auto-config files and want to re-import them, reset pgAdmin volume:

```bash
docker compose down -v
docker compose up --build -d
```

## 1) Database

```bash
cd database
docker compose up -d
```

This starts PostgreSQL on port 5432 and runs the SQL initialization script in `database/init/001_schema.sql`.

## 2) Backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

API available at `http://localhost:4000`.

Endpoints:

- `GET /api/health`
- `GET /api/highlights`

## 3) Frontend

```bash
cd frontend
copy .env.local.example .env.local
npm install
npm run dev
```

Website available at `http://localhost:3000`.

## Notes

- If PostgreSQL is not configured/running, the frontend still works and backend returns fallback content.
- For production, move credentials to secure secrets management and use environment-specific values.
