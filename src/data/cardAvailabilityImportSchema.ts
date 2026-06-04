/**
 * ShinobIndex — Card ↔ Pack relation import schema.
 *
 * A single card may legitimately appear in multiple products with
 * different confidence levels. Each relation carries its own
 * provenance. Demo seed relations stay status "demo" and are hidden
 * from public "Pullable from" UI.
 */

import type { AvailabilityStatus } from "@/lib/catalog-status";

export interface CardAvailabilityImport {
  cardId: string;
  packId: string;
  availabilityStatus: AvailabilityStatus;
  isTierExclusive?: boolean;
  exclusivityNotes?: string;
  sourceUrl?: string;
  sourceNotes?: string;
  verifiedAt?: string;
}

export const CARD_AVAILABILITY_IMPORTS: CardAvailabilityImport[] = [];
