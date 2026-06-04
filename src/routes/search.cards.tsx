import { createFileRoute } from "@tanstack/react-router";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { cards, packs, series, packsByCard } from "@/data";
import { CardTile } from "@/components/site/card-tile";
import { useI18n } from "@/lib/i18n";
import { RARITIES } from "@/data/types";
import type { Market, Rarity } from "@/data/types";

const normalizeExactValue = (value?: string) => value?.trim().toLowerCase() ?? "";

const idSuffix = (id: string) => id.split("__").pop() ?? id;

export const Route = createFileRoute("/search/cards")({
  component: CardSearch,
  head: () => ({
    meta: [
      { title: "Card search — ShinobIndex" },
      { name: "description", content: "Search every ShinobIndex single card by name, character, rarity, pack or series." },
    ],
  }),
});

function CardSearch() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const [rarity, setRarity] = useState<Rarity | "all">("all");
  const [market, setMarket] = useState<Market | "all">("all");
  const [seriesId, setSeriesId] = useState<string | "all">("all");
  const [packId, setPackId] = useState<string | "all">("all");

  const fuse = useMemo(
    () => new Fuse(cards, {
        // include `id` and `rarity` so searches can match canonical ids and
        // rarity codes (e.g. "SE", "BP", "20th"). Keep existing name
        // and character keys.
        keys: ["id", "rarity", "name.en", "name.zh", "name.ja", "character", "number"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [],
  );

  const results = useMemo(() => {
    let base = q.trim() ? fuse.search(q.trim()).map((r) => r.item) : cards;
    if (rarity !== "all") base = base.filter((c) => c.rarity === rarity);

    // Use canonical pack relations via packsByCard(c.id) when resolving
    // pack/series/market filters. Fall back to c.packId only if no
    // availability relations exist for the card.
    if (packId !== "all") {
      base = base.filter((c) => {
        const rels = packsByCard(c.id);
        if (rels && rels.length > 0) return rels.some((r) => r.pack.id === packId);
        return c.packId === packId;
      });
    } else if (seriesId !== "all" || market !== "all") {
      base = base.filter((c) => {
        const rels = packsByCard(c.id).map((r) => r.pack).filter(Boolean);
        const candidatePacks = rels.length > 0 ? rels : (c.packId ? [packs.find((p) => p.id === c.packId)].filter(Boolean) as any[] : []);
        if (candidatePacks.length === 0) return false;
        if (seriesId !== "all" && !candidatePacks.some((p) => p.seriesId === seriesId)) return false;
        if (market !== "all" && !candidatePacks.some((p) => {
          const ser = series.find((s) => s.id === p.seriesId);
          return ser?.market === market;
        })) return false;
        return true;
      });
    }
    // Exclude legacy demo-only records from search results so migrated
    // community-sourced and verified cards surface preferentially. Keep
    // any card with undefined or other `recordStatus` values (e.g.
    // `community_sourced`, `verified`).
    base = base.filter((c) => (c as any).recordStatus !== "demo");
    return base;
  }, [q, rarity, market, seriesId, packId, fuse]);

  const normalizedQuery = normalizeExactValue(q);
  const exactMatches = useMemo(() => {
    if (!normalizedQuery) return [];
    return results.filter((card) => {
      const exactValues = [
        card.number,
        card.id,
        idSuffix(card.id),
      ].map(normalizeExactValue);

      return exactValues.some((value) => value === normalizedQuery);
    });
  }, [results, normalizedQuery]);
  const exactMatchIds = useMemo(() => new Set(exactMatches.map((card) => card.id)), [exactMatches]);
  const similarCards = useMemo(
    () => results.filter((card) => !exactMatchIds.has(card.id)),
    [results, exactMatchIds],
  );

  const seriesOptions = market === "all" ? series : series.filter((s) => s.market === market);
  const packOptions = packs.filter((p) => seriesId === "all" || p.seriesId === seriesId);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-5xl font-bold">{t("search_hub_cards_title")}</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">{t("search_hub_cards_desc")}</p>

      <div className="mt-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("search_placeholder")}
          className="w-full rounded-full border border-border bg-card pl-11 pr-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label={t("search_filter_market")}>
          <select value={market} onChange={(e) => { setMarket(e.target.value as Market | "all"); setSeriesId("all"); setPackId("all"); }} className="select">
            <option value="all">{t("market_all")}</option>
            <option value="japanese">{t("market_japanese")}</option>
            <option value="english">{t("market_english")}</option>
          </select>
        </Field>
        <Field label={t("search_filter_series")}>
          <select value={seriesId} onChange={(e) => { setSeriesId(e.target.value); setPackId("all"); }} className="select">
            <option value="all">{t("pack_filter_all")}</option>
            {seriesOptions.map((s) => <option key={s.id} value={s.id}>{s.name.en}</option>)}
          </select>
        </Field>
        <Field label="Pack">
          <select value={packId} onChange={(e) => setPackId(e.target.value)} className="select">
            <option value="all">{t("pack_filter_all")}</option>
            {packOptions.map((p) => <option key={p.id} value={p.id}>{p.tag} — {p.name.en}</option>)}
          </select>
        </Field>
        <Field label={t("search_filter_rarity")}>
          <select value={rarity} onChange={(e) => setRarity(e.target.value as Rarity | "all")} className="select">
            <option value="all">{t("pack_filter_all")}</option>
            {RARITIES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
      </div>

      <p className="mt-6 text-xs text-muted-foreground font-mono">{results.length} {t("found")}</p>

      {results.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">{t("search_no_results")}</p>
      ) : (
        <div className="mt-4 space-y-8">
          {exactMatches.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold">Exact matches</h2>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {exactMatches.map((c) => <CardTile key={c.id} card={c} />)}
              </div>
            </section>
          )}

          {similarCards.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold">{exactMatches.length > 0 || normalizedQuery ? "Similar cards" : "Cards"}</h2>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {similarCards.map((c) => <CardTile key={c.id} card={c} />)}
              </div>
            </section>
          )}
        </div>
      )}

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
