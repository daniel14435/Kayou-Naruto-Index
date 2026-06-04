import { createFileRoute, Link } from "@tanstack/react-router";
import { Layers, Package, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/search/")({
  component: SearchHub,
  head: () => ({
    meta: [
      { title: "Search — ShinobIndex" },
      { name: "description", content: "Search ShinobIndex packs and single cards in two dedicated catalogs." },
    ],
  }),
});

function SearchHub() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
      <h1 className="font-display text-3xl sm:text-5xl font-bold">{t("search_hub_title")}</h1>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <SearchCard
          to="/search/packs"
          icon={<Package className="h-6 w-6" />}
          title={t("search_hub_packs_title")}
          desc={t("search_hub_packs_desc")}
        />
        <SearchCard
          to="/search/cards"
          icon={<Layers className="h-6 w-6" />}
          title={t("search_hub_cards_title")}
          desc={t("search_hub_cards_desc")}
        />
      </div>
    </div>
  );
}

function SearchCard({ to, icon, title, desc }: { to: "/search/packs" | "/search/cards"; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-primary"
    >
      <div className="absolute inset-0 bg-paper opacity-0 group-hover:opacity-100 transition" />
      <div className="relative">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          {icon}
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
