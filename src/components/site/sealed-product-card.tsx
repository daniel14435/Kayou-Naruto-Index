import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Pack } from "@/data/types";
import { useI18n } from "@/lib/i18n";
import {
  PRICE_METRIC_LABEL,
  isPriceAvailable,
  priceStatusLabel,
} from "@/lib/catalog-status";
import { StatusPill } from "./status-pill";

function variantLabel(p: Pack) {
  if (p.productType) return p.productType;
  if (p.variant === "deluxe") return "Deluxe Box";
  if (p.variant === "collector") return "Collector Box";
  return "Booster Box";
}

export function SealedProductCard({ pack }: { pack: Pack }) {
  const { loc } = useI18n();
  const p = pack;
  const tagFull =
    p.variant && p.variant !== "booster"
      ? `${p.tag}·${p.variant === "deluxe" ? "DLX" : "COL"}`
      : p.tag;
  const variant = variantLabel(p);
  const variantTone =
    p.productType === "Loose Pack" || p.productType === "Specialty Product"
      ? "border-sky-400/40 text-sky-300 bg-sky-400/10"
      : p.variant === "collector"
        ? "border-amber-400/40 text-amber-300/95 bg-amber-400/10"
        : p.variant === "deluxe"
          ? "border-primary/45 text-primary bg-primary/10"
          : "border-white/15 text-white/85 bg-white/5";

  const status = priceStatusLabel(p.priceStatus);
  const priceAvailable = isPriceAvailable(p.priceStatus, p.priceUsd);
  const isCommunity = p.recordStatus === "community_sourced";
  const isSpecialtyProduct = p.productType === "Specialty Product";
  const displayVariant = isSpecialtyProduct ? "Special Edition" : variant;
  const productLabel = isSpecialtyProduct ? "Collector Box" : p.productType ?? "Sealed product";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-b from-card/95 to-card/60 backdrop-blur-sm shadow-[0_1px_0_0_oklch(1_0_0/0.04)_inset] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/55 hover:shadow-[0_24px_60px_-24px_oklch(0.6_0.24_28/0.55)]">
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-70" />

      <Link
        to="/packs/$packId"
        params={{ packId: p.id }}
        className="relative block aspect-[5/4] overflow-hidden"
      >
        <div
          className="absolute inset-0 scale-110 blur-2xl opacity-40"
          style={{ backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/85" />
        <img
          src={p.image}
          alt={loc(p.name)}
          loading="lazy"
          className="absolute inset-0 m-auto h-[88%] w-[88%] object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out group-hover:scale-[1.035]"
        />
        <div className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-inset ring-white/[0.04]" />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-md border border-primary/40 bg-black/55 px-2 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-primary backdrop-blur-md">
            {tagFull}
          </span>
          <span className={`inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md ${variantTone}`}>
            {displayVariant}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-display text-[17px] font-bold leading-snug text-foreground line-clamp-2">
            {loc(p.name)}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {productLabel}
            </p>
            {isCommunity && (
              <StatusPill status="community_sourced" className="!py-0 !text-[9px]" />
            )}
          </div>
        </div>

        {isSpecialtyProduct && p.totalCards > 0 && (
          <div className="overflow-hidden rounded-xl border border-border/60 bg-background/40">
            <MiniStat value={p.totalCards} label="Known Cards" />
          </div>
        )}

        {!isSpecialtyProduct && (p.totalCards > 0 || p.cardsPerPack > 0 || p.packsPerBox > 0) && (
          <div className="grid grid-cols-3 divide-x divide-border/60 overflow-hidden rounded-xl border border-border/60 bg-background/40">
            <MiniStat value={p.totalCards || "—"} label="Total" />
            <MiniStat value={p.cardsPerPack || "—"} label="Per pack" />
            <MiniStat value={p.packsPerBox || "—"} label="Per box" />
          </div>
        )}

        <div className="relative overflow-hidden rounded-xl border border-primary/25 bg-[linear-gradient(135deg,oklch(0.6_0.24_28/0.14),transparent_60%)] p-4">
          <span className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-primary to-primary/30" />
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {PRICE_METRIC_LABEL}
              </p>
              <p className="mt-0.5 font-display text-[26px] leading-none font-bold text-primary">
                {priceAvailable ? `$${p.priceUsd.toFixed(2)}` : "—"}
              </p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                {status}
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              USD
            </span>
          </div>
        </div>

        <div className={`mt-auto grid gap-2 ${p.ebayUrl ? "grid-cols-2" : "grid-cols-1"}`}>
          <Link
            to="/packs/$packId"
            params={{ packId: p.id }}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border/70 bg-background/50 px-3 py-2 text-xs font-semibold text-foreground/90 transition hover:border-primary/50 hover:text-primary"
          >
            {isSpecialtyProduct ? "View product" : "View pack"} <ArrowRight className="h-3 w-3" />
          </Link>
          {p.ebayUrl && (
            <a
              href={p.ebayUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-primary/85 px-3 py-2 text-xs font-semibold text-primary-foreground shadow-[0_6px_20px_-6px_oklch(0.6_0.24_28/0.6)] transition hover:brightness-110"
            >
              View listings <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function MiniStat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="px-2 py-2.5 text-center">
      <p className="font-mono text-sm font-bold text-foreground leading-none">{value}</p>
      <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
    </div>
  );
}
