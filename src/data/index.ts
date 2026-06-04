import { cards } from "./cards";
import { packs } from "./packs";
import { series } from "./series";
import { cardAvailability } from "./cardAvailability";
import { isPublicAvailability } from "@/lib/catalog-status";
import type { Card, CardAvailability, Pack, Series } from "./types";

export { cards, packs, series, cardAvailability };
export type { Card, Pack, Series, CardAvailability };

export function getSeries(id: string): Series | undefined {
  return series.find((s) => s.id === id);
}
export function getPack(id: string): Pack | undefined {
  return packs.find((p) => p.id === id);
}
export function getCard(id: string): Card | undefined {
  return cards.find((c) => c.id === id);
}
export function packsBySeries(seriesId: string): Pack[] {
  return packs.filter((p) => p.seriesId === seriesId);
}

/**
 * Cards available in a pack, resolved through CardAvailability with a
 * legacy fallback to `card.packId`. Demo relations remain here so pack
 * pages keep working internally — public hiding is per-surface.
 */
export function cardsByPack(packId: string): Card[] {
  const relationIds = new Set(
    cardAvailability.filter((r) => r.packId === packId).map((r) => r.cardId),
  );
  return cards.filter(
    (c) => relationIds.has(c.id) || (c.packId && c.packId === packId),
  );
}

/**
 * All packs a given card appears in. Use `publicOnly: true` to hide
 * demo/unverified relations from public-facing UI (e.g. "Pullable from").
 */
export function packsByCard(
  cardId: string,
  opts: { publicOnly?: boolean } = {},
): { pack: Pack; availability: CardAvailability }[] {
  return cardAvailability
    .filter((r) => r.cardId === cardId)
    .filter((r) => (opts.publicOnly ? isPublicAvailability(r.availabilityStatus) : true))
    .map((r) => ({ pack: packs.find((p) => p.id === r.packId)!, availability: r }))
    .filter((x) => !!x.pack);
}
