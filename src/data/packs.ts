import type { Pack, Rarity } from "./types";
import { ebaySearch } from "@/lib/ebay";
import { CAPSULE_CORP_SOURCE_URL } from "@/lib/catalog-status";
import enVol1Image from "@/assets/packs/Jin 1 Serires 1 ENGlish - Tier 4 wave 6.png";
import enVol2Image from "@/assets/packs/Jin 1 Serires 2 ENGlish -.png";
import enVol3Image from "@/assets/packs/Jin 1 Seires 3 - Englsish Version.png";
import t4w4Image from "@/assets/packs/t4w4 - CN - New Pic.png";
import t4w5Image from "@/assets/packs/t4w5-naruto-pain.png";
import t4w7Image from "@/assets/packs/Tier 4 Wave 7 - CN.png";
import t4w8Image from "@/assets/packs/Tier 4 Wave 8 - CN.png";
import t2w7Image from "@/assets/packs/Tier_2_wave_7 - CN.png";
import t4w2MegaboxImage from "@/assets/packs/Tier_4_Wave_2_-36_packs - CN.png";
import specialtyNinjaAgeImage from "@/assets/packs/Age of Ninjas.png";
import t4w6Image from "@/assets/packs/CN T4 W6.png";
import t3w3Image from "@/assets/packs/kayou-naruto-tier-3-wave-3-.png";
import specialtyHeavenEarthImage from "@/assets/packs/Naruto_CollectorHeaven_Earth.png";
import specialtyNewYearsImage from "@/assets/packs/naruto_kayou_chinese_new_year.png";
import t3w1Image from "@/assets/packs/NarutoT3 W1.png";
import t2w2Image from "@/assets/packs/T2 W2.png";
import t2w8Image from "@/assets/packs/T2 Wave 8.png";
import t2w9Image from "@/assets/packs/T2 wave 9.png";
import t3w5Image from "@/assets/packs/T3-w5.png";
import t4w3Image from "@/assets/packs/T4 Wave 3.png";
import t1w2Image from "@/assets/packs/Tier 1 Wave 2.png";
import t1w3Image from "@/assets/packs/Tier 1 wave 3.png";
import t2w5Image from "@/assets/packs/Tier 2 wave  5.png";
import t2w1Image from "@/assets/packs/Tier 2 wave 1.png";
import t2w3Image from "@/assets/packs/Tier 2 Wave 3.png";
import t2w4Image from "@/assets/packs/Tier 2 Wave 4.png";
import t2w6Image from "@/assets/packs/Tier 2 wave 6.png";
import t3w4Image from "@/assets/packs/Tier 3 Wave 4.png";
import t3w2Image from "@/assets/packs/Wave 2 Tier 3.png";

function history(base: number, n = 12): { date: string; price: number }[] {
  const out: { date: string; price: number }[] = [];
  const start = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(start);
    d.setMonth(d.getMonth() - i);
    const noise = Math.sin(i * 1.3) * 0.12 + (Math.random() - 0.5) * 0.08;
    out.push({
      date: d.toISOString().slice(0, 7),
      price: Math.round(base * (1 + noise) * 100) / 100,
    });
  }
  return out;
}

const standardRates: { rarity: Rarity; odds: string }[] = [
  { rarity: "C", odds: "1 : 1" },
  { rarity: "R", odds: "1 : 3" },
  { rarity: "SR", odds: "1 : 6" },
  { rarity: "SSR", odds: "1 : 24" },
  { rarity: "UR", odds: "1 : 72" },
  { rarity: "SP", odds: "1 : 288" },
];

// Pack image pool — placeholder until real Kayou box scans are uploaded.
const img = [
  "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=900&q=80",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=80",
  "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=900&q=80",
  "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=900&q=80",
  "https://images.unsplash.com/photo-1604335079441-0254acdc9544?w=900&q=80",
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=900&q=80",
  "https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?w=900&q=80",
];

interface Seed {
  seriesId: string;
  tier: 1 | 2 | 3 | 4;
  wave: number;
  variant: "booster" | "deluxe" | "collector";
  price: number;
}

const jp: Seed[] = [
  { seriesId: "tier-1", tier: 1, wave: 1, variant: "booster", price: 64 },
  { seriesId: "tier-1", tier: 1, wave: 1, variant: "deluxe", price: 119 },
  { seriesId: "tier-1", tier: 1, wave: 2, variant: "booster", price: 58 },
  { seriesId: "tier-1", tier: 1, wave: 3, variant: "booster", price: 55 },
  { seriesId: "tier-1", tier: 1, wave: 4, variant: "collector", price: 145 },
  { seriesId: "tier-2", tier: 2, wave: 1, variant: "booster", price: 78 },
  { seriesId: "tier-2", tier: 2, wave: 2, variant: "booster", price: 72 },
  { seriesId: "tier-2", tier: 2, wave: 3, variant: "deluxe", price: 132 },
  { seriesId: "tier-2", tier: 2, wave: 4, variant: "collector", price: 168 },
  { seriesId: "tier-3", tier: 3, wave: 1, variant: "booster", price: 92 },
  { seriesId: "tier-3", tier: 3, wave: 2, variant: "booster", price: 88 },
  { seriesId: "tier-3", tier: 3, wave: 3, variant: "deluxe", price: 154 },
  { seriesId: "tier-3", tier: 3, wave: 4, variant: "collector", price: 215 },
  { seriesId: "tier-4", tier: 4, wave: 1, variant: "booster", price: 105 },
  { seriesId: "tier-4", tier: 4, wave: 2, variant: "booster", price: 110 },
  { seriesId: "tier-4", tier: 4, wave: 3, variant: "deluxe", price: 178 },
  // T4W4 / T4W5 removed from prototype seeds — replaced below with real
  // community-sourced product records (NR-RD-Z004 / NR-RD-Z005). Their
  // original ids (t4w4-deluxe / t4w5-collector) are preserved for route
  // stability and to keep the indexed product count unchanged.
];

const variantMeta = {
  booster: { suffix: { en: "Booster Box", zh: "补充包整盒", ja: "ブースターBOX" }, totals: [150, 5, 18] as const },
  deluxe:  { suffix: { en: "Deluxe Box",  zh: "豪华盒",       ja: "デラックスBOX" }, totals: [150, 8, 12] as const },
  collector: { suffix: { en: "Collector Box", zh: "典藏盒", ja: "コレクターBOX" }, totals: [180, 6, 16] as const },
};

// Demo packs that have been matched to a community-sourced product identity
// keep their prototype card/price content, but gain the community productCode
// and source provenance. Status remains "demo" because card/price data itself
// is still prototype; only the product identity is community-sourced.
const demoIdentityMerges: Record<
  string,
  { productCode?: string; sourceUrl?: string; sourceNotes?: string }
> = {
  "t1w2-booster": {
    productCode: "NR-CC-L002",
    sourceUrl: CAPSULE_CORP_SOURCE_URL,
    sourceNotes:
      "Product identity matched to Capsule Corp Gear T1W2 (NR-CC-L002). Card list and prices remain prototype data.",
  },
  "t1w3-booster": {
    productCode: "NR-CC-L003",
    sourceUrl: CAPSULE_CORP_SOURCE_URL,
    sourceNotes:
      "Product identity matched to Capsule Corp Gear T1W3 (NR-CC-L003). Card list and prices remain prototype data.",
  },
  "t1w4-collector": {
    productCode: "NR-CC-L004",
    sourceUrl: CAPSULE_CORP_SOURCE_URL,
    sourceNotes:
      "Product identity matched to Capsule Corp Gear T1W4 (NR-CC-L004). Card list and prices remain prototype data.",
  },
};

const jpPacks: Pack[] = jp.map((s, i) => {
  const tag = `T${s.tier}W${s.wave}${s.variant === "booster" ? "" : s.variant === "deluxe" ? "·DLX" : "·COL"}`;
  const v = variantMeta[s.variant];
  const baseName = `Tier ${s.tier} Wave ${s.wave}`;
  const id = `t${s.tier}w${s.wave}-${s.variant}`;
  const ebayQ = `tier ${s.tier} wave ${s.wave} ${s.variant} box`;
  const merge = demoIdentityMerges[id];
  return {
    id,
    seriesId: s.seriesId,
    tag,
    tier: s.tier,
    wave: s.wave,
    variant: s.variant,
    productCode: merge?.productCode,
    name: {
      en: `${baseName} ${v.suffix.en}`,
      zh: `${s.tier === 1 ? "一" : s.tier === 2 ? "二" : s.tier === 3 ? "三" : "四"}弹 第${s.wave}波 ${v.suffix.zh}`,
      ja: `Tier ${s.tier} ウェーブ${s.wave} ${v.suffix.ja}`,
    },
    image: img[i % img.length],
    totalCards: v.totals[0],
    cardsPerPack: v.totals[1],
    packsPerBox: v.totals[2],
    ebayUrl: ebaySearch(ebayQ),
    priceUsd: s.price,
    // No verified scrape date — leave undefined so UI shows status-driven copy.
    priceUpdated: undefined,
    priceSource: "estimate",
    priceStatus: "demo_estimate",
    pullRates: standardRates,
    pullRateStatus: "demo_estimate",
    priceHistory: history(s.price),
    marketRegion: "UNKNOWN",
    printLanguage: "Unknown",
    releaseLine: "Tier/Wave",
    sourceStatus: merge ? "Community sourced" : "Unverified",
    recordStatus: "demo",
    checklistStatus: "incomplete",
    productFamily: "chinese-tier",
    productType:
      s.variant === "deluxe" ? "Deluxe Box" : s.variant === "collector" ? "Collector Box" : "Booster Box",
    sourceUrl: merge?.sourceUrl,
    sourceNotes: merge?.sourceNotes,
  };
});

const t1w1RealTotalCards = 127;
const t1w2RealTotalCards = 69;
const t1w3RealTotalCards = 14;
const t1w4RealTotalCards = 10;
const t2w1RealTotalCards = 11;
const t2w2RealTotalCards = 38;
const t2w3RealTotalCards = 76;
const t2w4RealTotalCards = 92;
const t3w1RealTotalCards = 64;
const t3w2RealTotalCards = 44;
const t3w3RealTotalCards = 41;
const t3w4RealTotalCards = 42;
const t4w1RealTotalCards = 82;
const t4w2RealTotalCards = 87;
const t4w3RealTotalCards = 89;
if (
  t1w1RealTotalCards > 0 ||
  t1w2RealTotalCards > 0 ||
  t1w3RealTotalCards > 0 ||
  t1w4RealTotalCards > 0 ||
  t2w1RealTotalCards > 0 ||
  t2w2RealTotalCards > 0 ||
  t2w3RealTotalCards > 0 ||
  t2w4RealTotalCards > 0 ||
  t3w1RealTotalCards > 0 ||
  t3w2RealTotalCards > 0 ||
  t3w3RealTotalCards > 0 ||
  t3w4RealTotalCards > 0 ||
  t4w1RealTotalCards > 0 ||
  t4w2RealTotalCards > 0 ||
  t4w3RealTotalCards > 0
) {
  jpPacks.forEach((pack) => {
    if (pack.id === "t1w1-booster" || pack.id === "t1w1-deluxe") {
      pack.totalCards = t1w1RealTotalCards;
    }
    if (pack.id === "t1w2-booster") {
      pack.totalCards = t1w2RealTotalCards;
    }
    if (pack.id === "t1w3-booster") {
      pack.totalCards = t1w3RealTotalCards;
    }
    if (pack.id === "t1w4-collector") {
      pack.totalCards = t1w4RealTotalCards;
    }
    if (pack.id === "t2w1-booster") {
      pack.totalCards = t2w1RealTotalCards;
    }
    if (pack.id === "t2w2-booster") {
      pack.totalCards = t2w2RealTotalCards;
    }
    if (pack.id === "t2w3-deluxe") {
      pack.totalCards = t2w3RealTotalCards;
    }
    if (pack.id === "t2w4-collector") {
      pack.totalCards = t2w4RealTotalCards;
    }
    if (pack.id === "t3w1-booster") {
      pack.totalCards = t3w1RealTotalCards;
    }
    if (pack.id === "t3w2-booster") {
      pack.totalCards = t3w2RealTotalCards;
    }
    if (pack.id === "t3w3-deluxe") {
      pack.totalCards = t3w3RealTotalCards;
    }
    if (pack.id === "t3w4-collector") {
      pack.totalCards = t3w4RealTotalCards;
    }
    if (pack.id === "t4w1-booster") {
      pack.totalCards = t4w1RealTotalCards;
    }
    if (pack.id === "t4w2-booster") {
      pack.totalCards = t4w2RealTotalCards;
    }
    if (pack.id === "t4w3-deluxe") {
      pack.totalCards = t4w3RealTotalCards;
    }
  });
}

// Real sourced totals for T4W4 / T4W5 (pilot)
const t4w4RealTotalCards = 97;
const t4w5RealTotalCards = 96;
if (t4w4RealTotalCards > 0 || t4w5RealTotalCards > 0) {
  jpPacks.forEach((pack) => {
    if (pack.id === "t4w4-deluxe") {
      pack.totalCards = t4w4RealTotalCards;
    }
    if (pack.id === "t4w5-collector") {
      pack.totalCards = t4w5RealTotalCards;
    }
  });
}

jpPacks.forEach((pack) => {
  if (pack.id === "t1w2-booster") {
    pack.image = t1w2Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t1w3-booster") {
    pack.image = t1w3Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t2w1-booster") {
    pack.image = t2w1Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t2w2-booster") {
    pack.image = t2w2Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t2w3-deluxe") {
    pack.image = t2w3Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t2w4-collector") {
    pack.image = t2w4Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t3w1-booster") {
    pack.image = t3w1Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t3w2-booster") {
    pack.image = t3w2Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t3w3-deluxe") {
    pack.image = t3w3Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t3w4-collector") {
    pack.image = t3w4Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t4w3-deluxe") {
    pack.image = t4w3Image;
    pack.imageStatus = "uploaded_unverified";
  }
});


const enPacks: Pack[] = [
  { vol: 1, price: 145 },
  { vol: 2, price: 132 },
  { vol: 3, price: 128 },
].map((e, i) => ({
  id: `en-vol-${e.vol}`,
  seriesId: "kayou-en",
  tag: `EN${e.vol}`,
  variant: "booster" as const,
  name: {
    en: `English Edition Vol ${e.vol} Booster Box`,
    zh: `英文版 第${e.vol}弹 整盒`,
    ja: `英語版 Vol ${e.vol} BOX`,
  },
  image: e.vol === 1 ? enVol1Image : e.vol === 2 ? enVol2Image : enVol3Image,
  totalCards: 120,
  cardsPerPack: 5,
  packsPerBox: 18,
  ebayUrl: ebaySearch(`english edition vol ${e.vol} booster box`),
  priceUsd: e.price,
  priceUpdated: undefined,
  priceSource: "estimate" as const,
  priceStatus: "demo_estimate" as const,
  pullRates: [
    { rarity: "C" as Rarity, odds: "1 : 1" },
    { rarity: "R" as Rarity, odds: "1 : 3" },
    { rarity: "SR" as Rarity, odds: "1 : 6" },
    { rarity: "SSR" as Rarity, odds: "1 : 22" },
    { rarity: "UR" as Rarity, odds: "1 : 65" },
  ],
  pullRateStatus: "demo_estimate" as const,
  priceHistory: history(e.price),
  marketRegion: "UNKNOWN" as const,
  printLanguage: "English" as const,
  releaseLine: "Tier/Wave" as const,
  sourceStatus: "Unverified" as const,
  recordStatus: "demo" as const,
  checklistStatus: "incomplete" as const,
  productFamily: "english" as const,
  productType: "Booster Box" as const,
  imageStatus: "uploaded_unverified" as const,
}));

// ---------------------------------------------------------------------------
// Community-sourced product catalog additions.
//
// Source: Capsule Corp Gear product guide (community reference only).
// All entries here are recordStatus:"community_sourced", priceStatus:"unavailable",
// checklistStatus:"incomplete". No card lists, prices, images, or pull rates
// are invented — those must be added later with separately sourced provenance.
// ---------------------------------------------------------------------------

const placeholderImg = img[0];

function communityPack(p: {
  id: string;
  seriesId: string;
  tag: string;
  productCode?: string;
  tier?: number;
  wave?: number;
  variant?: Pack["variant"];
  productType: Pack["productType"];
  releaseLine: Pack["releaseLine"];
  marketRegion: Pack["marketRegion"];
  printLanguage: Pack["printLanguage"];
  productFamily: Pack["productFamily"];
  name: Pack["name"];
  ebayQuery: string;
  variantNotes?: string;
}): Pack {
  return {
    id: p.id,
    seriesId: p.seriesId,
    tag: p.tag,
    tier: p.tier,
    wave: p.wave,
    variant: p.variant,
    productCode: p.productCode,
    productType: p.productType,
    productFamily: p.productFamily,
    name: p.name,
    image: placeholderImg,
    totalCards: 0,
    cardsPerPack: 0,
    packsPerBox: 0,
    ebayUrl: ebaySearch(p.ebayQuery),
    priceUsd: 0,
    priceStatus: "unavailable",
    pullRates: [],
    pullRateStatus: "unavailable",
    priceHistory: [],
    marketRegion: p.marketRegion,
    printLanguage: p.printLanguage,
    releaseLine: p.releaseLine,
    sourceStatus: "Community sourced",
    recordStatus: "community_sourced",
    checklistStatus: "incomplete",
    sourceUrl: CAPSULE_CORP_SOURCE_URL,
    sourceNotes:
      "Product structure imported from Capsule Corp Gear (community reference). Cards, prices and pull rates not yet verified.",
    imageStatus: "placeholder",
    variantNotes: p.variantNotes,
  };
}

// ---- Tier waves not yet covered by demo packs ----
// (T1W2–T1W4 are merged into the existing demo packs above via
// demoIdentityMerges rather than added as duplicates.)
const cnTierAdditions: Pack[] = [
  // Tier 2 — fill 5..9 (1..4 exist as demo)
  { id: "t2w5-cc", tier: 2, wave: 5, code: "NR-CC-B005" },
  { id: "t2w6-cc", tier: 2, wave: 6, code: "NR-CC-B006" },
  { id: "t2w7-cc", tier: 2, wave: 7, code: "NR-CC-B007" },
  { id: "t2w8-cc", tier: 2, wave: 8, code: "NR-CC-B008" },
  { id: "t2w9-cc", tier: 2, wave: 9, code: "NR-CC-B009" },
  // Tier 3 — add W5 (1..4 exist as demo)
  { id: "t3w5-cc", tier: 3, wave: 5, code: "NR-CC-D005" },
  // Tier 4 — add W6, W7, W8 (1..5 exist as demo)
  { id: "t4w6-cc", tier: 4, wave: 6, code: "NR-RD-Z006" },
  { id: "t4w7-cc", tier: 4, wave: 7, code: "NR-RD-Z007" },
  { id: "t4w8-cc", tier: 4, wave: 8, code: "NR-RD-Z008" },
].map((p) =>
  communityPack({
    id: p.id,
    seriesId: `tier-${p.tier}`,
    tag: `T${p.tier}W${p.wave}`,
    productCode: p.code,
    tier: p.tier,
    wave: p.wave,
    variant: "booster",
    productType: "Booster Box",
    releaseLine: "Tier/Wave",
    marketRegion: "CN",
    printLanguage: "Chinese",
    productFamily: "chinese-tier",
    name: {
      en: `Tier ${p.tier} Wave ${p.wave} (${p.code})`,
      zh: `${p.tier === 1 ? "一" : p.tier === 2 ? "二" : p.tier === 3 ? "三" : "四"}弹 第${p.wave}波 (${p.code})`,
      ja: `Tier ${p.tier} ウェーブ${p.wave} (${p.code})`,
    },
    ebayQuery: `naruto kayou tier ${p.tier} wave ${p.wave}`,
  }),
);

const migratedCommunityPackTotals: Record<string, number> = {
  "t2w5-cc": 94,
  "t2w6-cc": 78,
  "t2w7-cc": 122,
  "t2w8-cc": 131,
  "t2w9-cc": 132,
  "t3w5-cc": 42,
  "t4w6-cc": 158,
  "t4w7-cc": 168,
  "t4w8-cc": 184,
};

cnTierAdditions.forEach((pack) => {
  const totalCards = migratedCommunityPackTotals[pack.id];
  if (typeof totalCards === "number") {
    pack.totalCards = totalCards;
  }
  if (pack.id === "t2w5-cc") {
    pack.image = t2w5Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t2w6-cc") {
    pack.image = t2w6Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t2w7-cc") {
    pack.image = t2w7Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t2w8-cc") {
    pack.image = t2w8Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t2w9-cc") {
    pack.image = t2w9Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t3w5-cc") {
    pack.image = t3w5Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t4w6-cc") {
    pack.image = t4w6Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t4w7-cc") {
    pack.image = t4w7Image;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "t4w8-cc") {
    pack.image = t4w8Image;
    pack.imageStatus = "uploaded_unverified";
  }
});

// ---- Tier 2.5 / Capital Chapter / Itachi Cloud Box ----
const tier25: Pack[] = [
  communityPack({
    id: "t2-5-itachi-cloud",
    seriesId: "tier-2-5",
    tag: "T2.5",
    productCode: "NR-RD-J001",
    tier: 2.5,
    productType: "Specialty Product",
    releaseLine: "Tier 2.5 / Capital Chapter",
    marketRegion: "CN",
    printLanguage: "Chinese",
    productFamily: "chinese-tier",
    name: {
      en: "Tier 2.5 — Capital Chapter (Itachi Cloud Box)",
      zh: "二点五弹 都城篇 — 鼬云盒",
      ja: "Tier 2.5 都城篇 — イタチ雲BOX",
    },
    ebayQuery: "naruto kayou itachi cloud box capital chapter",
  }),
];

tier25.forEach((pack) => {
  if (pack.id === "t2-5-itachi-cloud") {
    pack.totalCards = 42;
  }
});

// ---- Tier 4 community-sourced variants ----
const tier4Variants: Pack[] = [
  communityPack({
    id: "t4w1-sl",
    seriesId: "tier-4",
    tag: "T4W1·SL",
    tier: 4,
    wave: 1,
    productType: "Specialty Product",
    releaseLine: "Tier/Wave",
    marketRegion: "CN",
    printLanguage: "Chinese",
    productFamily: "chinese-tier",
    name: {
      en: "Tier 4 Wave 1 — SL Variant",
      zh: "四弹 第1波 — SL 变体",
      ja: "Tier 4 W1 — SLバリアント",
    },
    ebayQuery: "naruto kayou tier 4 wave 1 SL",
    variantNotes: "SL variant reported by community source; configuration not independently verified.",
  }),
  communityPack({
    id: "t4w2-sl",
    seriesId: "tier-4",
    tag: "T4W2·SL",
    tier: 4,
    wave: 2,
    productType: "Specialty Product",
    releaseLine: "Tier/Wave",
    marketRegion: "CN",
    printLanguage: "Chinese",
    productFamily: "chinese-tier",
    name: {
      en: "Tier 4 Wave 2 — SL Variant",
      zh: "四弹 第2波 — SL 变体",
      ja: "Tier 4 W2 — SLバリアント",
    },
    ebayQuery: "naruto kayou tier 4 wave 2 SL",
    variantNotes: "SL variant reported by community source.",
  }),
  communityPack({
    id: "t4w2-megabox",
    seriesId: "tier-4",
    tag: "T4W2·MEGA",
    tier: 4,
    wave: 2,
    productType: "Specialty Product",
    releaseLine: "Tier/Wave",
    marketRegion: "CN",
    printLanguage: "Chinese",
    productFamily: "chinese-tier",
    name: {
      en: "Tier 4 Wave 2 — Megabox Variant",
      zh: "四弹 第2波 — Megabox 变体",
      ja: "Tier 4 W2 — Megaboxバリアント",
    },
    ebayQuery: "naruto kayou tier 4 wave 2 megabox",
    variantNotes: "Megabox variant reported by community source.",
  }),
];

tier4Variants.forEach((pack) => {
  if (pack.id === "t4w2-megabox") {
    pack.image = t4w2MegaboxImage;
    pack.imageStatus = "uploaded_unverified";
  }
});

// ---- EX / Rainbow loose packs ----
const exRainbow: Pack[] = [
  { n: 1, char: "Naruto" },
  { n: 2, char: "Kakashi" },
  { n: 3, char: "Neji" },
  { n: 4, char: "Sasuke" },
  { n: 5, char: "Naruto" },
].map((e) =>
  communityPack({
    id: `ex-${e.n}-rainbow`,
    seriesId: "ex-rainbow",
    tag: `EX${e.n}`,
    productType: "Loose Pack",
    releaseLine: "EX / Rainbow",
    marketRegion: "CN",
    printLanguage: "Chinese",
    productFamily: "ex-rainbow",
    name: {
      en: `EX${e.n} — Rainbow ${e.char} Booster Pack`,
      zh: `EX${e.n} 彩虹${e.char}散包`,
      ja: `EX${e.n} レインボー${e.char}パック`,
    },
    ebayQuery: `naruto kayou EX${e.n} rainbow ${e.char} pack`,
    variantNotes: "Distributed as loose pack, not a sealed booster box.",
  }),
);

exRainbow.forEach((pack) => {
  pack.totalCards = 1;
});

// ---- Specialty Products ----
const specialty: Pack[] = [
  { id: "specialty-ninja-age", name: "Naruto Ninja Age Box" },
  { id: "specialty-ninja-age-noble", name: "Naruto Ninja Age Box — N / Noble Version" },
  { id: "specialty-youth-scroll", name: "Youth Scroll" },
  { id: "specialty-heaven-earth-gift", name: "Heaven & Earth Gift Scroll" },
  { id: "specialty-new-years-gift", name: "New Years Gift Box" },
  { id: "specialty-the-last", name: "The Last: Naruto the Movie Gift Box" },
  { id: "specialty-badge-blind", name: "Badge Pin Blind Box Case" },
  { id: "specialty-figure-boxes", name: "Figure Boxes" },
].map((s) =>
  communityPack({
    id: s.id,
    seriesId: "specialty",
    tag: "SPECIAL",
    productType: "Specialty Product",
    releaseLine: "Specialty",
    marketRegion: "CN",
    printLanguage: "Chinese",
    productFamily: "specialty",
    name: { en: s.name, zh: s.name, ja: s.name },
    ebayQuery: `naruto kayou ${s.name}`,
  }),
);

specialty.forEach((pack) => {
  if (pack.id === "specialty-youth-scroll") {
    pack.totalCards = 12;
  }
  if (pack.id === "specialty-new-years-gift") {
    pack.totalCards = 36;
    pack.image = specialtyNewYearsImage;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "specialty-heaven-earth-gift") {
    pack.totalCards = 41;
    pack.image = specialtyHeavenEarthImage;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "specialty-ninja-age") {
    pack.totalCards = 183;
    pack.image = specialtyNinjaAgeImage;
    pack.imageStatus = "uploaded_unverified";
  }
  if (pack.id === "specialty-ninja-age-noble") {
    pack.totalCards = 3;
  }
  if (pack.id === "specialty-badge-blind") {
    pack.totalCards = 16;
  }
  if (pack.id === "specialty-figure-boxes") {
    pack.totalCards = 24;
  }
});

// ---- English product families (community-sourced shells) ----
const englishFamilies: Pack[] = [
  { id: "english-heaven-scroll", series: "heaven-scroll", line: "Heaven Scroll" as const, name: "Heaven Scroll (English)" },
  { id: "english-earth-scroll", series: "earth-scroll", line: "Earth Scroll" as const, name: "Earth Scroll (English)" },
  { id: "english-jin-series", series: "jin-series", line: "Jin Series" as const, name: "Jin Series (English)" },
].map((e) =>
  communityPack({
    id: e.id,
    seriesId: e.series,
    tag: "EN",
    productType: "Booster Box",
    releaseLine: e.line,
    marketRegion: "UNKNOWN",
    printLanguage: "English",
    productFamily: "english",
    name: { en: e.name, zh: e.name, ja: e.name },
    ebayQuery: `naruto kayou ${e.name}`,
    variantNotes:
      "English product family. Region (NA/SEA/etc.) not verified — do not assume equivalence to a Chinese tier release.",
  }),
);

// ---- Real community-sourced T4W4 / T4W5 (replace prototype records) ----
// IDs are preserved (`t4w4-deluxe`, `t4w5-collector`) for route stability,
// even though both products are now correctly classified as Booster Display
// Boxes. The slug suffix is historical only.
const realT4Products: Pack[] = [
  {
    id: "t4w4-deluxe",
    seriesId: "tier-4",
    tag: "T4W4",
    tier: 4,
    wave: 4,
    productCode: "NR-RD-Z004",
    productType: "Booster Box",
    productFamily: "chinese-tier",
    name: {
      en: "Naruto Kayou Tier 4 Wave 4 Booster Display Box",
      zh: "火影忍者 卡游 四弹 第4波 补充包整盒",
      ja: "ナルト カヨウ Tier 4 ウェーブ4 ブースターディスプレイBOX",
    },
    image: t4w4Image,
    totalCards: 97,
    cardsPerPack: 5,
    packsPerBox: 18,
    ebayUrl: ebaySearch("naruto kayou tier 4 wave 4 NR-RD-Z004 display box"),
    priceUsd: 0,
    priceStatus: "unavailable",
    pullRates: [],
    pullRateStatus: "unavailable",
    priceHistory: [],
    marketRegion: "CN",
    printLanguage: "Chinese",
    releaseLine: "Tier/Wave",
    sourceStatus: "Community sourced",
    recordStatus: "community_sourced",
    checklistStatus: "incomplete",
    imageStatus: "uploaded_unverified",
    sourceUrl: CAPSULE_CORP_SOURCE_URL,
    sourceNotes:
      "Product identity and display configuration cross-referenced from collector/product listings; Chinese Tier product, not an English/NA release. Checklist and market price still awaiting verification.",
  },
  {
    id: "t4w5-collector",
    seriesId: "tier-4",
    tag: "T4W5",
    tier: 4,
    wave: 5,
    productCode: "NR-RD-Z005",
    productType: "Booster Box",
    productFamily: "chinese-tier",
    name: {
      en: "Naruto Kayou Tier 4 Wave 5 Booster Display Box",
      zh: "火影忍者 卡游 四弹 第5波 补充包整盒",
      ja: "ナルト カヨウ Tier 4 ウェーブ5 ブースターディスプレイBOX",
    },
    image: t4w5Image,
    totalCards: 96,
    cardsPerPack: 5,
    packsPerBox: 18,
    ebayUrl: ebaySearch("naruto kayou tier 4 wave 5 NR-RD-Z005 display box"),
    priceUsd: 0,
    priceStatus: "unavailable",
    pullRates: [],
    pullRateStatus: "unavailable",
    priceHistory: [],
    marketRegion: "CN",
    printLanguage: "Chinese",
    releaseLine: "Tier/Wave",
    sourceStatus: "Community sourced",
    recordStatus: "community_sourced",
    checklistStatus: "incomplete",
    imageStatus: "verified",
    sourceUrl: CAPSULE_CORP_SOURCE_URL,
    sourceNotes:
      "Product identity and display configuration cross-referenced from collector/product listings; Chinese Tier product, not an English/NA release. Checklist and market price still awaiting verification.",
  },
];

export const packs: Pack[] = [
  ...jpPacks,
  ...realT4Products,
  ...enPacks,
  ...cnTierAdditions,
  ...tier25,
  ...tier4Variants,
  ...exRainbow,
  ...specialty,
  ...englishFamilies,
];
