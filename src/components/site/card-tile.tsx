import { Link } from "@tanstack/react-router";
import type { Card } from "@/data/types";
import {
  rarityClass,
  rarityFrame,
  rarityCssClass,
  resolveTier,
} from "@/lib/rarity";
import { useI18n } from "@/lib/i18n";
import { PriceChip } from "@/components/site/price-chip";

export function CardTile({ card }: { card: Card }) {
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

            {/* Subtle holographic sweep on hover */}
            <div className="holo-overlay" />

            {/* Bottom gradient for legibility */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

            {/* Rarity badge — top right */}
            <span
              className={`absolute top-2 right-2 inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold tracking-[0.08em] backdrop-blur-sm ${rarityClass[card.rarity]}`}
            >
              {card.rarity}
            </span>

            {/* Card number — bottom left */}
            <span className="absolute bottom-2 left-2 font-mono text-[10px] text-white/85">
              {card.number}
            </span>

            {/* Price — bottom right */}
            {typeof card.priceUsd === "number" && card.priceUsd > 0 && (
              <PriceChip value={card.priceUsd} size="sm" prefix="$" className="absolute bottom-2 right-2" />
            )}

            {card.isPlaceholder && (
              <span className="absolute top-2 left-2 rounded-sm bg-black/60 backdrop-blur px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wider text-white/70">
                Placeholder
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

/**
 * Locked, archive-styled placeholder for unverified checklist slots.
 * Used when a pack declares totalCards greater than the number of verified entries.
 */
export function MissingCardSlot({ index }: { index: number }) {
  return (
    <div className="group block opacity-70">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-dashed border-border bg-muted/40">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
          <span className="font-mono text-[10px] text-muted-foreground">
            #{String(index).padStart(3, "0")}
          </span>
          <span className="font-display text-2xl text-muted-foreground/60">?</span>
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground/80">
            Data pending
          </span>
        </div>
        <span className="absolute top-2 right-2 inline-flex items-center rounded-md border border-border bg-background/60 px-1.5 py-0.5 text-[10px] font-bold tracking-[0.08em] text-muted-foreground backdrop-blur-sm">
          ?
        </span>
      </div>
      <div className="mt-2 px-0.5">
        <p className="text-[13px] font-medium leading-tight text-muted-foreground/70">
          Unverified card
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground/60">Awaiting scan</p>
      </div>
    </div>
  );
}
