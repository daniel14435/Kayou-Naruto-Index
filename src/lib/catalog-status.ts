/**
 * ShinobIndex — Catalog status & copy helpers.
 *
 * Single source of truth for verification-aware labels. Two strictly
 * separate concepts live here:
 *   - Price metric label (always "Estimated sealed price")
 *   - Price status label  (Prototype estimate / Manual reference / Verified market reference / Unavailable)
 * Never mix them in a single helper.
 */

import type { MarketRegion, PrintLanguage, ProductFamily, ReleaseLine } from "@/data/types";

export const CAPSULE_CORP_SOURCE_URL = "https://capsulecorpgear.com/naruto-kayou-card-guide/";
export const CAPSULE_CORP_REFERENCE_LABEL =
  "Product catalog reference: Capsule Corp Gear";

export type RecordStatus = "demo" | "community_sourced" | "verified" | "official_source";
export type ImageStatus = "placeholder" | "uploaded_unverified" | "verified";
export type PriceStatus = "demo_estimate" | "manual_reference" | "market_verified" | "unavailable";
export type ChecklistStatus = "incomplete" | "community_sourced" | "verified" | "official_source";
export type PullRateStatus = "demo_estimate" | "community_sourced" | "verified" | "unavailable";
export type AvailabilityStatus = "demo" | "unverified" | "community_sourced" | "verified" | "official_source";

/** Per-fact provenance attached to a Card or Pack field. */
export interface Provenance {
  status: RecordStatus;
  url?: string;
  notes?: string;
}

// -----------------------------------------------------------------------
// Price wording — METRIC and STATUS are intentionally separate concepts.
// -----------------------------------------------------------------------

/** Constant metric label. Always the same regardless of status. */
export const PRICE_METRIC_LABEL = "Estimated sealed price";
/** Single-card metric label — distinct from sealed product. */
export const CARD_PRICE_METRIC_LABEL = "Estimated card value";

export function priceStatusLabel(s?: PriceStatus): string {
  switch (s) {
    case "market_verified":
      return "Verified market reference";
    case "manual_reference":
      return "Manual reference";
    case "unavailable":
      return "Unavailable";
    case "demo_estimate":
    default:
      return "Prototype estimate";
  }
}

// -----------------------------------------------------------------------
// Other shared copy
// -----------------------------------------------------------------------

export const eBayCtaLabel = "View listings on eBay";

export function formatRegion(r?: MarketRegion): string {
  switch (r) {
    case "CN":
      return "CN";
    case "SEA":
      return "SEA";
    case "NA":
      return "NA";
    case "JP":
      return "JP";
    case "GLOBAL":
      return "Global";
    case "UNKNOWN":
    default:
      return "Region unverified";
  }
}

export function formatPrintLanguage(p?: PrintLanguage): string {
  if (!p || p === "Unknown") return "Print language unverified";
  return p;
}

export function formatReleaseLine(r?: ReleaseLine): string {
  if (!r || r === "Unknown") return "Release line unverified";
  return r;
}

export function recordStatusLabel(s?: RecordStatus): string {
  switch (s) {
    case "verified":
      return "Verified";
    case "official_source":
      return "Official source";
    case "community_sourced":
      return "Community sourced";
    case "demo":
    default:
      return "Prototype data";
  }
}

export function availabilityStatusLabel(s?: AvailabilityStatus): string {
  switch (s) {
    case "verified":
      return "Verified";
    case "official_source":
      return "Official source";
    case "community_sourced":
      return "Community sourced";
    case "unverified":
      return "Unverified";
    case "demo":
    default:
      return "Prototype data";
  }
}

export function checklistStatusLabel(s?: ChecklistStatus): string {
  switch (s) {
    case "verified":
      return "Verified checklist";
    case "official_source":
      return "Official checklist";
    case "community_sourced":
      return "Community-sourced checklist";
    case "incomplete":
    default:
      return "Checklist incomplete";
  }
}

/** Status-aware copy for the Box Potential disclaimer. */
export function boxPotentialNote(s?: RecordStatus | PriceStatus): string {
  if (s === "verified" || s === "official_source" || s === "market_verified") {
    return "Market reference based on verified loaded data. Pulling specific cards is never guaranteed.";
  }
  if (s === "community_sourced") {
    return "Community-sourced reference. Values still pending independent verification.";
  }
  return "Prototype estimate based on currently loaded sample data. Final card values, pull rates and product versions require verification.";
}

/**
 * Whether a CardAvailability relation should be shown publicly on the
 * "Pullable from" card-detail section. Demo and unverified relations stay
 * hidden so prototype data never appears as a real product pull source.
 */
export function isPublicAvailability(s?: AvailabilityStatus): boolean {
  return s === "community_sourced" || s === "verified" || s === "official_source";
}

/** True when a sealed-price reference can be displayed publicly. */
export function isPriceAvailable(status?: PriceStatus, priceUsd?: number): boolean {
  if (status === "unavailable") return false;
  return typeof priceUsd === "number" && priceUsd > 0;
}

export function productFamilyLabel(f?: ProductFamily): string {
  switch (f) {
    case "chinese-tier":
      return "Chinese Tier Products";
    case "ex-rainbow":
      return "EX / Rainbow Packs";
    case "specialty":
      return "Specialty Products";
    case "english":
      return "English Products";
    default:
      return "Other";
  }
}
