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
| The entrance hero (film, wordmark, controls, scroll logic) | `src/components/Hero.jsx` |
| The hero photograph, and every other boutique framing | `public/images/` |
| The hero film, served untouched | `public/videos/anahita-hero.mp4` |
| The product page (photographs, price card, spec cards) | `src/pages/ProductDetail.jsx` |
| The box the customer fills themselves | `src/components/BoxBuilder.jsx` |
| How a filled box reaches the bag | `addBuiltBox` in `src/lib/cart.jsx` |

**Boutique details are deliberately empty** (`addressLines`, `hours`, `phone`, `email`,
`instagramUrl`). The UI renders an elegant "to be confirmed" state instead of inventing
them. Fill them in `src/data/site.js` and pages, footer and contact update together.

## Imagery convention

Every image is `{ src, focus, zoom }`:
`focus` is a CSS position in `% %` used as `transform-origin`, `zoom` the scale applied
on top of `object-fit: cover` (see `src/components/FramedImage.jsx`).

- `public/images/anahita-bar-box.jpg` is real product photography from the boutique (the
  bar box with the gold ANAHITA mark on its glass lid). The bar products point straight at
  it with neutral `focus`/`zoom`; new boutique photos land the same way. Convert a supplied
  PNG to JPEG before committing — docker image `jrottenberg/ffmpeg:4.4-alpine`,
  `-vf scale=…:flags=lanczos -q:v 3` (no ffmpeg on the sandbox host).
- Everything else is a framing of the two boutique photographs in `public/images/`.
  Landmarks, measured against the interior shot:
  the chocolate case sits at roughly **55–66 % vertically**, the illuminated product
  shelves at about **30–46 %**, the floor is the bright band below ~75 %, and the
  storefront wordmark is the **top ~20 %** of the exterior shot. Aiming below ~75 %
  crops marble floor, which reads as a plain interior.
- Replace a framing with real product photography by pointing `src` at the new file and
  setting `zoom: 1, focus: '50% 50%'` — no component changes.
- Fonts are self-hosted variable WOFF2 files in `public/fonts/` (Cormorant Garamond,
  Montserrat) declared in `src/styles/fonts.css`; the app renders identically offline.

## The entrance hero (scroll-scrubbed film)

- `src/components/Hero.jsx` renders `public/videos/anahita-hero.mp4` — the boutique
  walk-in — pinned in a `position: sticky` viewport inside a `--chero-scroll` (300vh)
  section (`.chero--film` in `src/styles/pages.css`). The visitor's scroll position drives
  `video.currentTime`: the clip is never played (`play()` is never called), never loops and
  never autoplays.
- The maths: a passive `scroll` listener only stores the target progress in a ref, and one
  `requestAnimationFrame` loop eases `shownRef` toward it (30 % of the gap per frame, then
  a snap) and writes `currentTime` — a seek is only issued when the drift is over half a
  frame **and** the previous seek has landed (with a 400 ms watchdog). React never renders
  on scroll. `travel` is `section height − stage height`, which is exactly the browser's
  own sticky release point, so progress 1 and the final frame coincide with the release.
- The still photograph stays underneath the film the whole time, so nothing is ever black
  while it loads; the film fades in only once a frame has been painted. The scrim and the
  hero copy ease away over the first third of the timeline (the copy is also
  `visibility: hidden` then, so it leaves the tab order).
- `prefers-reduced-motion: reduce` renders the photograph only, one viewport tall; a video
  error or one that never becomes ready within 15 s falls back to the same thing. Both keep
  the section at `100svh` with no dead scroll.
- The master is the client's original export and is served byte-for-byte (2.87 MB,
  **480×864 portrait, 24 fps, H.264, with an AAC track**). Do **not** re-encode, resize or
  "optimise" it — that is an explicit client requirement. Two consequences worth telling
  them about rather than fixing quietly: on a wide desktop viewport `object-fit: cover`
  upscales the portrait frame ~3× and crops it to a centre band, and seeking resolves
  against whatever keyframes the export has. A landscape master (H.264, frequent
  keyframes) is the fix for both; swap the file and nothing else needs to change.
- Scroll length is one number to taste: `--chero-scroll` in `src/styles/pages.css`.

## The product page and «جعبه را خودت بچین»

- `src/pages/ProductDetail.jsx` is two columns: the photographs (cursor-following zoom,
  thumbnails, lightbox) and a reading card — price and controls, a `.pdp__aside` card that
  leads to the builder, the tasting profile as a pull-quote, the maker's note, and `.spec-card`
  panels. Every string comes from `products.js`; nothing is written in the component. The card
  is no longer `position: sticky` — it is taller than the viewport, and a pinned column that
  long hides its own tail.
- `src/components/BoxBuilder.jsx` fills the box on that page. Capacity is `pieceCount(boxSize)`
  (`src/lib/format.js` reads the figure out of «۱۲ پرالین»), and the box is only offered when
  the product is not a bar and holds at least six pieces. The pieces offered are the boutique's
  own chocolates — `products` minus bars, minus the ready-made whole-box assortment, minus the
  product itself.
- **The price does not change with the arrangement.** The boutique prices the box, not the
  piece, so the builder only fills slots; there is no per-piece price anywhere in the data and
  none should be invented. If per-piece pricing is ever wanted, it needs a new field in
  `products.js` and a new line in `addBuiltBox` — the component never touches money.
- The bag line is an ordinary product line with its own key: `built:<id>:<compositions>`, name
  suffixed «— چیده‌شده توسط شما», and the arrangement in `weight`, which the drawer, the
  checkout payload and the order payload already carry. Two different arrangements of the same
  box stay two lines. `OrderConfirmation` prints the name only; the composition is in the order
  record but not on that page.

## Language and direction (Persian, RTL)

- The site is Persian and right-to-left: `index.html` sets `lang="fa" dir="rtl"`.
- Persian text is set in **Vazirmatn** (`public/fonts/vazirmatn-{arabic,latin}.woff2`, declared in
  `src/styles/fonts.css`); `--serif` and `--sans` both lead with it. `--brand-serif` keeps Cormorant
  Garamond for the Latin ANAHITA lockup in `Logo.jsx` — the wordmark stays Latin on purpose, every
  other string is Persian.
- `src/styles/rtl.css` is imported last and holds the corrections the Latin stylesheet needs: it
  removes letter-spacing (tracking breaks Arabic-script joins) except on the brand lockup, grows the
  nav underline from the right edge, and re-pins left-aligned blocks. Put RTL fixes there.
- Every figure a visitor reads goes through `src/lib/format.js`: `formatToman` writes Persian digits
  with the Persian thousands separator, `toPersianDigits` covers counts, steppers and step numbers,
  and `persianYear()` is the Solar Hijri year in the footer. Slugs, order references and email
  addresses stay Latin.
- `ProductRail` is RTL-aware: `scrollLeft` runs negative here, so it measures with `Math.abs()` and
  flips both the scroll direction and the arrow keys.

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

The box builder: on a boxed product page the `.pdp__aside` card leads to `#build-box`. The
tray must hold exactly as many slots as `boxSize` says; a `+` fills one and tapping a filled
slot in the tray gives it back; the count reads «n از total» in the tray and, below 980px,
again beside the chocolate list; the add button stays disabled until the box is full. Adding
it must open the drawer with a line named «… — چیده‌شده توسط شما», the arrangement (in Persian
digits) as its meta line, and the product's own price — add a built box, then remove that one
line and confirm the bag is back to what it was.

The hero is the scroll-scrubbed film: check the homepage shows a `<video>` for
`/videos/anahita-hero.mp4` at `data-state="ready"`, that it is `paused` and not `loop`ed at
every point, and that scrolling moves `currentTime` (it must read 0 at the top of the page,
`duration − 0.001` once `scrollY` reaches `section height − stage height`, and move back
again when you scroll up). While the sticky viewport is pinned the stage's `top` must stay
at 0. Also confirm `public/videos/anahita-hero.mp4` still matches the client's master
(`md5sum`), and that the next section starts at the hero's bottom edge with no gap.
