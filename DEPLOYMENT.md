# Deployment Connection Checklist

Set these environment variables in the deployed services before building or redeploying.

## Frontend

For Vercel or any static frontend host:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

Notes:
- The URL must include `/api`.
- After changing `VITE_API_URL`, rebuild/redeploy the frontend. Vite bakes env values into the production bundle.
- Do not use `localhost` or `127.0.0.1` in production. In a user's browser those point to the user's own device, not your backend server.

## Backend

For Render, Railway, or any Laravel host:

```env
APP_URL=https://your-backend-domain.com
FRONTEND_URLS=https://your-frontend-domain.vercel.app
```

Notes:
- `FRONTEND_URLS` must be the exact frontend origin, without a trailing slash.
- For multiple frontend domains, separate them with commas:

```env
FRONTEND_URLS=https://your-frontend-domain.vercel.app,https://www.your-custom-domain.com
```

## Quick Test

Open this in the browser:

```text
https://your-backend-domain.com/api/health
```

Expected response:

```json
{"ok":true}
```

If the health URL works but the frontend still errors, check the browser console:
- `CORS` error means `FRONTEND_URLS` does not match the deployed frontend domain.
- `ERR_CONNECTION_REFUSED`, `404`, or requests to `localhost` mean `VITE_API_URL` is missing or wrong in the frontend deployment.
