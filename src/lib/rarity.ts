import type { Rarity } from "@/data/types";
import { RARITY_ORDER } from "@/data/types";

export type RarityTier = 1 | 2 | 3 | 4 | 5;

export const RARITY_TIER: Record<string, RarityTier> = {
  R: 1, SR: 1,
  SSR: 2, UR: 2, OR: 2,
  AR: 3, SP: 3, ASP: 3, MR: 3,
  GP: 4, CR: 4, ZR: 4, CP: 4, NR: 4, TR: 4, TGR: 4, HR: 4, BP: 4,
  SLR: 4, "SLR+": 4, "SLR-": 4, BR: 4,
  SE: 5, SCR: 5, LR: 5, XR: 5, XP: 5, QR: 5, PR: 5, PTR: 5, PU: 5, "20th": 5,
  "SS-SSR": 2, "SS-UR": 2, "SS-OR": 2,
  "SS-AR": 3, "SS-SP": 3,
  "SS-HR": 4,
  "SS-SE": 5, "SS-SV-G": 5, "SS-SV-S": 5,
  "CC-R": 1, "CC-SR": 1,
  "CC-SSR": 2, "CC-UR": 2,
  "CC-MR": 3, "CC-SP": 3,
  "CC-PTR": 5, "CC-QR": 5, "CC-XR": 5,
};

export function resolveTier(rarity: string): RarityTier {
  if (!rarity) return 1;
  return (
    RARITY_TIER[rarity] ??
    RARITY_TIER[rarity.toUpperCase()] ??
    RARITY_TIER[rarity.toLowerCase()] ??
    1
  );
}

export function rarityCssClass(rarity: string): string {
  return `rarity-${(rarity || "unknown").replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

/**
 * Premium collector rarity system — PSA / Collectr inspired.
 * Visual styling is for browse/checklist display only and does NOT
 * imply a guaranteed value ranking. See RARITY_DISPLAY_ORDER for the
 * full ordering note.
 */

const NEUTRAL_BADGE = "bg-zinc-500/10 text-zinc-300 border-zinc-500/30";
const NEUTRAL_FRAME = "ring-1 ring-zinc-500/20";

const explicitClass: Partial<Record<Rarity, string>> = {
  "20th": "bg-yellow-500/18 text-yellow-100 border-yellow-300/60 shadow-[0_0_0_1px_rgba(255,220,100,0.3)]",
  "SS-SE": "bg-yellow-500/14 text-yellow-100 border-yellow-300/45",
  "SS-SV-G": "bg-amber-500/14 text-amber-100 border-amber-300/45",
  "SS-SV-S": "bg-slate-400/14 text-slate-100 border-slate-300/45",
  "SS-SP": "bg-emerald-500/12 text-emerald-200 border-emerald-400/40",
  "SS-AR": "bg-cyan-500/12 text-cyan-200 border-cyan-400/40",
  "SS-UR": "bg-rose-500/14 text-rose-200 border-rose-400/45",
  "SS-HR": "bg-pink-500/12 text-pink-200 border-pink-400/40",
  "SS-OR": "bg-amber-500/12 text-amber-200 border-amber-400/40",
  "SS-SSR": "bg-amber-500/14 text-amber-200 border-amber-400/45",
  "CC-MR": "bg-fuchsia-500/12 text-fuchsia-200 border-fuchsia-400/40",
  "CC-PTR": "bg-orange-500/12 text-orange-200 border-orange-400/40",
  "CC-QR": "bg-indigo-500/12 text-indigo-200 border-indigo-400/40",
  "CC-R": "bg-sky-500/10 text-sky-200 border-sky-400/35",
  "CC-SP": "bg-emerald-500/12 text-emerald-200 border-emerald-400/40",
  "CC-SR": "bg-violet-500/12 text-violet-200 border-violet-400/40",
  "CC-SSR": "bg-amber-500/12 text-amber-200 border-amber-400/40",
  "CC-UR": "bg-rose-500/12 text-rose-200 border-rose-400/40",
  "CC-XR": "bg-sky-500/12 text-sky-200 border-sky-400/40",
  BR: "bg-teal-500/12 text-teal-200 border-teal-400/40",
  XP: "bg-purple-500/12 text-purple-200 border-purple-400/40",
  ZR:  "bg-slate-500/12 text-slate-200 border-slate-500/40",
  SCR: "bg-fuchsia-600/15 text-fuchsia-200 border-fuchsia-500/40",
  "SLR+": "bg-emerald-500/14 text-emerald-100 border-emerald-300/50",
  SLR: "bg-emerald-500/12 text-emerald-200 border-emerald-400/40",
  "SLR-": "bg-emerald-500/10 text-emerald-200 border-emerald-500/35",
  LR:  "bg-cyan-500/12 text-cyan-200 border-cyan-400/40",
  XR:  "bg-sky-500/12 text-sky-200 border-sky-400/40",
  QR:  "bg-indigo-500/12 text-indigo-200 border-indigo-400/40",
  TGR: "bg-amber-500/12 text-amber-200 border-amber-400/40",
  TR:  "bg-orange-500/12 text-orange-200 border-orange-400/40",
  HR:  "bg-pink-500/12 text-pink-200 border-pink-400/40",
  CR:  "bg-[linear-gradient(120deg,oklch(0.78_0.18_45_/_0.20),oklch(0.72_0.20_310_/_0.20))] text-amber-200 border-amber-300/60 shadow-[0_0_0_1px_rgba(255,180,0,0.18)]",
  OR:  "bg-amber-500/12 text-amber-200 border-amber-500/40",
  AR:  "bg-cyan-500/15  text-cyan-300   border-cyan-500/50",
  BP:  "bg-neutral-700/40 text-neutral-100 border-neutral-400/40",
  MR:  "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/55",
  ASP: "bg-emerald-500/15 text-emerald-200 border-emerald-400/55",
  SP:  "bg-emerald-500/15 text-emerald-300 border-emerald-500/50",
  UR:  "bg-rose-500/18 text-rose-200 border-rose-500/60 shadow-[0_0_0_1px_rgba(255,130,155,0.3)]",
  SSR: "bg-amber-500/18 text-amber-200 border-amber-500/60 shadow-[0_0_0_1px_rgba(255,200,90,0.3)]",
  SR:  "bg-violet-500/16 text-violet-200 border-violet-500/55 shadow-[0_0_0_1px_rgba(192,132,252,0.28)]",
  PTR: "bg-orange-500/15 text-orange-200 border-orange-500/50",
  PR:  "bg-amber-500/15 text-amber-200 border-amber-500/50",
  GP:  "bg-emerald-500/12 text-emerald-200 border-emerald-500/40",
  SE:  "bg-sky-500/12 text-sky-200 border-sky-500/40",
  CP:  "bg-fuchsia-500/12 text-fuchsia-200 border-fuchsia-500/40",
  PU:  "bg-violet-500/12 text-violet-200 border-violet-500/40",
  R:   "bg-sky-500/10   text-sky-300    border-sky-500/40",
  NR:  "bg-orange-500/10 text-orange-200 border-orange-500/35",
  C:   "bg-zinc-500/10  text-zinc-300   border-zinc-500/30",
  UNKNOWN: "bg-zinc-500/10 text-zinc-300 border-zinc-500/30",
};

const explicitFrame: Partial<Record<Rarity, string>> = {
  "20th": "ring-1 ring-yellow-300/60 shadow-[0_0_28px_-6px_oklch(0.88_0.18_90_/_0.55),0_4px_24px_-12px_oklch(0.82_0.18_80_/_0.5)]",
  "SS-SE": "ring-1 ring-yellow-300/45",
  "SS-SV-G": "ring-1 ring-amber-300/45",
  "SS-SV-S": "ring-1 ring-slate-300/40",
  "SS-SP": "ring-1 ring-emerald-400/40",
  "SS-AR": "ring-1 ring-cyan-400/40",
  "SS-UR": "ring-1 ring-rose-400/45",
  "SS-HR": "ring-1 ring-pink-400/40",
  "SS-OR": "ring-1 ring-amber-400/40",
  "SS-SSR": "ring-1 ring-amber-400/45",
  "CC-MR": "ring-1 ring-fuchsia-400/40",
  "CC-PTR": "ring-1 ring-orange-400/40",
  "CC-QR": "ring-1 ring-indigo-400/40",
  "CC-R": "ring-1 ring-sky-400/30",
  "CC-SP": "ring-1 ring-emerald-400/40",
  "CC-SR": "ring-1 ring-violet-400/40",
  "CC-SSR": "ring-1 ring-amber-400/40",
  "CC-UR": "ring-1 ring-rose-400/40",
  "CC-XR": "ring-1 ring-sky-400/40",
  BR: "ring-1 ring-teal-400/40",
  XP: "ring-1 ring-purple-400/40",
  ZR:  "ring-1 ring-slate-500/25 shadow-[0_0_0_1px_oklch(0.8_0.02_240_/_0.25)]",
  SCR: "ring-1 ring-fuchsia-500/55 shadow-[0_0_24px_-6px_oklch(0.7_0.22_320_/_0.55),0_4px_22px_-12px_oklch(0.7_0.22_320_/_0.45)]",
  "SLR+": "ring-1 ring-emerald-300/55 shadow-[0_0_26px_-6px_oklch(0.74_0.2_160_/_0.5),0_4px_22px_-12px_oklch(0.7_0.2_160_/_0.45)]",
  SLR: "ring-1 ring-emerald-500/45 shadow-[0_0_24px_-6px_oklch(0.7_0.2_160_/_0.45),0_4px_22px_-12px_oklch(0.7_0.2_160_/_0.45)]",
  "SLR-": "ring-1 ring-emerald-500/35 shadow-[0_0_22px_-8px_oklch(0.68_0.18_160_/_0.4),0_4px_20px_-12px_oklch(0.68_0.18_160_/_0.4)]",
  LR:  "ring-1 ring-cyan-500/45 shadow-[0_0_24px_-6px_oklch(0.64_0.2_200_/_0.45),0_4px_22px_-12px_oklch(0.64_0.2_200_/_0.45)]",
  XR:  "ring-1 ring-sky-500/45 shadow-[0_0_24px_-6px_oklch(0.64_0.18_220_/_0.45),0_4px_22px_-12px_oklch(0.64_0.18_220_/_0.45)]",
  QR:  "ring-1 ring-indigo-500/45 shadow-[0_0_24px_-6px_oklch(0.64_0.18_250_/_0.45),0_4px_22px_-12px_oklch(0.64_0.18_250_/_0.45)]",
  TGR: "ring-1 ring-amber-500/45 shadow-[0_0_24px_-6px_oklch(0.72_0.22_90_/_0.45),0_4px_22px_-12px_oklch(0.72_0.22_90_/_0.45)]",
  TR:  "ring-1 ring-orange-500/45 shadow-[0_0_24px_-6px_oklch(0.74_0.2_95_/_0.45),0_4px_22px_-12px_oklch(0.74_0.2_95_/_0.45)]",
  HR:  "ring-1 ring-pink-500/45 shadow-[0_0_24px_-6px_oklch(0.78_0.18_330_/_0.45),0_4px_22px_-12px_oklch(0.78_0.18_330_/_0.45)]",
  CR:  "rarity-frame-cr",
  OR:  "ring-1 ring-amber-500/45",
  AR:  "ring-1 ring-cyan-500/55 shadow-[0_0_24px_-6px_oklch(0.78_0.16_215_/_0.5),0_4px_22px_-12px_oklch(0.78_0.14_215_/_0.5)]",
  BP:  "ring-1 ring-neutral-200/40 shadow-[0_0_22px_-6px_oklch(0.92_0.02_250_/_0.35),0_4px_22px_-12px_oklch(0.85_0.02_250_/_0.4)]",
  MR:  "ring-1 ring-fuchsia-500/60 shadow-[0_0_26px_-6px_oklch(0.7_0.22_320_/_0.55),0_4px_22px_-12px_oklch(0.7_0.22_320_/_0.55)]",
  ASP: "ring-1 ring-emerald-400/60 shadow-[0_0_24px_-6px_oklch(0.78_0.2_160_/_0.45),0_4px_22px_-12px_oklch(0.78_0.2_160_/_0.5)]",
  SP:  "ring-1 ring-emerald-500/55 shadow-[0_0_24px_-6px_oklch(0.78_0.2_160_/_0.45),0_4px_22px_-12px_oklch(0.78_0.2_160_/_0.5)]",
  UR:  "ring-1 ring-rose-500/65 shadow-[0_0_32px_-12px_rgba(248,113,113,0.32),0_4px_26px_-14px_oklch(0.72_0.24_27_/_0.55)]",
  SSR: "ring-1 ring-amber-500/55 shadow-[0_0_32px_-12px_rgba(251,191,36,0.32),0_4px_26px_-14px_oklch(0.82_0.18_75_/_0.55)]",
  SR:  "ring-1 ring-violet-500/45 shadow-[0_0_24px_-8px_rgba(139,92,246,0.28)]",
  PTR: "ring-1 ring-orange-500/45",
  PR:  "ring-1 ring-amber-500/45",
  GP:  "ring-1 ring-emerald-500/45",
  SE:  "ring-1 ring-sky-500/45",
  CP:  "ring-1 ring-fuchsia-500/45",
  PU:  "ring-1 ring-violet-500/45",
  R:   "ring-1 ring-sky-500/30",
  NR:  "ring-1 ring-orange-500/35 shadow-[0_4px_22px_-12px_oklch(0.72_0.18_45_/_0.45)]",
  C:   "ring-1 ring-zinc-500/20",
  UNKNOWN: "ring-1 ring-zinc-500/20",
};

export const rarityClass: Record<Rarity, string> = new Proxy(explicitClass as Record<Rarity, string>, {
  get: (target, prop: string) => target[prop as Rarity] ?? NEUTRAL_BADGE,
});

export const rarityFrame: Record<Rarity, string> = new Proxy(explicitFrame as Record<Rarity, string>, {
  get: (target, prop: string) => target[prop as Rarity] ?? NEUTRAL_FRAME,
});

export function rarityLabel(r: Rarity) {
  return r;
}

/** Display-order sort. Not a value ranking. */
export function sortByRarityDesc<T extends { rarity: Rarity; number: string }>(arr: T[]): T[] {
  return [...arr].sort((a, b) => {
    const d = (RARITY_ORDER[b.rarity] ?? 0) - (RARITY_ORDER[a.rarity] ?? 0);
    return d !== 0 ? d : a.number.localeCompare(b.number);
  });
}
