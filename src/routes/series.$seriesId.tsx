import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getSeries, packsBySeries } from "@/data";
import { useI18n } from "@/lib/i18n";
import { SealedProductCard } from "@/components/site/sealed-product-card";

export const Route = createFileRoute("/series/$seriesId")({
  loader: ({ params }) => {
    const s = getSeries(params.seriesId);
    if (!s) throw notFound();
    return { seriesId: params.seriesId };
  },
  component: SeriesDetail,
  head: ({ params }) => {
    const s = getSeries(params.seriesId);
    return {
      meta: [
        { title: `${s?.name.en ?? "Series"} — packs & checklists | ShinobIndex` },
        { name: "description", content: s?.description.en ?? "" },
        { property: "og:image", content: s?.cover ?? "" },
      ],
    };
  },
});

function SeriesDetail() {
  const { seriesId } = Route.useParams();
  const s = getSeries(seriesId)!;
  const ps = packsBySeries(seriesId);
  const { t, loc } = useI18n();

  const regionLabel =
    s.market === "english" ? "English Edition" : "Region unverified";

  return (
    <div>
      <div className="relative h-64 sm:h-80 overflow-hidden border-b border-border">
        <img src={s.cover} alt={loc(s.name)} className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,oklch(0.6_0.24_28/0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 h-full flex flex-col justify-end pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
              {regionLabel}
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">
              {s.releaseDate}
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold">{loc(s.name)}</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground line-clamp-2">{loc(s.description)}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">{t("series_packs_in")}</h2>
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            {ps.length} products
          </span>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {ps.map((p) => (
            <SealedProductCard key={p.id} pack={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
