import { createFileRoute } from "@tanstack/react-router";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { packs, series } from "@/data";
import { useI18n } from "@/lib/i18n";
import { SealedProductCard } from "@/components/site/sealed-product-card";
import type { Market, ProductType } from "@/data/types";

export const Route = createFileRoute("/search/packs")({
  component: PackSearch,
  head: () => ({
    meta: [
      { title: "Pack search — ShinobIndex" },
      { name: "description", content: "Search Naruto Kayou booster boxes, deluxe boxes and collector cases with collector market references." },
    ],
  }),
});

function PackSearch() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const [market, setMarket] = useState<Market | "all">("all");
  const [seriesId, setSeriesId] = useState<string | "all">("all");
  const [tier, setTier] = useState<string>("all");
  const [wave, setWave] = useState<string>("all");
  const [productType, setProductType] = useState<ProductType | "all">("all");
  const [maxPrice, setMaxPrice] = useState<number>(500);

  const fuse = useMemo(
    () => new Fuse(packs, {
      keys: ["name.en", "name.zh", "name.ja", "tag"],
      threshold: 0.35,
      ignoreLocation: true,
    }),
    [],
  );

  const results = useMemo(() => {
    let base = q.trim() ? fuse.search(q.trim()).map((r) => r.item) : packs;
    if (seriesId !== "all") base = base.filter((p) => p.seriesId === seriesId);
    if (market !== "all") base = base.filter((p) => series.find((s) => s.id === p.seriesId)?.market === market);
    if (tier !== "all") base = base.filter((p) => String(p.tier ?? "") === tier);
    if (wave !== "all") base = base.filter((p) => String(p.wave ?? "") === wave);
    if (productType !== "all") base = base.filter((p) => p.productType === productType);
    base = base.filter((p) => p.priceUsd === 0 || p.priceUsd <= maxPrice);
    return base;
  }, [q, market, seriesId, tier, wave, productType, maxPrice, fuse]);

  const seriesOptions = market === "all" ? series : series.filter((s) => s.market === market);
  const tierOptions = Array.from(new Set(packs.map((p) => p.tier).filter(Boolean))) as number[];
  const waveOptions = Array.from(new Set(packs.map((p) => p.wave).filter(Boolean))) as number[];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-5xl font-bold">{t("search_hub_packs_title")}</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">{t("search_hub_packs_desc")}</p>

      <div className="mt-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="T1W1, Booster, Akatsuki…"
          className="w-full rounded-full border border-border bg-card pl-11 pr-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Field label={t("search_filter_market")}>
          <select value={market} onChange={(e) => { setMarket(e.target.value as Market | "all"); setSeriesId("all"); }} className="select">
            <option value="all">{t("market_all")}</option>
            <option value="japanese">{t("market_japanese")}</option>
            <option value="english">{t("market_english")}</option>
          </select>
        </Field>
        <Field label={t("search_filter_series")}>
          <select value={seriesId} onChange={(e) => setSeriesId(e.target.value)} className="select">
            <option value="all">{t("pack_filter_all")}</option>
            {seriesOptions.map((s) => <option key={s.id} value={s.id}>{s.name.en}</option>)}
          </select>
        </Field>
        <Field label={t("search_filter_variant")}>
          <select value={productType} onChange={(e) => setProductType(e.target.value as ProductType | "all")} className="select">
            <option value="all">{t("pack_filter_all")}</option>
            <option value="Booster Box">{t("variant_booster")}</option>
            <option value="Deluxe Box">{t("variant_deluxe")}</option>
            <option value="Collector Box">{t("variant_collector")}</option>
            <option value="Loose Pack">Loose Pack</option>
            <option value="Specialty Product">Specialty Product</option>
          </select>
        </Field>
        <Field label={t("search_filter_tier")}>
          <select value={tier} onChange={(e) => setTier(e.target.value)} className="select">
            <option value="all">{t("pack_filter_all")}</option>
            {tierOptions.sort().map((n) => <option key={n} value={n}>Tier {n}</option>)}
          </select>
        </Field>
        <Field label={t("search_filter_wave")}>
          <select value={wave} onChange={(e) => setWave(e.target.value)} className="select">
            <option value="all">{t("pack_filter_all")}</option>
            {waveOptions.sort().map((n) => <option key={n} value={n}>Wave {n}</option>)}
          </select>
        </Field>
        <Field label={`${t("search_filter_price")} · $${maxPrice}`}>
          <input
            type="range"
            min={20}
            max={500}
            step={5}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[var(--color-primary)]"
          />
        </Field>
      </div>

      <p className="mt-6 text-xs text-muted-foreground font-mono">{results.length} {t("found")}</p>

      <div className="mt-4 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <SealedProductCard key={p.id} pack={p} />
        ))}
      </div>

      <style>{`.select{width:100%;border-radius:9999px;border:1px solid var(--color-border);background:var(--color-card);padding:0.6rem 1rem;font-size:0.875rem;}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
