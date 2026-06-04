import { createFileRoute, Link } from "@tanstack/react-router";
import { series } from "@/data";
import { useI18n } from "@/lib/i18n";
import { productFamilyLabel } from "@/lib/catalog-status";
import { StatusPill } from "@/components/site/status-pill";
import type { ProductFamily, Series } from "@/data/types";

export const Route = createFileRoute("/series/")({
  component: SeriesPage,
  head: () => ({
    meta: [
      { title: "All series — ShinobIndex" },
      {
        name: "description",
        content:
          "Browse ShinobIndex product families: Chinese Tier, English, EX / Rainbow and Specialty products.",
      },
    ],
  }),
});

const FAMILY_ORDER: ProductFamily[] = [
  "chinese-tier",
  "english",
  "ex-rainbow",
  "specialty",
];

function SeriesPage() {
  const { t, loc } = useI18n();

  const groups = FAMILY_ORDER.map((fam) => ({
    family: fam,
    items: series.filter((s) => (s.productFamily ?? "chinese-tier") === fam),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16">
      <h1 className="font-display text-3xl sm:text-5xl font-bold">{t("home_series_title")}</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">{t("tagline")}</p>

      {groups.map((g) => (
        <section key={g.family} className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display text-xl font-bold">{productFamilyLabel(g.family)}</h2>
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              {g.items.length} series
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {g.items.map((s) => (
              <SeriesCard key={s.id} s={s} loc={loc} t={t} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SeriesCard({
  s,
  loc,
  t,
}: {
  s: Series;
  loc: (l: { en: string; zh: string; ja: string }) => string;
  t: (k: "market_english" | "market_japanese") => string;
}) {
  return (
    <Link
      to="/series/$seriesId"
      params={{ seriesId: s.id }}
      className="group flex gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary transition"
    >
      <img
        src={s.cover}
        alt={loc(s.name)}
        loading="lazy"
        className="w-32 h-40 object-cover rounded flex-shrink-0"
      />
      <div className="flex flex-col min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
            {s.market === "english" ? t("market_english") : t("market_japanese")}
          </span>
          {s.recordStatus && <StatusPill status={s.recordStatus} />}
        </div>
        <h2 className="mt-1 font-display text-xl font-bold leading-tight group-hover:text-primary">
          {loc(s.name)}
        </h2>
        <p className="text-xs text-muted-foreground mt-1">{s.releaseDate}</p>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{loc(s.description)}</p>
      </div>
    </Link>
  );
}
