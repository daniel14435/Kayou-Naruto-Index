import {
  formatPrintLanguage,
  formatRegion,
  formatReleaseLine,
} from "@/lib/catalog-status";
import type { Pack } from "@/data/types";
import { StatusPill } from "./status-pill";

/**
 * Compact "Product Version" panel — explains the regional/print/release
 * facts of a sealed product without mixing them with UI language.
 */
export function ProductVersionBlock({ pack }: { pack: Pack }) {
  return (
    <section className="mt-6 rounded-2xl border border-border bg-card/60 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-sm uppercase tracking-[0.18em] text-muted-foreground">
          Product version
        </h2>
        <StatusPill status={pack.recordStatus ?? "demo"} />
      </div>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
        <Row label="Region" value={formatRegion(pack.marketRegion)} />
        <Row label="Print language" value={formatPrintLanguage(pack.printLanguage)} />
        <Row label="Release line" value={formatReleaseLine(pack.releaseLine)} />
      </dl>
      {pack.variantNotes && (
        <p className="mt-3 text-[11px] text-muted-foreground">{pack.variantNotes}</p>
      )}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-background/40 p-3">
      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
