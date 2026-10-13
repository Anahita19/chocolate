# ANAHITA Fine Chocolates — notes for future sessions

The notes below are the non-obvious things: how the sandbox runs the app, where the
things you are likely to edit live, and how to check your work. Manifests and
`README.md` cover the rest.

## Stack and how it runs here

- Vite + React single-page app (React Router). No backend, no database, no secrets.
  `docker-compose.base44.yml` runs `node:22`, bind-mounts the repo at `/app`, installs
  dependencies into the `web_node_modules` volume on startup and execs `vite` — so edits
  are live without rebuilding. Host port 3000 → the dev server on 5173.
- Healthcheck probes the dev server itself with node's built-in `fetch`. The first boot
  needs ~1 minute because `npm install` runs before the server starts.

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
npm run build                                                        # production sanity check
```

Then drive the running app: add a chocolate to the bag from a product card, open the cart
drawer, use the gift atelier (`/personalise`, totals should change with each choice), and
place a test order through `/checkout` — it must land on `/order-confirmation` with a
reference and the bag emptied. Leave no test records in the cart afterwards.
