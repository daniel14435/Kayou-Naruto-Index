# ShinobIndex — Catalog import notes

Three import surfaces work together:

1. **`cardImportSchema.ts`** — card identity (id, number, character, rarity, image, optional market data). No `packId`.
2. **`cardAvailabilityImportSchema.ts`** — many-to-many Card ↔ Pack relations. One row per `(cardId, packId)` pair.
3. **`packs.ts`** — sealed products (already in place).

## Status discipline

- `availabilityStatus: "demo"` — MVP seed relations only. Never publicly shown as a real pull source.
- `availabilityStatus: "unverified"` — placeholder while we're still researching.
- `availabilityStatus: "community_sourced"` — Capsule Corp Gear and similar references. Allowed in public UI but always labeled as community-sourced.
- `availabilityStatus: "verified"` — independently cross-checked with at least one strong source plus a visible card.
- `availabilityStatus: "official_source"` — explicit Kayou-published material.

## Per-fact provenance

`identityProvenance`, `rarityProvenance`, `priceProvenance` on a Card and `priceProvenance` on a Pack accept `{ status, url?, notes? }`. Use one per fact; do not collapse all provenance into a single field.

## The real NR card

Stored with `packId` omitted and no `CardAvailability` entry until exact product mapping is confirmed. The Card Detail page renders a "Verification pending" notice and hides the "Pullable from" section.
