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
copy .\secrets\postgres_user.txt.example .\secrets\postgres_user.txt
copy .\secrets\postgres_password.txt.example .\secrets\postgres_password.txt
copy .\secrets\pgadmin_password.txt.example .\secrets\pgadmin_password.txt
copy .\secrets\admin_dashboard_key.txt.example .\secrets\admin_dashboard_key.txt
docker compose up --build -d
```

Before first run, edit the copied secret files and set strong values:

- `database/secrets/postgres_user.txt`
- `database/secrets/postgres_password.txt`
- `database/secrets/pgadmin_password.txt`
- `database/secrets/admin_dashboard_key.txt`

With this setup, passwords are no longer stored in `.env`.

Open the website on http://localhost:3000

API available on http://localhost:4000

pgAdmin available on http://localhost:5050

pgAdmin login:

- email: value of `PGADMIN_DEFAULT_EMAIL` in `.env`
- password: value inside `database/secrets/pgadmin_password.txt`

The PostgreSQL server is auto-configured from `database/pgadmin/servers.json`, so no manual server setup is required.
For security, pgAdmin no longer stores DB password in project files. At first connection, enter the DB password from `.env` (`POSTGRES_PASSWORD`) and optionally save it in pgAdmin.
For security, pgAdmin no longer stores DB password in project files. At first connection, enter the DB password from `database/secrets/postgres_password.txt` and optionally save it in pgAdmin.

To see logs:

```bash
docker compose logs -f
```

To stop all services:

```bash
docker compose down
```

If you get a timeout error like `An HTTP request took too long to complete`:

```powershell
cd database
$env:COMPOSE_HTTP_TIMEOUT="240"
$env:DOCKER_CLIENT_TIMEOUT="240"
docker compose up --build -d --verbose
```

If this resolves the issue, add the same variables to `database/.env` for this project.

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
- `POST /api/contact` (honeypot + rate limit anti-spam)
- `GET /api/admin/contacts` (requires header `x-admin-key`)

Back-office UI available on `http://localhost:3000/backoffice`.
Use the same value configured in `database/secrets/admin_dashboard_key.txt` as admin key.

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
