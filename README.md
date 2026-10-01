# Pokémon GO Global World Clock

DST-aware static world clock using Thailand (`Asia/Bangkok`) as the reference.

## Run locally
Open `index.html`, or run `python -m http.server 8000` and visit `http://localhost:8000`.

## Publish with GitHub Pages
1. Create a public repository named `pokemon-go-global-clock`.
2. Upload all files/folders in this package to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/(root)`, then Save.
6. Visit `https://YOUR-USERNAME.github.io/pokemon-go-global-clock/`.

Edit `data/locations.js` to change nodes. Use valid IANA time-zone identifiers.
