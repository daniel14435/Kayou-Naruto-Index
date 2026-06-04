/**
 * ShinobIndex — Card Import Schema (v3, many-to-many ready)
 * ---------------------------------------------------------
 * Card identity ONLY. Pack assignment lives in CardAvailability —
 * see `cardAvailabilityImportSchema.ts`. A real card may exist in the
 * catalog with no pack relation until verification is complete.
 *
 * Rules:
 *   - Never invent card names, numbers, art, or prices.
 *   - Imports from community references (e.g. Capsule Corp Gear) must
 *     stay recordStatus: "community_sourced" until cross-checked.
 *   - Only mark "verified" or "official_source" with explicit evidence.
 */

import type { Rarity, MarketRegion, PrintLanguage } from "./types";
import type {
  ImageStatus,
  PriceStatus,
  Provenance,
  RecordStatus,
} from "@/lib/catalog-status";

export interface CardImport {
  /** Stable internal id (e.g. "kayou-tier3-wave2-nr-001"). */
  id: string;
  number: string;
  character: string;
  nameEn: string;
  nameJa?: string;
  nameZh?: string;
  rarity: Rarity;
  image?: string;
  marketRegion?: MarketRegion;
  printLanguage?: PrintLanguage;
  estimatedRawValueUsd?: number;
  estimatedPsa10ValueUsd?: number;
  gradingPotentialScore?: number;
  worthGrading?: boolean;
  marketNotes?: string;
  recordStatus?: RecordStatus;
  imageStatus?: ImageStatus;
  priceStatus?: PriceStatus;
  identityProvenance?: Provenance;
  rarityProvenance?: Provenance;
  priceProvenance?: Provenance;
  sourceUrl?: string;
  sourceNotes?: string;
  verifiedAt?: string;
}

export const CARD_IMPORTS: CardImport[] = [];
