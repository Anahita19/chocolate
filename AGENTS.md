# ANAHITA Fine Chocolates — notes for future sessions

The notes below are the non-obvious things: how the sandbox runs the app, where the
things you are likely to edit live, and how to check your work. Manifests and
`README.md` cover the rest.

## Where this branch's code came from

`main` holds only the import skeleton (`README.md`, `LICENSE`, `.gitattributes`) — it has
no app, which is why a branch cut from it serves nothing and never starts. The site was
authored on the **`anahita-website-design`** branch and is carried here with:

```bash
git checkout origin/anahita-website-design -- .
```

Nothing else was changed. Do the same on any branch cut from `main`, and delete this note
if `anahita-website-design` is ever merged properly.

## Stack and how it runs here

- Vite + React single-page app (React Router). No backend, no database, no secrets.
  `docker-compose.base44.yml` runs `node:22`, bind-mounts the repo at `/app`, installs
  dependencies into the `web_node_modules` volume on startup and execs `vite` — so edits
  are live without rebuilding. Host port 3000 → the dev server on 5173.
- Healthcheck probes the dev server itself with node's built-in `fetch`. The first boot
  needs ~1 minute because the install runs before the server starts.
- `npm ci` (not `npm install`): the repo is bind-mounted, so a lockfile-rewriting install
  would dirty `package-lock.json` while you work.

## Sandbox-only overrides (all gated on `BASE44_PREVIEW_MODE === "1"`)

- `vite.config.js` adds `.<BASE44_SANDBOX_HOST_DOMAIN>` to `server.allowedHosts`,
  because the preview proxy reaches the dev server with a rotating
  `<port>-<sandbox id>.<domain>` Host header. With the flag unset the allow-list is just
  localhost.
- `server.watch.usePolling` is on: inotify events do not always survive the bind mount.
- HMR needs no extra config — the Vite client connects back to the page's own origin.
- The preview proxy supplies the public origin; nothing in the app hardcodes a host.

## Where to edit things

| What | Where |
| --- | --- |
| Brand, nav, boutique address/hours/phone/social, gallery framings, values | `src/data/site.js` |
| Products, gift boxes, collections, bestsellers, categories | `src/data/products.js` |
| Gift atelier options and price additions | `src/data/gifting.js` |
| Colours, type, spacing tokens | `src/styles/tokens.css` |
| Newsletter / enquiry / order / payment integration seam | `src/lib/integrations.js` |
| Cinematic hero: scroll distance, loading state, fallbacks | `src/components/HeroCinematic.jsx` |
| The hero film, and the still that stands in for it | `public/videos/`, `public/images/` |

**Boutique details are deliberately empty** (`addressLines`, `hours`, `phone`, `email`,
`instagramUrl`). The UI renders an elegant "to be confirmed" state instead of inventing
them. Fill them in `src/data/site.js` and pages, footer and contact update together.

## Imagery convention

Every image is `{ src, focus, zoom }`:
`focus` is a CSS position in `% %` used as `transform-origin`, `zoom` the scale applied
on top of `object-fit: cover` (see `src/components/FramedImage.jsx`).

- The boutique photographs in `public/images/` are the only photography available, and
  product cards are framings of them. Landmarks, measured against the interior shot:
  the chocolate case sits at roughly **55–66 % vertically**, the illuminated product
  shelves at about **30–46 %**, the floor is the bright band below ~75 %, and the
  storefront wordmark is the **top ~20 %** of the exterior shot. Aiming below ~75 %
  crops marble floor, which reads as a plain interior.
- Replace a framing with real product photography by pointing `src` at the new file and
  setting `zoom: 1, focus: '50% 50%'` — no component changes.
- Fonts are self-hosted variable WOFF2 files in `public/fonts/` (Cormorant Garamond,
  Montserrat) declared in `src/styles/fonts.css`; the app renders identically offline.

## The cinematic hero (scroll-scrubbed film)

- `public/videos/anahita-hero.mp4` is a **re-encode** of the clip the boutique supplied:
  H.264, 480×864 (portrait), 24 fps, 8 s, no audio, `+faststart`, and a keyframe every six
  frames. The supplied original carried **one keyframe for the whole clip**, so every seek
  decoded from the first frame — never put an un-rekeyframed export back in.
  Re-encode (ffmpeg 4.4, no ffmpeg on the sandbox host — run it through docker):
  ```bash
  docker run --rm -v "$PWD":/w jrottenberg/ffmpeg:4.4-alpine -y -i /w/hero-source.mp4 \
    -an -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -profile:v high -level 4.0 \
    -g 6 -keyint_min 6 -sc_threshold 0 -movflags +faststart /w/anahita-hero.mp4
  ```
- The film is **never played**. `HeroCinematic.jsx` only writes `video.currentTime`, from the
  scroll position inside its tall section; the inner viewport is `position: sticky`. The
  scroll handler records the target and a single `requestAnimationFrame` applies it, so
  scrolling re-renders nothing. `SCROLL_TRAVEL` (the section height, in vh) and `HOLD` (the
  slice of that travel resting on the final frame) live at the top of that file — keep the
  inline `height` and the mapping distance in step.
- The source is portrait, so on a wide desktop the `object-fit: cover` crop keeps the centre
  of the frame. A 1080×1920 export of the same clip would be sharper on large screens.
- Fallbacks share one branch, `scrubbing = false` → `chero--still`: `prefers-reduced-motion`,
  a film that fails to load, or a decoder that will not seek all fall back to the boutique
  photograph with the same headline, copy and CTAs and no pinned scroll section.
- The copy fades as the camera starts moving (`--p`, the progress custom property) and stops
  taking pointer events past the half-way point.

## What is not connected

- Newsletter sign-ups, corporate/contact enquiries and order requests are handled in
  `src/lib/integrations.js`. With no endpoint configured they stay on the device, and
  the UI says so — it never claims an email was sent, an order stored or a payment taken.
  Wiring an endpoint there (or a provider in `startPayment`) activates the real flow with
  no UI changes.
- The cart lives in `localStorage` under `anahita.cart.v1`.

## Verifying

There is no test suite. Check by hand:

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/     # expect 200
docker compose -f docker-compose.base44.yml logs --tail=40 web      # compile errors
# production sanity check (host node is only used for the version pin; run it in the
# container so it sees the installed dependencies, then drop the gitignored output)
docker compose -f docker-compose.base44.yml exec -T web npx vite build && rm -rf dist
```

Expect the dev server to serve unhashed source modules (`/src/main.jsx`, `/@react-refresh`);
a prebuilt bundle on port 3000 means the edit loop is broken.

Then drive the running app: add a chocolate to the bag from a product card, open the cart
drawer, use the gift atelier (`/personalise`, totals should change with each choice), and
place a test order through `/checkout` — it must land on `/order-confirmation` with a
reference and the bag emptied. Leave no test records in the cart afterwards.

The hero needs a browser, and `html { scroll-behavior: smooth }` animates programmatic
scrolls — poll for the frame instead of reading straight after `window.scrollTo`. Scroll
the homepage and check that `video.paused` stays `true` throughout, that 25/50/75/100 % of
the pin travel land on 25/50/75/100 % of the 8 s film (both directions), that stopping
holds the frame, and that the section releases into the next one with no gap (the hero's
bottom edge equals the next section's top edge).
