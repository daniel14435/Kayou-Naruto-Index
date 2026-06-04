import { cn } from "@/lib/utils";

/**
 * Premium price chip used across card tiles, checklists, top hits and detail views.
 * Sizes: sm (card tile overlay), md (default), lg (hero/detail).
 */
export function PriceChip({
  value,
  size = "md",
  className,
  prefix = "$",
}: {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  prefix?: string;
}) {
  const formatted = `${prefix}${value >= 100 ? value.toFixed(0) : value.toFixed(2)}`;
  const sizeCls =
    size === "sm"
      ? "px-2 py-0.5 text-[11px]"
      : size === "lg"
        ? "px-3.5 py-1.5 text-base"
        : "px-2.5 py-1 text-xs";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-mono font-bold tracking-tight",
        "border border-amber-300/40 text-amber-50",
        "bg-gradient-to-b from-amber-400/30 via-orange-500/25 to-red-600/30",
        "shadow-[0_2px_10px_-2px_rgba(234,88,12,0.55),inset_0_1px_0_rgba(255,255,255,0.22)]",
        "backdrop-blur-sm",
        sizeCls,
        className,
      )}
    >
      {formatted}
    </span>
  );
}
