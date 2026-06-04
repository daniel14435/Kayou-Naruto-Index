import type { CardAvailability } from "./types";
import { cards } from "./cards";
import { SOURCE_PAGE } from "./cards_store_ready_2652_unique_by_series";

/**
 * Many-to-many Card ↔ Pack relations.
 *
 * Existing legacy `card.packId` seed entries are migrated here with
 * availabilityStatus: "demo" — these are MVP sample seeds, not real
 * sourced data. The Card Detail "Pullable from" UI hides demo relations.
 *
 * Real imported relations should use "community_sourced" / "verified" /
 * "official_source" with a sourceUrl when known.
 *
 * IMPORTANT: Migrated packs must contain ONLY real sourced cards.
 * Demo seeds are excluded from these pack IDs to prevent contamination.
 */
const MIGRATED_PACK_IDS = new Set([
  "t1w1-booster",
  "t1w1-deluxe",
  "t1w2-booster",
  "t1w3-booster",
  "t1w4-collector",
  "t2w1-booster",
  "t2w2-booster",
  "t2w3-deluxe",
  "t2w4-collector",
  "t2w5-cc",
  "t2w6-cc",
  "t2w7-cc",
  "t2w8-cc",
  "t2w9-cc",
  "t2-5-itachi-cloud",
  "ex-1-rainbow",
  "ex-2-rainbow",
  "ex-3-rainbow",
  "ex-4-rainbow",
  "ex-5-rainbow",
  "t3w1-booster",
  "t3w2-booster",
  "t3w3-deluxe",
  "t3w4-collector",
  "t3w5-cc",
  "t4w1-booster",
  "t4w2-booster",
  "t4w3-deluxe",
  "t4w4-deluxe",
  "t4w5-collector",
  "t4w6-cc",
  "t4w7-cc",
  "t4w8-cc",
  "specialty-youth-scroll",
  "specialty-new-years-gift",
  "specialty-heaven-earth-gift",
  "specialty-ninja-age",
  "specialty-ninja-age-noble",
  "specialty-badge-blind",
  "specialty-figure-boxes",
]);

const legacyCardAvailability: CardAvailability[] = cards
  .filter((c) => typeof c.packId === "string" && c.packId.length > 0 && !MIGRATED_PACK_IDS.has(c.packId))
  .map<CardAvailability>((c) => ({
    cardId: c.id,
    packId: c.packId as string,
    availabilityStatus: "demo",
  }));

const t1w1CardAvailability: CardAvailability[] = cards
  .filter((c) => c.id.startsWith("t1w1__"))
  .flatMap((c) => [
    {
      cardId: c.id,
      packId: "t1w1-booster",
      availabilityStatus: "community_sourced",
      sourceUrl: SOURCE_PAGE,
      sourceNotes: "T1W1 sourced from Capsule Corp Gear.",
    },
    {
      cardId: c.id,
      packId: "t1w1-deluxe",
      availabilityStatus: "community_sourced",
      sourceUrl: SOURCE_PAGE,
      sourceNotes: "T1W1 sourced from Capsule Corp Gear.",
    },
  ]);

const t4w4CardAvailability: CardAvailability[] = cards
  .filter((c) => c.id.startsWith("t4w4__"))
  .flatMap((c) => [
    {
      cardId: c.id,
      packId: "t4w4-deluxe",
      availabilityStatus: "community_sourced",
      sourceUrl: SOURCE_PAGE,
      sourceNotes: "T4W4 sourced from Capsule Corp Gear.",
    },
  ]);

const t1w2CardAvailability: CardAvailability[] = cards
  .filter((c) => c.id.startsWith("t1w2__"))
  .flatMap((c) => [
    {
      cardId: c.id,
      packId: "t1w2-booster",
      availabilityStatus: "community_sourced",
      sourceUrl: SOURCE_PAGE,
      sourceNotes: "T1W2 sourced from Capsule Corp Gear.",
    },
  ]);

const t1w3CardAvailability: CardAvailability[] = cards
  .filter((c) => c.id.startsWith("t1w3__"))
  .flatMap((c) => [
    {
      cardId: c.id,
      packId: "t1w3-booster",
      availabilityStatus: "community_sourced",
      sourceUrl: SOURCE_PAGE,
      sourceNotes: "T1W3 sourced from Capsule Corp Gear.",
    },
  ]);

const t1w4CardAvailability: CardAvailability[] = cards
  .filter((c) => c.id.startsWith("t1w4__"))
  .flatMap((c) => [
    {
      cardId: c.id,
      packId: "t1w4-collector",
      availabilityStatus: "community_sourced",
      sourceUrl: SOURCE_PAGE,
      sourceNotes: "T1W4 sourced from Capsule Corp Gear.",
    },
  ]);

const t2w1CardAvailability: CardAvailability[] = cards
  .filter((c) => c.id.startsWith("t2w1__"))
  .flatMap((c) => [
    {
      cardId: c.id,
      packId: "t2w1-booster",
      availabilityStatus: "community_sourced",
      sourceUrl: SOURCE_PAGE,
      sourceNotes: "T2W1 sourced from Capsule Corp Gear.",
    },
  ]);

const t2w2CardAvailability: CardAvailability[] = cards
  .filter((c) => c.id.startsWith("t2w2__"))
  .flatMap((c) => [
    {
      cardId: c.id,
      packId: "t2w2-booster",
      availabilityStatus: "community_sourced",
      sourceUrl: SOURCE_PAGE,
      sourceNotes: "T2W2 sourced from Capsule Corp Gear.",
    },
  ]);

const t2w3CardAvailability: CardAvailability[] = cards
  .filter((c) => c.id.startsWith("t2w3__"))
  .flatMap((c) => [
    {
      cardId: c.id,
      packId: "t2w3-deluxe",
      availabilityStatus: "community_sourced",
      sourceUrl: SOURCE_PAGE,
      sourceNotes: "T2W3 sourced from Capsule Corp Gear.",
    },
  ]);

const t2w4CardAvailability: CardAvailability[] = cards
  .filter((c) => c.id.startsWith("t2w4__"))
  .flatMap((c) => [
    {
      cardId: c.id,
      packId: "t2w4-collector",
      availabilityStatus: "community_sourced",
      sourceUrl: SOURCE_PAGE,
      sourceNotes: "T2W4 sourced from Capsule Corp Gear.",
    },
  ]);

function communityAvailabilityForPrefix(
  cardIdPrefix: string,
  packId: string,
  sourceSet: string,
): CardAvailability[] {
  return cards
    .filter((c) => c.id.startsWith(cardIdPrefix))
    .flatMap((c) => [
      {
        cardId: c.id,
        packId,
        availabilityStatus: "community_sourced",
        sourceUrl: SOURCE_PAGE,
        sourceNotes: `${sourceSet} sourced from Capsule Corp Gear.`,
      },
    ]);
}

const t2w5CardAvailability = communityAvailabilityForPrefix("t2w5__", "t2w5-cc", "T2W5");
const t2w6CardAvailability = communityAvailabilityForPrefix("t2w6__", "t2w6-cc", "T2W6");
const t2w7CardAvailability = communityAvailabilityForPrefix("t2w7__", "t2w7-cc", "T2W7");
const t2w8CardAvailability = communityAvailabilityForPrefix("t2w8__", "t2w8-cc", "T2W8");
const t2w9CardAvailability = communityAvailabilityForPrefix("t2w9__", "t2w9-cc", "T2W9");
const t25CardAvailability = communityAvailabilityForPrefix("t2.5__", "t2-5-itachi-cloud", "T2.5");
const ex1CardAvailability = communityAvailabilityForPrefix("ex1__", "ex-1-rainbow", "EX1");
const ex2CardAvailability = communityAvailabilityForPrefix("ex2__", "ex-2-rainbow", "EX2");
const ex3CardAvailability = communityAvailabilityForPrefix("ex3__", "ex-3-rainbow", "EX3");
const ex4CardAvailability = communityAvailabilityForPrefix("ex4__", "ex-4-rainbow", "EX4");
const ex5CardAvailability = communityAvailabilityForPrefix("ex5__", "ex-5-rainbow", "EX5");
const t3w1CardAvailability = communityAvailabilityForPrefix("t3w1__", "t3w1-booster", "T3W1");
const t3w2CardAvailability = communityAvailabilityForPrefix("t3w2__", "t3w2-booster", "T3W2");
const t3w3CardAvailability = communityAvailabilityForPrefix("t3w3__", "t3w3-deluxe", "T3W3");
const t3w4CardAvailability = communityAvailabilityForPrefix("t3w4__", "t3w4-collector", "T3W4");
const t3w5CardAvailability = communityAvailabilityForPrefix("t3w5__", "t3w5-cc", "T3W5");
const t4w1CardAvailability = communityAvailabilityForPrefix("t4w1__", "t4w1-booster", "T4W1");
const t4w2CardAvailability = communityAvailabilityForPrefix("t4w2__", "t4w2-booster", "T4W2");
const t4w3CardAvailability = communityAvailabilityForPrefix("t4w3__", "t4w3-deluxe", "T4W3");
const t4w6CardAvailability = communityAvailabilityForPrefix("t4w6__", "t4w6-cc", "T4W6");
const t4w7CardAvailability = communityAvailabilityForPrefix("t4w7__", "t4w7-cc", "T4W7");
const t4w8CardAvailability = communityAvailabilityForPrefix("t4w8__", "t4w8-cc", "T4W8");
const youthScrollCardAvailability = communityAvailabilityForPrefix("youthscroll__", "specialty-youth-scroll", "YouthScroll");
const newYearsCardAvailability = communityAvailabilityForPrefix("newyears__", "specialty-new-years-gift", "NewYears");
const heavenEarthCardAvailability = communityAvailabilityForPrefix("heaven&earth__", "specialty-heaven-earth-gift", "Heaven&Earth");
const ninjaAgeCardAvailability = communityAvailabilityForPrefix("ninjaage__", "specialty-ninja-age", "NinjaAge");
const ninjaAgeNCardAvailability = communityAvailabilityForPrefix("ninjaagen__", "specialty-ninja-age-noble", "NinjaAgeN");
const badgeCardAvailability = communityAvailabilityForPrefix("badge__", "specialty-badge-blind", "Badge");
const figureCardAvailability = communityAvailabilityForPrefix("figure__", "specialty-figure-boxes", "Figure");

const t4w5CardAvailability: CardAvailability[] = cards
  .filter((c) => c.id.startsWith("t4w5__"))
  .flatMap((c) => [
    {
      cardId: c.id,
      packId: "t4w5-collector",
      availabilityStatus: "community_sourced",
      sourceUrl: SOURCE_PAGE,
      sourceNotes: "T4W5 sourced from Capsule Corp Gear.",
    },
  ]);

export const cardAvailability: CardAvailability[] = [
  ...legacyCardAvailability,
  ...t1w1CardAvailability,
  ...t1w2CardAvailability,
  ...t1w3CardAvailability,
  ...t1w4CardAvailability,
  ...t2w1CardAvailability,
  ...t2w2CardAvailability,
  ...t2w3CardAvailability,
  ...t2w4CardAvailability,
  ...t2w5CardAvailability,
  ...t2w6CardAvailability,
  ...t2w7CardAvailability,
  ...t2w8CardAvailability,
  ...t2w9CardAvailability,
  ...t25CardAvailability,
  ...ex1CardAvailability,
  ...ex2CardAvailability,
  ...ex3CardAvailability,
  ...ex4CardAvailability,
  ...ex5CardAvailability,
  ...t3w1CardAvailability,
  ...t3w2CardAvailability,
  ...t3w3CardAvailability,
  ...t3w4CardAvailability,
  ...t3w5CardAvailability,
  ...t4w1CardAvailability,
  ...t4w2CardAvailability,
  ...t4w3CardAvailability,
  ...t4w4CardAvailability,
  ...t4w5CardAvailability,
  ...t4w6CardAvailability,
  ...t4w7CardAvailability,
  ...t4w8CardAvailability,
  ...youthScrollCardAvailability,
  ...newYearsCardAvailability,
  ...heavenEarthCardAvailability,
  ...ninjaAgeCardAvailability,
  ...ninjaAgeNCardAvailability,
  ...badgeCardAvailability,
  ...figureCardAvailability,
];
