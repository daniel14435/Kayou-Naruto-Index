# Naruto Kayou Cards — Plan

The world's first dedicated catalog for Naruto Kayou official cards. Mobile-first, fast, SEO-friendly, with community features .

## 1. Content model (static JSON to start)

Stored in `src/data/` as typed TypeScript files so it ships with the bundle (no admin needed):

- **Series** — e.g. "Tier 1 Wave 1", "Tier 2 EX", "Tier 3"
  - id, name (EN/中文/JP), release date, cover image, description
- **Packs** — booster boxes / display boxes inside a series
  - id, seriesId, name, image, total cards, ebayUrl (search query link), avg price (USD), pull rates per rarity
- **Cards** — every card inside a pack
  - id, packId, name (EN/中文/JP), number (e.g. NR-001), rarity (SR, SSR, UR, SP, etc.), character, image, lore/flavor text

I'll seed ~3 series, ~6 packs, ~40 sample cards so the site feels populated. You replace the JSON later.

## 2. Pages & routes

```text
/                       Home — hero + series grid + featured cards
/series                 All series list
/series/$seriesId       Series detail — packs in this series
/packs/$packId          Pack detail — cards grid + price bar + pull rates
/cards/$cardId          Single card — large image, zoom, lore, ratings, comments
/search                 Global search with filter chips
/about                  About the project
```

Each route gets its own `head()` metadata (title, description, og:image from card/pack art) for SEO and shareable links.

## 3. Pack detail page (the core view)

- Hero: pack image, name, series, release date, total cards
- **Sticky price bar** at top on mobile, side on desktop:
  - "Latest eBay price: $XX.XX" → button **"View on eBay"** that opens the pack's `ebayUrl` in a new tab
  - Small note: "Live price from eBay listings"
- **Pull-rate panel**: rarity → odds (e.g. "SSR: 1 : 24 packs")
- **Price history chart** (Recharts) — sample data for now, ready for a real API later
- **Cards grid**: thumbnail + name underneath, click → card detail
- Filter chips: rarity, character

## 4. Card detail page

- Large image with click-to-zoom (lightbox)
- Name in selected language, card number, rarity badge, character, parent pack link
- Lore / flavor text
- Community: star rating (avg + your rating) and comments (logged-in users)
- "Appears in pack" CTA → back to pack with eBay link

## 5. Search & filters

- Global search bar in header (cmd/ctrl+K)
- Filters: series, pack, rarity, character, language
- Powered client-side (Fuse.js) since dataset is static — instant on mobile
- Filter state lives in URL search params so results are shareable

## 6. Community features (Lovable Cloud)

Backend tables:

- `profiles` (id, display_name, avatar)
- `user_roles` (separate table, never on profile — admin/user)
- `card_ratings` (user_id, card_id, stars 1-5)
- `card_comments` (user_id, card_id, body, created_at)

Auth: email/password + Google. RLS so users can only edit their own ratings/comments. No admin panel UI for cards (data is static), but I'll set up the role system so we can add one later.

## 7. Internationalization (EN / 中文 / JP)

- Lightweight i18n via a small context + JSON dictionaries in `src/i18n/`
- Card data carries name in 3 languages on the object itself
- Language switcher in header; choice persisted to localStorage and URL

## 8. Dark mode

- `next-themes`-style toggle (we already have Tailwind dark variants)
- Default: respects system preference

## 9. Mobile optimization

- Mobile-first Tailwind breakpoints, bottom nav bar on phones
- Card grids: 2 cols mobile → 3 tablet → 5 desktop
- Sticky pack price bar above the fold on mobile
- Lazy-loaded images (`loading="lazy"`), AVIF/WebP where possible
- Touch-friendly zoom on card images

## 10. Design direction

Card-collector aesthetic: deep ink-black background, parchment cream text, vermillion red accents (Naruto headband), subtle hand-brushed kanji texture on hero, sharp edges with single accent radius. Typography: a brushed display face for headings, clean sans for body. I'll generate 3 visual directions for you to pick from before building.

## 11. Out of scope for v1 (easy to add later)

- Real-time eBay price scraping (currently a static `ebayUrl` per pack — link always works, displayed price refreshed manually)
- Admin dashboard
- Deck builder, wishlist, collection tracker
- Trading marketplace

---

## Technical notes

- **Stack**: TanStack Start (already set up), Tailwind v4, shadcn/ui, Recharts, Fuse.js, Lovable Cloud (auth + community tables).
- **Data**: typed TS files in `src/data/{series,packs,cards}.ts` — no DB queries for catalog content, so pages are fast and SSR-friendly.
- **eBay link**: per-pack `ebayUrl` field (e.g. `https://www.ebay.com/sch/i.html?_nkw=naruto+kayou+tier+1+wave+1+booster+box`). Each pack card and the price bar use the same link.
- **Routes**: file-based under `src/routes/` — every section is its own route for SEO (no hash anchors).
- **i18n**: simple context + dictionary; no heavy library.
- **Auth-gated actions** (rate, comment): use server functions with `requireSupabaseAuth`.
- Add English /japanese filter to split each market 
  &nbsp;

After you approve, I'll generate 3 design directions for you to pick, then build.