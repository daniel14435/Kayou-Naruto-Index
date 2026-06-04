import type { Series } from "./types";
import { CAPSULE_CORP_SOURCE_URL } from "@/lib/catalog-status";

const cover = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80`;

const tierWaveDefaults = {
  marketRegion: "UNKNOWN" as const,
  printLanguage: "Unknown" as const,
  releaseLine: "Tier/Wave" as const,
  productFamily: "chinese-tier" as const,
  sourceStatus: "Unverified" as const,
  recordStatus: "demo" as const,
};

const englishDefaults = {
  marketRegion: "UNKNOWN" as const,
  printLanguage: "English" as const,
  releaseLine: "Tier/Wave" as const,
  productFamily: "english" as const,
  sourceStatus: "Unverified" as const,
  recordStatus: "demo" as const,
};

const communityDefaults = {
  sourceStatus: "Community sourced" as const,
  recordStatus: "community_sourced" as const,
  sourceUrl: CAPSULE_CORP_SOURCE_URL,
};

export const series: Series[] = [
  // ===== Chinese Tier Products =====
  {
    id: "tier-1",
    name: { en: "Tier 1", zh: "卡游 一弹", ja: "Tier 1 一弾" },
    releaseDate: "2022-12",
    market: "japanese",
    description: {
      en: "The original Naruto Kayou release. Holy-grail UR cards and the chase that started everything.",
      zh: "卡游火影忍者原始一弹。圣杯级 UR 卡，引爆整个收藏热潮。",
      ja: "ナルト カヨウの原点シリーズ。聖杯級URとブームの始まり。",
    },
    cover: cover("1612036782180-6f0b6cd846fe"),
    ...tierWaveDefaults,
  },
  {
    id: "tier-2",
    name: { en: "Tier 2", zh: "卡游 二弹", ja: "Tier 2 二弾" },
    releaseDate: "2023-06",
    market: "japanese",
    description: {
      en: "Expanded Tier 2 cycle covering waves 1-9. Multiple booster and deluxe products per wave.",
      zh: "二弹完整周期 1-9 波。多种补充与豪华盒型。",
      ja: "Tier 2 完全サイクル（W1-W9）。複数のブースター／デラックス。",
    },
    cover: cover("1578662996442-48f60103fc96"),
    ...tierWaveDefaults,
  },
  {
    id: "tier-2-5",
    name: {
      en: "Tier 2.5 — Capital Chapter",
      zh: "卡游 二点五弹 都城篇",
      ja: "Tier 2.5 都城篇",
    },
    releaseDate: "2023-09",
    market: "japanese",
    description: {
      en: "Tier 2.5 / Capital Chapter — the Itachi Cloud Box and related releases between Tier 2 and Tier 3.",
      zh: "二点五弹 / 都城篇 — 鼬云盒及相关产品。",
      ja: "Tier 2.5 都城篇 — イタチ雲BOXなど。",
    },
    cover: cover("1605647540924-852290f6b0d5"),
    marketRegion: "CN",
    printLanguage: "Chinese",
    releaseLine: "Tier 2.5 / Capital Chapter",
    productFamily: "chinese-tier",
    ...communityDefaults,
  },
  {
    id: "tier-3",
    name: { en: "Tier 3 — Shippuden", zh: "卡游 三弹 疾风传", ja: "Tier 3 三弾 疾風伝" },
    releaseDate: "2023-12",
    market: "japanese",
    description: {
      en: "Shippuden-era arc. Akatsuki focus, dual-rarity foils and the first textured backgrounds.",
      zh: "疾风传弧线：晓组织主题、双稀有度烫金、首次出现纹理背景。",
      ja: "疾風伝編。暁中心、デュアルレアリティ箔押し、初の質感背景。",
    },
    cover: cover("1605647540924-852290f6b0d5"),
    ...tierWaveDefaults,
  },
  {
    id: "tier-4",
    name: { en: "Tier 4", zh: "卡游 四弹", ja: "Tier 4 四弾" },
    releaseDate: "2024-08",
    market: "japanese",
    description: {
      en: "Current Tier 4 cycle, waves 1-8 with SL and Megabox variants reported by community sources.",
      zh: "当前四弹周期 1-8 波，含 SL 与 Megabox 变体。",
      ja: "Tier 4 サイクル W1-W8、SLとMegabox変種を含む。",
    },
    cover: cover("1531259683007-016a7b628fc3"),
    ...tierWaveDefaults,
  },

  // ===== EX / Rainbow Packs =====
  {
    id: "ex-rainbow",
    name: { en: "EX / Rainbow Packs", zh: "EX 彩虹包", ja: "EX レインボーパック" },
    releaseDate: "2023",
    market: "japanese",
    description: {
      en: "Loose Rainbow booster packs (EX1-EX5), distributed individually rather than as sealed boxes.",
      zh: "EX 彩虹散包 (EX1-EX5)，单包形式发行而非整盒。",
      ja: "EX レインボーパック（EX1-EX5）、ルース単包配布。",
    },
    cover: cover("1542751371-adc38448a05e"),
    marketRegion: "CN",
    printLanguage: "Chinese",
    releaseLine: "EX / Rainbow",
    productFamily: "ex-rainbow",
    ...communityDefaults,
  },

  // ===== Specialty Products =====
  {
    id: "specialty",
    name: { en: "Specialty Products", zh: "特别企划", ja: "スペシャル商品" },
    releaseDate: "2022-2024",
    market: "japanese",
    description: {
      en: "Specialty boxes, scrolls, gift sets, blind boxes and figures outside the main tier/wave structure.",
      zh: "特别企划：礼盒、卷轴、徽章盲盒、手办盒等非主线产品。",
      ja: "特別企画：ギフトBOX、スクロール、ピンブラインドBOX、フィギュアBOXなど。",
    },
    cover: cover("1604335079441-0254acdc9544"),
    marketRegion: "CN",
    printLanguage: "Chinese",
    releaseLine: "Specialty",
    productFamily: "specialty",
    ...communityDefaults,
  },

  // ===== English Products =====
  {
    id: "kayou-en",
    name: { en: "English Edition", zh: "卡游 英文版", ja: "カヨウ 英語版" },
    releaseDate: "2024-09",
    market: "english",
    description: {
      en: "First officially licensed English-language Naruto Kayou release.",
      zh: "首个官方授权英文版火影忍者卡游。",
      ja: "初の公式英語版ナルトカヨウ。",
    },
    cover: cover("1604335079441-0254acdc9544"),
    ...englishDefaults,
  },
  {
    id: "heaven-scroll",
    name: { en: "Heaven Scroll", zh: "天之卷", ja: "天之巻" },
    releaseDate: "2024",
    market: "english",
    description: {
      en: "English-language Heaven Scroll product family. Regional distribution not yet verified per product.",
      zh: "英文版天之卷系列。各产品区域分销尚待核实。",
      ja: "英語版「天之巻」シリーズ。各製品の地域は未確認。",
    },
    cover: cover("1542204165-65bf26472b9b"),
    marketRegion: "UNKNOWN",
    printLanguage: "English",
    releaseLine: "Heaven Scroll",
    productFamily: "english",
    ...communityDefaults,
  },
  {
    id: "earth-scroll",
    name: { en: "Earth Scroll", zh: "地之卷", ja: "地之巻" },
    releaseDate: "2024",
    market: "english",
    description: {
      en: "English-language Earth Scroll product family. Regional distribution not yet verified per product.",
      zh: "英文版地之卷系列。各产品区域分销尚待核实。",
      ja: "英語版「地之巻」シリーズ。各製品の地域は未確認。",
    },
    cover: cover("1512484776495-a09d92e87c3b"),
    marketRegion: "UNKNOWN",
    printLanguage: "English",
    releaseLine: "Earth Scroll",
    productFamily: "english",
    ...communityDefaults,
  },
  {
    id: "jin-series",
    name: { en: "Jin Series", zh: "陣系列", ja: "陣シリーズ" },
    releaseDate: "2024",
    market: "english",
    description: {
      en: "English-language Jin Series. Possible equivalence to Chinese tier releases is not silently assumed.",
      zh: "英文版陣系列。与中文 Tier 产品的对应关系不被默认。",
      ja: "英語版「陣シリーズ」。中国版Tier製品との対応は未確認。",
    },
    cover: cover("1542751371-adc38448a05e"),
    marketRegion: "UNKNOWN",
    printLanguage: "English",
    releaseLine: "Jin Series",
    productFamily: "english",
    ...communityDefaults,
  },
];
