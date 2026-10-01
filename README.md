# Global World Clock — v1.1 Hardened

A read-only static world clock hosted on GitHub Pages. Thailand (`Asia/Bangkok`) is the reference.

## Privacy / security design
- No login or account credentials
- No backend, database, API calls or WebSocket connections
- No forms or data submission
- No cookies, localStorage or sessionStorage
- No analytics or third-party JavaScript/CDN
- Strict Content Security Policy (`connect-src 'none'`)
- IANA time zones and browser `Intl` API for DST-aware clocks
- Public location data contains city/time-zone metadata only
- `connected: true` means only that the location belongs to the coverage network; no player/account identifiers are stored

## Deploy
Upload/replace `index.html`, `style.css`, `app.js`, `data/locations.js`, `.nojekyll`, and this README in the repository root. GitHub Pages can continue publishing from `main` / `(root)`.

## Connected locations in v1.1
Auckland, Osaka, Seoul, Chiang Mai, Mumbai, Munich, London, Mexico City, San Francisco.

## Maintenance
To add a location, edit `data/locations.js` and use a valid IANA time-zone ID. Never add credentials, usernames, device IDs, account IDs, API keys, precise player locations, or other private data.
