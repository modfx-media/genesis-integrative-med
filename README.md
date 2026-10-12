# Genesis Integrative Medicine

Next.js App Router marketing site with Payload CMS 3 as the content data plane. Designed pages stay as the visual fallback until a document is **published**.

## Local development

```bash
cp .env.example .env.local
# Set PAYLOAD_SECRET, PREVIEW_SECRET, and Neon pooled DATABASE_URL
npm install
npm run dev
```

- Public site: http://localhost:3000
- Admin: http://localhost:3000/admin

## CMS scripts

| Script | Purpose |
|---|---|
| `npm run cms:export` | Rebuild `data/content-export.json` from hardcoded content |
| `npm run cms:validate-export` | Ensure export covers every editorial sitemap path |
| `npm run cms:import -- --apply` | Idempotent draft import (`CMS_IMPORT_APPLY=1`) |
| `npm run cms:ensure-admin` | Create/reset local admin user |
| `npm run cms:bootstrap` | Ping Payload + create first admin if missing |
| `npm run generate:types` | Regenerate `payload-types.ts` |
| `npm run generate:importmap` | Regenerate Payload admin import map |

Import defaults to **draft**. Do not bulk-publish over designed pages.

## Vercel / Neon checklist (ops)

Set on Production **and** Preview:

- `PAYLOAD_SECRET`
- `PREVIEW_SECRET`
- `DATABASE_URL` (Neon **pooled** `*-pooler.*`)
- `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_SERVER_URL` = `https://genesisintegrativemed.com` (never localhost)
- `BLOB_READ_WRITE_TOKEN` (otherwise `/media` 404s in production)

After env changes, redeploy and confirm `curl -I /admin` is not 500. A healthy homepage with a 500 `/admin` usually means missing `PAYLOAD_SECRET` or pooled `DATABASE_URL`.
