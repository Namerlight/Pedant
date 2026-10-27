# Pedant

Uses an electron frontend and a python backend.

## Requirements

Use [uv](https://docs.astral.sh/uv/) for python setup.
* Node.js 22.12 or newer
* Python 3.12 or newer

## Setup

The frontend and backend need to be installed separately.

```bash
cd frontend && npm install
```

```bash
cd backend && uv sync
```

## Run

Backend (in one terminal):

```bash
cd backend
uv run uvicorn main:app --reload --host 127.0.0.1 --port 8765
```

Frontend (in another terminal):

```bash
cd frontend
npm run dev
```
