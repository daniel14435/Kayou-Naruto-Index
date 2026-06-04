import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cardsByPack, getPack, getSeries } from "@/data";
import { CardTile, MissingCardSlot } from "@/components/site/card-tile";
import { useI18n } from "@/lib/i18n";
import { rarityClass, sortByRarityDesc } from "@/lib/rarity";
import { RARITIES } from "@/data/types";
import type { Rarity } from "@/data/types";
import {
  PRICE_METRIC_LABEL,
  CAPSULE_CORP_REFERENCE_LABEL,
  boxPotentialNote,
  isPriceAvailable,
  priceStatusLabel,
} from "@/lib/catalog-status";
import { ProductVersionBlock } from "@/components/site/product-version-block";

export const Route = createFileRoute("/packs/$packId")({
  loader: ({ params }) => {
    if (!getPack(params.packId)) throw notFound();
    return { packId: params.packId };
  },
  component: PackDetail,
  head: ({ params }) => {
    const p = getPack(params.packId);
    const isSpecialtyProduct = p?.productType === "Specialty Product";
    if (isSpecialtyProduct) {
      return {
        meta: [
          { title: `${p?.name.en ?? "Special Edition"} — product checklist & special product hits | ShinobIndex` },
          { name: "description", content: `${p?.name.en} — special edition collector product with known cards and sealed price references as data is verified.` },
          { property: "og:image", content: p?.image ?? "" },
        ],
      };
    }
    return {
      meta: [
        { title: `${p?.name.en ?? "Pack"} — checklist, chase cards & pull rates | ShinobIndex` },
        { name: "description", content: `${p?.name.en} — ${p?.totalCards} cards, estimated sealed price $${p?.priceUsd.toFixed(2)}, pull rates and full card checklist.` },
        { property: "og:image", content: p?.image ?? "" },
      ],
    };
  },
});

const CHASE_RARITIES: Rarity[] = [
  "20th",
  "SS-SE",
  "SE",
  "SS-SV-G",
  "SS-SV-S",
  "PU",
  "PUR",
  "PTR",
  "CC-PTR",
  "XR",
  "CC-XR",
  "XP",
  "QR",
  "CC-QR",
  "LR",
  "SCR",
  "PR",
  "SLR+",
  "SLR",
  "SLR-",
  "BP",
  "TGR",
  "TR",
  "SS-HR",
  "HR",
  "CR",
  "ZR",
  "GP",
  "CP",
  "NR",
  "MR",
  "CC-MR",
  "BR",
  "ASP",
  "SS-SP",
  "CC-SP",
  "SP",
  "SS-AR",
  "AR",
  "SS-OR",
  "OR",
  "SS-UR",
  "CC-UR",
  "UR",
];

type ChecklistFilter = Rarity | "all" | "chase";
type SortMode = "rarity-desc" | "rarity-asc";

function PackDetail() {
  const { packId } = Route.useParams();
  const pack = getPack(packId)!;
  const seriesObj = getSeries(pack.seriesId);
  const isSpecialtyProduct = pack.productType === "Specialty Product";
  const { t, loc } = useI18n();
  const [filter, setFilter] = useState<ChecklistFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("rarity-desc");

  useEffect(() => {
    setFilter("all");
    setSortMode("rarity-desc");
  }, [packId]);

  const cards = useMemo(() => {
    const packCards = cardsByPack(packId);
    if (sortMode === "rarity-asc") {
      return sortByRarityDesc(packCards).reverse();
    }
    return sortByRarityDesc(packCards);
  }, [packId, sortMode]);
  const chaseCards = useMemo(
    () => sortByRarityDesc(cardsByPack(packId).filter((c) => CHASE_RARITIES.includes(c.rarity))).slice(0, 12),
    [packId],
  );

  const loaded = cards.length;
  const total = pack.totalCards;
  const missingCount = Math.max(0, total - loaded);
  const completion = total > 0 ? Math.round((loaded / total) * 100) : 0;

  // Box Potential — derived only from currently loaded cards with verified prices
  const boxPotential = useMemo(() => {
    const priced = cards
      .filter((c) => typeof c.priceUsd === "number" && (c.priceUsd as number) > 0)
      .sort((a, b) => (b.priceUsd as number) - (a.priceUsd as number));
    const topCard = priced[0];
    const top5Sum = priced.slice(0, 5).reduce((s, c) => s + (c.priceUsd as number), 0);
    const loadedValue = priced.reduce((s, c) => s + (c.priceUsd as number), 0);
    const sealed = pack.priceUsd ?? 0;

    let rating: "Very High" | "High" | "Medium" | "Unknown" = "Unknown";
    const topVal = topCard?.priceUsd ?? 0;
    if (priced.length === 0) {
      rating = "Unknown";
    } else if (topVal >= 500 || (sealed > 0 && top5Sum >= sealed * 5)) {
      rating = "Very High";
    } else if (topVal >= 150 || (sealed > 0 && top5Sum >= sealed * 3)) {
      rating = "High";
    } else if (topVal >= 40 || (sealed > 0 && top5Sum >= sealed * 1.5)) {
      rating = "Medium";
    }
    return { topCard, top5Sum, loadedValue, sealed, rating, pricedCount: priced.length };
  }, [cards, pack.priceUsd]);


  const rarities = useMemo(() => {
    const present = new Set(cards.map((c) => c.rarity));
    return RARITIES.filter((r) => present.has(r));
  }, [cards]);

  const filtered =
    filter === "all"
      ? cards
      : filter === "chase"
        ? cards.filter((c) => CHASE_RARITIES.includes(c.rarity))
        : cards.filter((c) => c.rarity === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/series" className="hover:text-foreground">{t("nav_series")}</Link> /{" "}
        {seriesObj && (
          <Link to="/series/$seriesId" params={{ seriesId: seriesObj.id }} className="hover:text-foreground">
            {loc(seriesObj.name)}
          </Link>
        )}
      </nav>

      {/* Hero: product image + buy panel */}
      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-background/40 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
            <img
              src={pack.image}
              alt={loc(pack.name)}
              className={`h-full w-full ${pack.imageStatus === "verified" ? "object-contain p-6" : "object-cover"}`}
            />
          </div>
          <h1 className="mt-6 font-display text-3xl sm:text-4xl font-bold leading-tight">{loc(pack.name)}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
            {pack.marketRegion && (
              <span className="rounded-full border border-border bg-card px-2.5 py-1">{pack.marketRegion}</span>
            )}
            {pack.printLanguage && (
              <span className="rounded-full border border-border bg-card px-2.5 py-1">{pack.printLanguage}</span>
            )}
            {pack.productType && (
              <span className="rounded-full border border-border bg-card px-2.5 py-1">{pack.productType}</span>
            )}
            {pack.releaseLine && (
              <span className="rounded-full border border-border bg-card px-2.5 py-1">{pack.releaseLine}</span>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start space-y-4">
          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-card via-card to-background/60 p-6 shadow-[0_20px_60px_-20px_oklch(0.6_0.24_28/0.45)]">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{PRICE_METRIC_LABEL}</p>
            <p className="mt-1 font-display text-4xl font-bold text-primary">
              {isPriceAvailable(pack.priceStatus, pack.priceUsd) ? `$${pack.priceUsd.toFixed(2)}` : "—"}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              {pack.priceUpdated
                ? `${t("pack_price_updated")} ${pack.priceUpdated} · ${priceStatusLabel(pack.priceStatus)}`
                : priceStatusLabel(pack.priceStatus)}
            </p>

            <div className="my-5 h-px bg-border" />

            <dl className={`${isSpecialtyProduct ? "grid grid-cols-1" : "grid grid-cols-3"} gap-3 text-center`}>
              {!isSpecialtyProduct && (
                <>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("pack_per_box")}</dt>
                <dd className="mt-1 font-display text-xl font-bold">{pack.packsPerBox || "—"}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("pack_per_pack")}</dt>
                <dd className="mt-1 font-display text-xl font-bold">{pack.cardsPerPack || "—"}</dd>
              </div>
                </>
              )}
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{isSpecialtyProduct ? "Known Cards" : t("pack_total_cards")}</dt>
                <dd className="mt-1 font-display text-xl font-bold">{pack.totalCards || "—"}</dd>
              </div>
            </dl>

            {total > 0 && loaded > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{isSpecialtyProduct ? "Product Checklist" : "Checklist progress"}</span>
                  <span className="font-mono">{loaded}/{total} · {completion}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>
            )}

            {pack.ebayUrl && (
              <a
                href={pack.ebayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 w-full text-base"
              >
                {isSpecialtyProduct ? "View collector product" : isPriceAvailable(pack.priceStatus, pack.priceUsd) ? "Buy this box" : "View box offer"}
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            {pack.productCode && (
              <p className="mt-3 text-[11px] text-muted-foreground font-mono">
                Product code: {pack.productCode}
              </p>
            )}

            <p className="mt-3 text-[11px] text-muted-foreground">
              {isSpecialtyProduct ? "Explore known cards and special product hits as verified data is added." : "Looking for top chase cards? Scroll down to see the checklist."}
            </p>

            {pack.recordStatus === "community_sourced" && (
              <p className="mt-3 text-[10px] text-muted-foreground italic">
                {CAPSULE_CORP_REFERENCE_LABEL}
              </p>
            )}
          </div>
        </aside>
      </div>


      <ProductVersionBlock pack={pack} />

      {/* Box Potential — hidden when there is no verified price/card data */}
      {!isSpecialtyProduct && (boxPotential.pricedCount > 0 || boxPotential.sealed > 0) ? (
        <BoxPotential bp={boxPotential} loc={loc} note={boxPotentialNote(pack.recordStatus ?? pack.priceStatus)} priceHint={priceStatusLabel(pack.priceStatus)} />
      ) : !isSpecialtyProduct ? (
        <section className="mt-10 rounded-2xl border border-border bg-card/60 p-6">
          <h2 className="font-display text-lg font-bold">Box Potential</h2>
          {isSpecialtyProduct && (
            <p className="mt-2 text-sm text-muted-foreground">
              Known cards and special product hits are pending verification for this collector product.
            </p>
          )}
          <p className={`mt-2 text-sm text-muted-foreground ${isSpecialtyProduct ? "hidden" : ""}`}>
            Insufficient verified data — checklist and market price for this product are still pending.
          </p>
        </section>
      ) : null}

      {/* D. Checklist progress */}
      {total > 0 && loaded > 0 ? (
        <section className="mt-10 rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold">{isSpecialtyProduct ? "Product Checklist" : t("pack_checklist_progress")}</h2>
              <p className="text-xs text-muted-foreground mt-1 max-w-xl">{isSpecialtyProduct ? "Known cards and special product hits will expand as this collector product is verified." : t("pack_checklist_note")}</p>
            </div>
            <div className={isSpecialtyProduct ? "hidden" : "text-right"}>
              <p className="font-mono text-2xl font-bold">
                {loaded} <span className="text-muted-foreground">/ {total}</span>
              </p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {t("pack_checklist_completion")} · {completion}%
              </p>
            </div>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
          {isSpecialtyProduct && (
            <p className="mt-3 text-[11px] text-muted-foreground">
              Known Cards: <span className="font-mono">{loaded}</span>
            </p>
          )}
          <p className={`mt-3 text-[11px] text-muted-foreground ${isSpecialtyProduct ? "hidden" : ""}`}>
            {t("pack_checklist_loaded")}: <span className="font-mono">{loaded}</span> · {t("pack_missing_slots")}:{" "}
            <span className="font-mono">{missingCount}</span>
          </p>
        </section>
      ) : isSpecialtyProduct ? (
        <section className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Product Checklist</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Known cards and special product hits are pending verification for this collector product.
          </p>
        </section>
      ) : (
        <section className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">{isSpecialtyProduct ? "Product Checklist" : t("pack_checklist_progress")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Checklist pending — no verified card entries have been added for this product yet.
          </p>
        </section>
      )}

      {/* E. Chase cards loaded */}
      {chaseCards.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold mb-5">{isSpecialtyProduct ? "Special Product Hits" : t("pack_chase_cards")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {chaseCards.map((c) => <CardTile key={c.id} card={c} />)}
          </div>
        </section>
      )}

      {/* F. Full card checklist */}
      {cards.length > 0 && (
        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="font-display text-2xl font-bold">{isSpecialtyProduct ? "Known Cards" : t("pack_full_checklist")}</h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setFilter("all")} className={`chip ${filter === "all" ? "chip-active" : ""}`}>
                  {t("pack_filter_all")}
                </button>
                <button onClick={() => setFilter("chase")} className={`chip ${filter === "chase" ? "chip-active" : ""}`}>
                  Chase
                </button>
                {rarities.map((r) => (
                  <button key={r} onClick={() => setFilter(r)} className={`chip ${filter === r ? "chip-active" : ""}`}>
                    {r}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Sort</span>
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as SortMode)}
                  className="h-9 rounded-md border border-border bg-background px-2 text-xs text-foreground"
                >
                  <option value="rarity-desc">Rarest first</option>
                  <option value="rarity-asc">Common first</option>
                </select>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.map((c) => <CardTile key={c.id} card={c} />)}
          </div>
        </section>
      )}

      {/* G. Missing data slots */}
      {!isSpecialtyProduct && filter === "all" && loaded > 0 && missingCount > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-muted-foreground">
              {t("pack_missing_slots")} · {missingCount}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array.from({ length: Math.min(missingCount, 30) }).map((_, i) => (
              <MissingCardSlot key={i} index={loaded + i + 1} />
            ))}
          </div>
          {missingCount > 30 && (
            <p className="mt-4 text-xs text-muted-foreground">
              + {missingCount - 30} more slots awaiting verified data.
            </p>
          )}
        </section>
      )}

      {/* H. Pull rates */}
      {!isSpecialtyProduct && pack.pullRates.length > 0 && (
        <section className="mt-12 rounded-lg border border-border bg-card p-5">
          <h2 className="font-display text-lg font-bold mb-4">{t("pack_pull_rates")}</h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {pack.pullRates.map((r) => (
              <li key={r.rarity} className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2">
                <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-wider ${rarityClass[r.rarity]}`}>
                  {r.rarity}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{r.odds}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* I. Price history */}
      {pack.priceHistory.length > 0 && (
        <section className="mt-8 rounded-lg border border-border bg-card p-5">
          <h2 className="font-display text-lg font-bold mb-4">{t("pack_price_history")}</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pack.priceHistory}>
                <XAxis dataKey="date" stroke="currentColor" fontSize={11} className="text-muted-foreground" />
                <YAxis stroke="currentColor" fontSize={11} className="text-muted-foreground" tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                  formatter={(v) => [`$${Number(v).toFixed(2)}`, "Price"]}
                />
                <Line type="monotone" dataKey="price" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}
    </div>
  );
}


interface BoxPotentialData {
  topCard?: { name: { en: string; zh: string; ja: string }; rarity: string; priceUsd?: number };
  top5Sum: number;
  loadedValue: number;
  sealed: number;
  rating: "Very High" | "High" | "Medium" | "Unknown";
  pricedCount: number;
}

function BoxPotential({
  bp,
  loc,
  note,
  priceHint,
}: {
  bp: BoxPotentialData;
  loc: (l: { en: string; zh: string; ja: string }) => string;
  note: string;
  priceHint: string;
}) {
  const ratingStyles: Record<BoxPotentialData["rating"], string> = {
    "Very High": "border-primary/60 bg-primary/15 text-primary",
    High: "border-primary/40 bg-primary/10 text-primary",
    Medium: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    Unknown: "border-border bg-muted/40 text-muted-foreground",
  };

  return (
    <section className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-card to-card/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold">Box Potential</h2>
          <p className="text-xs text-muted-foreground mt-1">
            A quick look at what makes this box interesting for collectors.
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${ratingStyles[bp.rating]}`}
        >
          {bp.rating}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <PotentialStat
          label={PRICE_METRIC_LABEL}
          value={bp.sealed > 0 ? `$${bp.sealed.toFixed(2)}` : "—"}
          hint={priceHint}
        />
        <PotentialStat
          label="Top chase card"
          value={bp.topCard?.priceUsd ? `$${(bp.topCard.priceUsd as number).toFixed(0)}` : "—"}
          hint={
            bp.topCard
              ? `${loc(bp.topCard.name)} · ${bp.topCard.rarity}`
              : "No priced data yet"
          }
        />
        <PotentialStat
          label="Top 5 chase total"
          value={bp.top5Sum > 0 ? `$${bp.top5Sum.toFixed(0)}` : "—"}
          hint="Sum of 5 highest loaded"
        />
        <PotentialStat
          label="Loaded checklist value"
          value={bp.loadedValue > 0 ? `$${bp.loadedValue.toFixed(0)}` : "—"}
          hint={`${bp.pricedCount} priced cards`}
        />
      </div>

      <p className="mt-5 text-[11px] text-muted-foreground italic">
        {note}
      </p>
    </section>
  );
}

function PotentialStat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/40 p-4">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground truncate">{hint}</p>
    </div>
  );
}
