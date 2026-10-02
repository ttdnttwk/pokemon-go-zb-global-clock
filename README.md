# Global World Clock & Event Time Planner — V1.2

Read-only static GitHub Pages tool using Thailand (`Asia/Bangkok`) as reference.

## Features
- HH:MM clocks, no seconds; refresh every 30 seconds
- Coverage / Tier 1 / All Locations
- 10 Coverage Locations
- Planner on Coverage and Tier 1
- Next Saturday default; Today quick-select; date picker
- 14:00–17:00 default, 10:00–20:00 preset, Custom start/end
- Selected local date/time converted to Thailand using IANA zones and the selected date (DST-aware)
- Planner ordered by Thailand planning sequence
- No API, backend, login, cookies, analytics, storage, telemetry, or third-party dependencies
- CSP blocks outbound connections (`connect-src 'none'`)

## Deploy
Replace the repository-root files with this package. Keep GitHub Pages on `main` → `/(root)`.

Never add player usernames, account IDs, credentials, API keys, device identifiers, or precise player locations.
