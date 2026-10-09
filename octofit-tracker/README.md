# OctoFit Tracker

OctoFit Tracker is a multi-tier fitness app scaffold with a React 19 and Vite frontend, an Express and TypeScript API, and MongoDB access through Mongoose.

## Requirements

- Node.js 20.19+ (or 22.12+)
- MongoDB running on `localhost:27017`

## Run locally

Start MongoDB, then use separate terminals:

```powershell
cd octofit-tracker\backend
npm install
npm run dev
```

```powershell
cd octofit-tracker\frontend
npm install
npm run dev
```

The frontend is available at <http://localhost:5173>, and the API listens on port `8000`. Vite proxies `/api` requests to the API. The backend connects to `mongodb://127.0.0.1:27017/octofit_tracker` by default; set `MONGODB_URI` to override it.

The API health endpoint is `GET /api/health`.
