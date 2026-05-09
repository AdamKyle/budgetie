# Finance Harbour

Finance Harbour is a personal budget planning app built with Django REST Framework, PostgreSQL, React, TypeScript, Tailwind CSS, Vite, Yarn, and Docker.

## Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Do not commit `.env`.

Fill out `.env` with local development values:

```env
POSTGRES_DB=finance_harbour
POSTGRES_USER=finance_harbour
POSTGRES_PASSWORD=your_password_here
POSTGRES_HOST=database
POSTGRES_PORT=5432

PGADMIN_DEFAULT_EMAIL=admin@financeharbour.ca
PGADMIN_DEFAULT_PASSWORD=admin123
PGADMIN_PORT=5050

BACKEND_PORT=8000
FRONTEND_PORT=5173

DJANGO_SECRET_KEY=your-local-django-secret-here
SIMPLE_JWT_SIGNING_KEY=your-local-jwt-signing-secret-here
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,backend,finance-harbour.test,api.finance-harbour.test
DJANGO_CORS_ALLOWED_ORIGINS=http://localhost:5173,http://finance-harbour.test:5173
DJANGO_CSRF_TRUSTED_ORIGINS=http://localhost:5173,http://finance-harbour.test:5173,http://api.finance-harbour.test:8000

GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-google-oauth-client-secret
GOOGLE_OAUTH_CALLBACK_URL=http://localhost:5173/auth/google/callback

VITE_GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id
VITE_GOOGLE_OAUTH_REDIRECT_URI=http://localhost:5173/auth/google/callback
```

Use different secret values for each environment:

```text
local != staging != production != GitHub Actions
```

Add the local development domains once:

```bash
sudo sh -c 'printf "\n127.0.0.1 finance-harbour.test api.finance-harbour.test\n" >> /etc/hosts'
```

This lets you visit `finance-harbour.test` for normal frontend development, while `api.finance-harbour.test` is reserved for local API endpoints.

For local Google OAuth testing, use:

```text
http://localhost:5173
```

Google OAuth does not accept `.test` as an authorized JavaScript origin.

Install the frontend dependencies on the host machine:

```bash
cd frontend && corepack enable && yarn install
```

Then go back to the project root:

```bash
cd ..
```

Install the backend dependencies for your editor on the host machine:

```bash
cd backend && PIPENV_VENV_IN_PROJECT=1 pipenv sync --dev
```

Then go back to the project root:

```bash
cd ..
```

Your editor should use this backend Python interpreter:

```text
backend/.venv/bin/python
```

Start the app:

```bash
docker compose up -d --build
```

Run database migrations:

```bash
docker compose exec backend python manage.py migrate
```

To create new migrations:

```bash
docker compose exec backend python manage.py makemigrations
```

Before opening the frontend, check that the backend is running:

```text
http://localhost:8000/api/health/
```

That URL should return:

```json
{ "status": "ok" }
```

Then open the frontend:

```text
http://finance-harbour.test:5173
```

For Google OAuth testing, open the frontend through:

```text
http://localhost:5173
```

## Django Secret Key

`DJANGO_SECRET_KEY` is required in `.env`.

For local development, generate a key with:

```bash
docker run --rm python:3.14-slim python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Then add it to `.env`:

```env
DJANGO_SECRET_KEY=generated-value-here
```

`DJANGO_SECRET_KEY` is used by Django signing and security internals.

## JWT Signing Key

`SIMPLE_JWT_SIGNING_KEY` is required in `.env`.

For local development, generate a key with:

```bash
docker run --rm python:3.14-slim python -c "import secrets; print(secrets.token_urlsafe(64))"
```

Then add it to `.env`:

```env
SIMPLE_JWT_SIGNING_KEY=generated-value-here
```

Do not reuse `DJANGO_SECRET_KEY` for `SIMPLE_JWT_SIGNING_KEY`.

The keys have separate purposes:

```text
DJANGO_SECRET_KEY = Django signing/security internals
SIMPLE_JWT_SIGNING_KEY = JWT access/refresh token signing
```

## Google OAuth

Google OAuth requires backend and frontend environment values.

Backend values:

```env
GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-google-oauth-client-secret
GOOGLE_OAUTH_CALLBACK_URL=http://localhost:5173/auth/google/callback
```

Frontend values:

```env
VITE_GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id
VITE_GOOGLE_OAUTH_REDIRECT_URI=http://localhost:5173/auth/google/callback
```

The Google client ID must match on the backend and frontend:

```text
GOOGLE_OAUTH_CLIENT_ID == VITE_GOOGLE_OAUTH_CLIENT_ID
```

The Google callback URL must match the frontend redirect URI:

```text
GOOGLE_OAUTH_CALLBACK_URL == VITE_GOOGLE_OAUTH_REDIRECT_URI
```

The Google client secret is backend-only. Never expose it to the frontend.

For local development, configure the Google OAuth client with:

```text
Authorized JavaScript origins:
http://localhost:5173

Authorized redirect URIs:
http://localhost:5173/auth/google/callback
```

After changing Google OAuth `.env` values, recreate the affected containers:

```bash
docker compose up -d --force-recreate backend frontend
```

## Debug Mode

For local development:

```env
DJANGO_DEBUG=True
```

For staging and production:

```env
DJANGO_DEBUG=False
```

When `DJANGO_DEBUG=False`, production security settings are enabled, including secure cookies, HTTPS redirect, and HSTS.

## Restarting After `.env` Changes

After changing backend `.env` values, recreate the backend container:

```bash
docker compose up -d --force-recreate backend
```

After changing frontend `.env` values, recreate the frontend container:

```bash
docker compose up -d --force-recreate frontend
```

Rebuild only when Dockerfile or dependency changes happen.

## pgAdmin

pgAdmin is available through Docker for viewing the local Postgres database.

Required `.env` values:

```env
PGADMIN_DEFAULT_EMAIL=admin@financeharbour.ca
PGADMIN_DEFAULT_PASSWORD=admin123
PGADMIN_PORT=5050
```

Make sure the containers are running:

```bash
docker compose up -d
```

Access pgAdmin here:

```text
http://localhost:5050
```

When setting up the connection in pgAdmin, use the following:

```text
Name: Finance Harbour Local
Host name/address: database
Port: 5432
Maintenance database: value of POSTGRES_DB
Username: value of POSTGRES_USER
Password: value of POSTGRES_PASSWORD
```

## Developing on the frontend

The frontend source code is mounted into Docker from the host machine.

That means you edit files locally, and the frontend container sees the changes.

The host machine owns:

```text
frontend/node_modules
frontend/package.json
frontend/yarn.lock
```

So the editor does not need to attach to the Docker container to see frontend packages.

Normal frontend changes should reload through Vite.

## Adding New Frontend Dependencies

To add a new frontend dependency, run this from the project root:

```bash
cd frontend && yarn add package-name
```

For dev dependencies:

```bash
cd frontend && yarn add -D package-name
```

Then go back to the project root:

```bash
cd ..
```

Restart the frontend container:

```bash
docker compose restart frontend
```

Then run the frontend cleanup command:

```bash
docker compose exec frontend yarn cleanup
```

This updates:

```text
frontend/package.json
frontend/yarn.lock
```

On the host machine.

## Developing on the backend

The backend source code is mounted into Docker from the host machine.

That means you edit files locally, and the backend container sees the changes.

The editor should use the local Pipenv virtual environment:

```text
backend/.venv/bin/python
```

Docker does not use that `.venv` folder. Docker installs backend dependencies into the image when the backend image is built.

So the setup is:

```text
Host editor uses backend/.venv
Docker backend uses packages installed during image build
Pipfile and Pipfile.lock keep both sides aligned
```

Normal backend changes should reload through Django runserver.

## Adding New Backend Dependencies

To add a new backend dependency, run this from the project root:

```bash
cd backend && PIPENV_VENV_IN_PROJECT=1 pipenv install package-name
```

For dev dependencies:

```bash
cd backend && PIPENV_VENV_IN_PROJECT=1 pipenv install --dev package-name
```

Then go back to the project root:

```bash
cd ..
```

Rebuild the backend container:

```bash
docker compose up -d --build backend
```

Then run the backend checks:

```bash
docker compose exec backend python manage.py check && docker compose exec backend ruff check . && docker compose exec backend ruff format --check .
```

This updates:

```text
backend/Pipfile
backend/Pipfile.lock
```

## Manual Backend Pipfile Updates

You can also manually edit `backend/Pipfile`.

If you do that, update the lock file before rebuilding:

```bash
cd backend && PIPENV_VENV_IN_PROJECT=1 pipenv lock && pipenv sync --dev
```

Then go back to the project root:

```bash
cd ..
```

Rebuild the backend container:

```bash
docker compose up -d --build backend
```

Do not rebuild from a changed `Pipfile` without updating `Pipfile.lock` because the build will fail.

## Testing

Testing is one of the most important parts of Finance Harbour. It verifies that the app is functioning correctly.

Run all backend tests with coverage:

```bash
docker compose exec backend coverage run \
  --source=. \
  --omit="*/migrations/*,*/tests/*,manage.py,config/*" \
  manage.py test

docker compose exec backend coverage report -m
```

Run backend tests without coverage:

```bash
docker compose exec backend python manage.py test
```

Run tests for one app:

```bash
docker compose exec backend python manage.py test authentication
```

## Formatting the backend

Because the backend uses Ruff, format before committing:

```bash
docker compose exec backend ruff format .
```

Run the full backend check before pushing:

```bash
docker compose exec backend python manage.py check && docker compose exec backend ruff check . && docker compose exec backend ruff format --check .
```

## Frontend checks

Run the frontend cleanup command before pushing:

```bash
docker compose exec frontend yarn cleanup
```

## Full Local Verification

Run this before pushing:

```bash
docker compose exec backend ruff format . && \
docker compose exec backend python manage.py check && \
docker compose exec backend ruff check . && \
docker compose exec backend ruff format --check . && \
docker compose exec backend python manage.py test && \
docker compose exec backend coverage run --source=. --omit="*/migrations/*,*/tests/*,manage.py,config/*" manage.py test && \
docker compose exec backend coverage report -m && \
docker compose exec frontend yarn cleanup
```
