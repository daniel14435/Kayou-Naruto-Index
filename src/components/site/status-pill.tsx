import {
  availabilityStatusLabel,
  recordStatusLabel,
  type AvailabilityStatus,
  type RecordStatus,
} from "@/lib/catalog-status";

type Tone = "neutral" | "info" | "warn" | "ok";

function toneClass(t: Tone) {
  switch (t) {
    case "ok":
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
    case "info":
      return "border-sky-500/40 bg-sky-500/10 text-sky-300";
    case "warn":
      return "border-amber-500/40 bg-amber-500/10 text-amber-300";
    case "neutral":
    default:
      return "border-border bg-muted/40 text-muted-foreground";
  }
}

function toneFor(status: RecordStatus | AvailabilityStatus | undefined): Tone {
  switch (status) {
    case "official_source":
    case "verified":
      return "ok";
    case "community_sourced":
      return "info";
    case "unverified":
      return "warn";
    case "demo":
    default:
      return "neutral";
  }
}

export function StatusPill({
  status,
  kind = "record",
  className = "",
}: {
  status?: RecordStatus | AvailabilityStatus;
  kind?: "record" | "availability";
  className?: string;
}) {
  const label =
    kind === "availability"
      ? availabilityStatusLabel(status as AvailabilityStatus)
      : recordStatusLabel(status as RecordStatus);
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${toneClass(
        toneFor(status),
      )} ${className}`}
    >
      {label}
    </span>
  );
}
