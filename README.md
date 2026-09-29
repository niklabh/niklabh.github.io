# niklabh.github.io

Source for [niklabh.github.io](https://niklabh.github.io) — the personal site
and portfolio of **Nikhil Ranjan** (`@niklabh`).

A single-file, static landing page (no build step) hosted on GitHub Pages.

## Develop

Just open `index.html` in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then visit <http://localhost:8000>.

## Resume

The resume lives at the repo root:

- `Nikhil Ranjan Resume.tex` — source (XeLaTeX / LuaLaTeX)
- `Nikhil Ranjan Resume 2026.pdf` — compiled PDF, linked from the site nav

Compile with:

```bash
xelatex "Nikhil Ranjan Resume.tex"
```

## Links

- GitHub: <https://github.com/niklabh>
- LinkedIn: <https://www.linkedin.com/in/niklabh/>
- X: <https://x.com/niklabh>

## Icon credits

- UI icons: [Solar](https://github.com/480-Design/Solar-Icon-Set) (CC BY 4.0), inlined as an SVG sprite
- Brand glyphs (GitHub, LinkedIn, X, Telegram, Medium, npm): [Remix Icon](https://github.com/Remix-Design/RemixIcon) (Apache 2.0)
- Technology logos in `images/icons/`: [gilbarbara/logos](https://github.com/gilbarbara/logos) (CC0),
  with Polkadot, Substrate, Tokio and Express from [Simple Icons](https://github.com/simple-icons/simple-icons) (CC0)
  and Kusama from [Web3 Icons](https://github.com/0xa3k5/web3icons) (MIT)
