# Crystaflex

A responsive Next.js website and Express/Mongoose inquiry API for Crystaflex Pvt Ltd.

## Requirements

- Node.js 20.19+ and npm
- MongoDB running locally, or a MongoDB connection URI

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI`, a private `API_ADMIN_KEY`, and your SMTP mailbox settings. The SMTP account must be authorized to send mail for `EMAIL_FROM`.
3. Run `npm run dev` to start Next.js on port 3000 and the API on port 5000.

Next.js rewrites `/api` requests to the Express API at `API_ORIGIN`. For production, set `API_ORIGIN` to the deployed API origin and `CLIENT_ORIGIN` to the deployed Next.js site origin. Run `npm run build`, then `npm start` to start both services together; use `npm run start:web` and `npm run start:api` when deploying them separately.

## API

- `GET /api/health` returns API and MongoDB connection status.
- `POST /api/contact` validates and stores an inquiry. Requests are limited to five per IP per 15 minutes.
- `GET /api/inquiries?page=1&limit=25&status=new` lists inquiries and requires the `x-admin-key` header.
- `PATCH /api/inquiries/:id` updates an inquiry status (`new`, `contacted`, `qualified`, or `closed`) and requires the `x-admin-key` header.
- `POST /api/inquiries/:id/notify` retries a failed sales notification and requires the `x-admin-key` header.

The API inquiry route saves each inquiry to MongoDB, then sends a plain-text email to `sales@crystaflex.com`. The submitter's address is set as `Reply-To`. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and an authorized `EMAIL_FROM` for your provider; port 465 typically uses `SMTP_SECURE=true`, while port 587 uses `false`. SMTP credentials stay on the server. If mail delivery fails, the inquiry remains saved with a failed notification status and can be retried using the protected endpoint. The website itself intentionally uses direct email links rather than an inquiry form.

The FinOps planner and operations dashboard are illustrative UI previews, not live telemetry, a savings quote, a performance guarantee, or an SLA. Google Cloud and Microsoft partner references reflect the supplied company identity. AWS is shown as platform expertise, not as a claimed AWS Partner Network membership. No ISO 27001 or SOC 2 certification is claimed.

Inquiry management is intentionally not exposed without a configured admin key. Set a long, random `API_ADMIN_KEY` and keep `.env` out of source control.