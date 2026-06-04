import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CreditCard, Package } from "lucide-react";
import heroImg from "@/assets/packs/hero-naruto.jpg";
import { cards, packs, series, packsByCard } from "@/data";
import type { Card, Pack } from "@/data";
import { rarityClass, rarityFrame, rarityCssClass, resolveTier, sortByRarityDesc } from "@/lib/rarity";

import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "ShinobIndex | Naruto Kayou Card Database, Packs & Checklists" },
      { name: "description", content: "Explore Naruto Kayou card packs, series, checklists, chase cards and collector market references in ShinobIndex, an independent collector-built database." },
    ],
  }),
});

// Featured product ids for the Popular Boxes section, in preferred order.
// Only verified product images are shown here to keep placeholder shells off the homepage.
const FEATURED_BOX_IDS = [
  "t4w4-deluxe",
  "t4w5-collector",
  "en-vol-1",
  "en-vol-3",
  "t1w1-booster",
  "t1w1-deluxe",
  "t1w2-booster",
  "t2w3-deluxe",
];

const HOMEPAGE_ALLOWED_PLACEHOLDER_BOX_IDS = new Set(["t4w4-deluxe", "en-vol-1", "en-vol-3"]);

const HOMEPAGE_CHASE_SOURCE_PREFIXES = [
  "t4w8__",
  "t4w7__",
  "t4w6__",
  "t4w5__",
  "t4w4__",
  "t2.5__",
  "ex5__",
  "ex4__",
  "ex3__",
  "ex2__",
  "ex1__",
];

function pickFeaturedBoxes(): Pack[] {
  return FEATURED_BOX_IDS.map((id) => packs.find((p) => p.id === id))
    .filter((p): p is Pack => !!p && (p.imageStatus === "verified" || HOMEPAGE_ALLOWED_PLACEHOLDER_BOX_IDS.has(p.id)))
    .slice(0, 4);
}

function regionBadge(p: Pack): string {
  if (p.productFamily === "specialty") return "Specialty";
  if (p.printLanguage === "English") return "English";
  if (p.marketRegion === "CN") return "CN";
  return p.marketRegion ?? "—";
}

function homepageChasePriority(card: Card): number {
  const index = HOMEPAGE_CHASE_SOURCE_PREFIXES.findIndex((prefix) => card.id.startsWith(prefix));
  return index === -1 ? HOMEPAGE_CHASE_SOURCE_PREFIXES.length : index;
}

function HomePage() {
  const { t, loc } = useI18n();

  const featuredBoxes = pickFeaturedBoxes();

  // Top Hits — cards over $200, sorted high → low. Falls back to highest available.
  const homepageCards = sortByRarityDesc(
    cards.filter((c) => c.recordStatus === "community_sourced" && c.imageStatus === "verified"),
  )
    .sort((a, b) => homepageChasePriority(a) - homepageChasePriority(b))
    .slice(0, 10);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.6_0.24_28/0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/40" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-14 sm:py-18 lg:py-20">
          <div className="flex min-h-[380px] flex-col justify-center">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                Independent collector database
              </span>
              <h1 className="mt-5 text-4xl font-display font-bold tracking-tight leading-[1.08] sm:text-5xl lg:text-6xl">
                ShinobIndex
              </h1>
              <h2 className="mt-3 text-base sm:text-lg text-foreground/75 font-medium tracking-tight">
                Naruto Kayou Card Database
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm sm:text-base text-foreground/80 leading-relaxed">
                Search cards, explore sealed products, and browse collector checklists in one place.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-3">
                <Link to="/series" className="btn-primary min-h-[52px] px-6 text-[15px] font-medium flex items-center gap-2.5">
                  Explore Series <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/search/packs" className="btn-ghost min-h-[52px] px-6 text-[15px] font-medium flex items-center gap-2.5">
                  <Package className="h-5 w-5 text-primary" /> Search Packs
                </Link>
                <Link to="/search/cards" className="btn-ghost min-h-[52px] px-6 text-[15px] font-medium flex items-center gap-2.5">
                  <CreditCard className="h-5 w-5 text-primary" /> Search Cards
                </Link>
              </div>
              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4">
                <HeroStat value={series.length} label="Series & families" />
                <HeroStat value={packs.length} label="Products indexed" />
                <HeroStat value={cards.length} label="Cards loaded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR BOXES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Featured</p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold">Popular Boxes</h2>
          </div>
          <Link to="/search/packs" className="text-sm text-primary hover:underline">Browse all →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredBoxes.map((p) => (
            <PopularBoxCard key={p.id} pack={p} loc={loc} />
          ))}
        </div>
      </section>

      {/* SOURCED CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Featured
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold">
              Chase Cards
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Featured sourced cards from migrated packs
            </p>
          </div>
          <Link to="/search/cards" className="text-sm text-primary hover:underline">All cards →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {homepageCards.map((c) => {
            const fromPack = packsByCard(c.id, { publicOnly: true })[0]?.pack;
            return (
              <div key={c.id} className="flex flex-col">
                <SourcedCardTile card={c} showPrice={false} />
                {fromPack && (
                  <Link
                    to="/packs/$packId"
                    params={{ packId: fromPack.id }}
                    className="mt-1 text-[11px] text-muted-foreground hover:text-primary truncate"
                  >
                    from {loc(fromPack.name)}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function SourcedCardTile({ card, showPrice }: { card: Card; showPrice: boolean }) {
  const { loc } = useI18n();
  const tier = resolveTier(card.rarity);
  const rarityCss = rarityCssClass(card.rarity);

  return (
    <Link
      to="/cards/$cardId"
      params={{ cardId: card.id }}
      className="group block focus:outline-none"
    >
      <div className={`kayou-card kayou-preview kayou-tier-${tier} ${rarityCss}`}>
        <div className={`kayou-frame relative rounded-2xl p-[3px] ${rarityFrame[card.rarity]}`}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted transition-transform duration-300 ease-out group-hover:-translate-y-1">
            <img
              src={card.image}
              alt={loc(card.name)}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="kayou-foil absolute inset-0" />
            <div className="kayou-holo absolute inset-0" />
            <div className="kayou-holo-2 absolute inset-0" />
            <div className="kayou-shine absolute inset-0" />
            <div className="kayou-edge-light absolute inset-0 rounded-xl" />
            <div className="holo-overlay" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <span
              className={`absolute top-2 right-2 inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold tracking-[0.08em] backdrop-blur-sm ${rarityClass[card.rarity]}`}
            >
              {card.rarity}
            </span>
            <span className="absolute bottom-2 left-2 font-mono text-[10px] text-white/85">
              {card.number}
            </span>
            {showPrice && typeof card.priceUsd === "number" && card.priceUsd > 0 && (
              <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                ${card.priceUsd.toFixed(0)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <p className="text-[13px] font-medium leading-tight line-clamp-2 group-hover:text-primary">
          {loc(card.name)}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{card.character}</p>
      </div>
    </Link>
  );
}

function PopularBoxCard({
  pack,
  loc,
}: {
  pack: Pack;
  loc: (l: { en: string; zh: string; ja: string }) => string;
}) {
  const badge = regionBadge(pack);
  return (
    <Link
      to="/packs/$packId"
      params={{ packId: pack.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-[0_8px_30px_-12px_oklch(0.6_0.24_28/0.4)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-background/40">
        <img
          src={pack.image}
          alt={loc(pack.name)}
          loading="lazy"
          className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${pack.imageStatus === "verified" ? "object-contain p-4" : "object-cover"}`}
        />
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full border border-border/80 bg-background/70 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-foreground backdrop-blur-sm">
          {badge}
        </span>
      </div>
      <div className="p-4">
        <p className="font-display text-sm font-bold leading-tight line-clamp-2 group-hover:text-primary">
          {loc(pack.name)}
        </p>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          {pack.productType ?? "Sealed product"}
          {pack.productCode ? ` · ${pack.productCode}` : ""}
        </p>
      </div>
    </Link>
  );
}

function HeroStat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm px-4 py-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      <p className="font-display text-xl font-bold text-foreground leading-none">{value}</p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-medium">{label}</p>
    </div>
  );
}
