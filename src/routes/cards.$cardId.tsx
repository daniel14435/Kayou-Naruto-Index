import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ExternalLink, ZoomIn, X } from "lucide-react";
import { getCard, getPack, packsByCard } from "@/data";
import { useI18n } from "@/lib/i18n";
import { rarityClass, rarityFrame } from "@/lib/rarity";
import { ebaySearch } from "@/lib/ebay";
import {
  CARD_PRICE_METRIC_LABEL,
  eBayCtaLabel,
  priceStatusLabel,
} from "@/lib/catalog-status";
import { StatusPill } from "@/components/site/status-pill";

export const Route = createFileRoute("/cards/$cardId")({
  loader: ({ params }) => {
    if (!getCard(params.cardId)) throw notFound();
    return { cardId: params.cardId };
  },
  component: CardDetail,
  head: ({ params }) => {
    const c = getCard(params.cardId);
    return {
      meta: [
        { title: `${c?.name.en} (${c?.rarity}) — ShinobIndex` },
        { name: "description", content: c?.flavor.en ?? "" },
        { property: "og:image", content: c?.image ?? "" },
      ],
    };
  },
});

function CardDetail() {
  const { cardId } = Route.useParams();
  const card = getCard(cardId)!;
  const legacyPack = card.packId ? getPack(card.packId) : undefined;
  // A legacy packId on demo seed cards represents a prototype-only relation.
  // We never surface it as factual availability — back-link only renders when
  // the underlying pack record is itself non-demo (community/verified/official).
  const showLegacyBackLink =
    !!legacyPack && legacyPack.recordStatus && legacyPack.recordStatus !== "demo";
  const publicAvailability = packsByCard(card.id, { publicOnly: true });
  const { t, loc } = useI18n();
  const [zoom, setZoom] = useState(false);
  const cardEbay = ebaySearch(`${card.character} ${card.number} ${card.rarity}`);

  const isUnassigned = !card.packId && publicAvailability.length === 0;
  const showPrice =
    typeof card.priceUsd === "number" && card.priceStatus !== "unavailable";

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      {showLegacyBackLink && legacyPack && (
        <Link
          to="/packs/$packId"
          params={{ packId: legacyPack.id }}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-3 w-3" /> {t("card_back_to_pack")}
        </Link>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative">
          <div className={`aspect-[3/4] overflow-hidden rounded-2xl bg-muted shadow-2xl ${rarityFrame[card.rarity]}`}>
            <img src={card.image} alt={loc(card.name)} className="h-full w-full object-cover" />
          </div>
          <button
            onClick={() => setZoom(true)}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/70 backdrop-blur px-3 py-2 text-xs font-medium text-white hover:bg-black"
          >
            <ZoomIn className="h-3 w-3" /> Zoom
          </button>
          {card.imageStatus === "uploaded_unverified" ? (
            <span className="absolute top-3 left-3 rounded-md border border-amber-400/40 bg-black/65 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Real photo · unverified
            </span>
          ) : card.isPlaceholder ? (
            <span className="absolute top-3 left-3 rounded-md bg-black/60 backdrop-blur px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white/70">
              Placeholder image
            </span>
          ) : (
            <span className="absolute top-3 left-3 rounded-md border border-primary/40 bg-black/65 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              Real card photo
            </span>
          )}
          <StatusPill
            status={card.recordStatus ?? "demo"}
            className="absolute top-3 right-3 !bg-black/60 backdrop-blur"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold tracking-wider ${rarityClass[card.rarity]}`}>
              {card.rarity}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{card.number}</span>
            {showPrice ? (
              <span className="ml-auto font-display text-2xl font-bold text-primary">
                ${(card.priceUsd as number).toFixed(2)}
              </span>
            ) : (
              <span className="ml-auto text-xs text-muted-foreground font-mono">
                {priceStatusLabel(card.priceStatus)}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">{loc(card.name)}</h1>
          <p className="mt-2 text-muted-foreground">{card.character}</p>

          {isUnassigned && (
            <div className="mt-5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-200">
              Verification pending — pack assignment and market data not yet confirmed.
              {card.sourceNotes && (
                <p className="mt-2 text-[12px] text-amber-200/85">{card.sourceNotes}</p>
              )}
            </div>
          )}

          <dl className="mt-8 space-y-4 border-t border-border pt-6">
            <Row label={t("card_character")} value={card.character} />
            <Row label={t("card_rarity")} value={card.rarity} />
            <Row label={t("card_number")} value={card.number} />
            <Row label={CARD_PRICE_METRIC_LABEL} value={showPrice ? `$${(card.priceUsd as number).toFixed(2)} · ${priceStatusLabel(card.priceStatus)}` : priceStatusLabel(card.priceStatus)} />
          </dl>

          {/* External CTAs — only when the card is actually mapped to a real product.
              Unassigned / verification-pending cards must not link to invented searches. */}
          {!isUnassigned && (
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cardEbay} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {eBayCtaLabel} <ExternalLink className="h-4 w-4" />
              </a>
              {showLegacyBackLink && legacyPack && (
                <a href={legacyPack.ebayUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Sealed pack listings <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          )}

          {/* Pullable from — only renders verified / community / official relations.
              Demo relations stay hidden so prototype data never appears as real
              product availability. */}
          {publicAvailability.length > 0 && (
            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Pullable from</p>
              <ul className="mt-2 space-y-2">
                {publicAvailability.map(({ pack, availability }) => (
                  <li key={pack.id} className="flex items-center justify-between gap-3">
                    <Link
                      to="/packs/$packId"
                      params={{ packId: pack.id }}
                      className="font-display text-base font-bold hover:text-primary"
                    >
                      {loc(pack.name)}
                    </Link>
                    <StatusPill kind="availability" status={availability.availabilityStatus} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-2">{t("card_lore")}</h2>
            <p className="text-sm leading-relaxed italic">"{loc(card.flavor)}"</p>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">{t("card_community_soon")}</p>
        </div>
      </div>

      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoom(false)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white" aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <img
            src={card.image}
            alt={loc(card.name)}
            className="h-[85vh] max-h-[85vh] w-auto max-w-[92vw] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-right">{value}</dd>
    </div>
  );
}
