# Finance Harbour

Finance Harbour is a personal budget planning app built with Django REST Framework, PostgreSQL, React, TypeScript, Tailwind CSS, Vite, Yarn, and Docker.

## Setup

Copy the example environment file:

```bash
cp .env.example .env
```

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
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,backend,finance-harbour.test,api.finance-harbour.test
DJANGO_CORS_ALLOWED_ORIGINS=http://finance-harbour.test:5173
DJANGO_CSRF_TRUSTED_ORIGINS=http://finance-harbour.test:5173,http://api.finance-harbour.test:8000

GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-google-oauth-client-secret

VITE_GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id
VITE_GOOGLE_OAUTH_REDIRECT_URI=http://finance-harbour.test:5173
```

Add the local development domains once:

```bash
sudo sh -c 'printf "\n127.0.0.1 finance-harbour.test api.finance-harbour.test\n" >> /etc/hosts'
```

This lets you visit `finance-harbour.test` for the frontend, while `api.finance-harbour.test` is reserved for local API endpoints.

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

## Django Secret Key

`DJANGO_SECRET_KEY` is required in `.env`.

For local development, generate a key with:

```bash
docker compose exec backend python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Then add it to your env in `DJANGO_SECRET_KEY=`.

Verify it with:

```bash
docker compose exec backend python manage.py shell -c "from django.conf import settings; print(len(settings.SECRET_KEY.encode('utf-8')))"
```

And see something like:

```text
50
```

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

Then run the frontend checks:

```bash
docker compose exec frontend yarn check
```

You may need to run the cleanup command first:

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

Run the full frontend check before pushing:

```bash
docker compose exec frontend yarn check
```
