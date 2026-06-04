import type {
  AvailabilityStatus,
  ChecklistStatus,
  ImageStatus,
  PriceStatus,
  Provenance,
  PullRateStatus,
  RecordStatus,
} from "@/lib/catalog-status";

export type Lang = "en" | "zh" | "ja";
export type Market = "japanese" | "english";

/**
 * Rarity taxonomy. Extended to cover Kayou's full product line.
 * `C` is retained for demo-only seeds and should not be treated as a
 * confirmed Kayou rarity. `UNKNOWN` is the safe fallback for new imports.
 */
export type Rarity =
  | "R" | "SR" | "SSR" | "UR" | "OR" | "AR" | "SP" | "MR" | "BP" | "SE" | "GP"
  | "CR" | "ZR" | "CP" | "NR" | "TR" | "TGR" | "HR" | "SLR" | "LR" | "SCR"
  | "SLR+" | "SLR-" | "XR" | "XP" | "QR" | "PR" | "PTR" | "PU" | "ASP" | "BR" | "20th"
  | "SS-SE" | "SS-SV-G" | "SS-SV-S" | "SS-SP" | "SS-AR" | "SS-UR" | "SS-HR" | "SS-OR" | "SS-SSR"
  | "CC-MR" | "CC-PTR" | "CC-QR" | "CC-R" | "CC-SP" | "CC-SR" | "CC-SSR" | "CC-UR" | "CC-XR"
  | "C" | "UNKNOWN";

export type PackVariant = "booster" | "deluxe" | "collector";

/** Physical product category. Distinct from PackVariant (CN tier sub-types). */
export type ProductType =
  | "Booster Box"
  | "Deluxe Box"
  | "Collector Box"
  | "Loose Pack"
  | "Specialty Product";

/**
 * Catalog browsing family. Lets the Series index group products beyond
 * the legacy Japanese/English split (which is now more of a market flag).
 */
export type ProductFamily =
  | "chinese-tier"
  | "ex-rainbow"
  | "specialty"
  | "english";

/** Legacy price source flag. Migration-only; new code uses PriceStatus. */
export type PriceSource = "verified" | "estimate" | "pending";

/** Regional product version. Distinct from the site UI language. */
export type MarketRegion = "CN" | "SEA" | "NA" | "JP" | "GLOBAL" | "UNKNOWN";
/** Language actually printed on the physical card/box. */
export type PrintLanguage = "Chinese" | "English" | "Japanese" | "Mixed" | "Unknown";
/** Product line / release framework used by Kayou. */
export type ReleaseLine =
  | "Tier/Wave"
  | "Tier 2.5 / Capital Chapter"
  | "EX / Rainbow"
  | "Specialty"
  | "Heaven Scroll"
  | "Earth Scroll"
  | "Jin Series"
  | "Chapter Jin"
  | "Other"
  | "Unknown";
/** Legacy catalog confidence flag. Migration-only; new code uses RecordStatus. */
export type SourceStatus = "Verified" | "Community sourced" | "Unverified";

export interface Localized {
  en: string;
  zh: string;
  ja: string;
}

interface CatalogMeta {
  recordStatus?: RecordStatus;
  imageStatus?: ImageStatus;
  /** Per-fact provenance — separate name from legacy `priceSource` field. */
  identityProvenance?: Provenance;
  rarityProvenance?: Provenance;
  priceProvenance?: Provenance;
  sourceUrl?: string;
  sourceNotes?: string;
  verifiedAt?: string;
}

export interface Series extends CatalogMeta {
  id: string;
  name: Localized;
  releaseDate: string;
  market: Market;
  description: Localized;
  cover: string;
  marketRegion?: MarketRegion;
  printLanguage?: PrintLanguage;
  releaseLine?: ReleaseLine;
  productFamily?: ProductFamily;
  variantNotes?: string;
  /** Legacy. Use recordStatus on new records. */
  sourceStatus?: SourceStatus;
}

export interface Pack extends CatalogMeta {
  id: string;
  seriesId: string;
  name: Localized;
  tag: string;
  /** Kayou tier number — `2.5` is valid for the Capital Chapter line. */
  tier?: number;
  wave?: number;
  variant?: PackVariant;
  /** Community-sourced product code (e.g. NR-CC-B007). Display-only. */
  productCode?: string;
  /** Physical product category — overrides variant labelling when present. */
  productType?: ProductType;
  /** Catalog browsing family. */
  productFamily?: ProductFamily;
  image: string;
  totalCards: number;
  cardsPerPack: number;
  packsPerBox: number;
  ebayUrl: string;
  /** Latest known sealed-price reference in USD. 0/undefined → unavailable. */
  priceUsd: number;
  /** ISO date YYYY-MM-DD. Undefined → status-driven wording. */
  priceUpdated?: string;
  /** Legacy. New code reads priceStatus. */
  priceSource?: PriceSource;
  priceStatus?: PriceStatus;
  checklistStatus?: ChecklistStatus;
  pullRateStatus?: PullRateStatus;
  pullRates: { rarity: Rarity; odds: string }[];
  priceHistory: { date: string; price: number }[];
  marketRegion?: MarketRegion;
  printLanguage?: PrintLanguage;
  releaseLine?: ReleaseLine;
  variantNotes?: string;
  sourceStatus?: SourceStatus;
}

export interface Card extends CatalogMeta {
  id: string;
  /**
   * Legacy single-pack assignment. Optional and migration-only —
   * new card-to-pack relations live in CardAvailability.
   * Empty/undefined means "not assigned to any product yet".
   */
  packId?: string;
  number: string;
  name: Localized;
  character: string;
  rarity: Rarity;
  image: string;
  /** Legacy. New code reads imageStatus. */
  isPlaceholder?: boolean;
  priceUsd?: number;
  priceStatus?: PriceStatus;
  flavor: Localized;
  gradingPotentialScore?: number;
  estimatedPsa10Value?: number;
  worthGrading?: boolean;
  marketNotes?: string;
  marketRegion?: MarketRegion;
  printLanguage?: PrintLanguage;
  variantNotes?: string;
  sourceStatus?: SourceStatus;
}

/**
 * Many-to-many relation between a Card and a Pack. Provenance lives here,
 * not on the Card, because a single card can be available in multiple
 * products from different sources with different confidence levels.
 */
export interface CardAvailability {
  cardId: string;
  packId: string;
  availabilityStatus: AvailabilityStatus;
  isTierExclusive?: boolean;
  exclusivityNotes?: string;
  sourceUrl?: string;
  sourceNotes?: string;
  verifiedAt?: string;
}

/**
 * Display-only ordering for browse, checklists and grids.
 *
 * This order is for browse/checklist display only. Rarity value,
 * exclusivity and pull behavior may vary by product line, tier and wave.
 * Do not treat this as a global "highest collector tier → lowest" ranking.
 */
export const RARITY_DISPLAY_ORDER: Rarity[] = [
  "20th",
  "SS-SE",
  "SE",
  "SS-SV-G",
  "SS-SV-S",
  "BP",
  "BR",
  "PU",
  "PTR",
  "PR",
  "GP",
  "XR",
  "XP",
  "CC-XR",
  "QR",
  "CC-QR",
  "ZR",
  "SCR",
  "LR",
  "SLR+",
  "SLR",
  "SLR-",
  "TGR",
  "TR",
  "SS-HR",
  "HR",
  "CR",
  "MR",
  "CC-MR",
  "ASP",
  "CC-SP",
  "SS-SP",
  "SP",
  "SS-AR",
  "AR",
  "SS-OR",
  "OR",
  "SS-UR",
  "UR",
  "SS-SSR",
  "CC-SSR",
  "SSR",
  "CC-UR",
  "CC-SR",
  "SR",
  "CC-PTR",
  "R",
  "CC-R",
  "CP",
  "NR",
  "C",
  "UNKNOWN",
];

/** Backwards-compatible alias for code that imported the old name. */
export const RARITIES: Rarity[] = RARITY_DISPLAY_ORDER;

/** Numeric weights derived from display order (higher = earlier in lists). */
export const RARITY_ORDER: Record<Rarity, number> = RARITY_DISPLAY_ORDER.reduce(
  (acc, r, i) => {
    acc[r] = RARITY_DISPLAY_ORDER.length - i;
    return acc;
  },
  {} as Record<Rarity, number>,
);
