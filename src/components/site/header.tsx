import { Link } from "@tanstack/react-router";
import { Layers, Menu, Moon, Package, Search, Sun, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import type { Lang } from "@/data/types";
import logo from "@/assets/packs/shinobindex-logo.png";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/series", label: t("nav_series") },
    { to: "/search/packs", label: t("nav_search_packs"), icon: Package },
    { to: "/search/cards", label: t("nav_search_cards"), icon: Layers },
    { to: "/about", label: t("nav_about") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 h-20 border-b border-border/80 bg-background/92 shadow-[0_12px_40px_-30px_rgba(0,0,0,0.65)] backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6">
        <Link
          to="/"
          className="group relative flex min-w-0 items-center rounded-2xl border border-border/70 bg-gradient-to-r from-card/95 via-card/70 to-card/35 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_30px_-24px_oklch(0.6_0.24_28/0.65)] transition hover:border-primary/55"
          aria-label="ShinobIndex"
        >
          <span className="pointer-events-none absolute inset-y-2 left-0 w-px bg-gradient-to-b from-transparent via-primary/70 to-transparent" />
          <img
            src={logo}
            alt="ShinobIndex"
            width={280}
            height={72}
            className="h-11 w-auto select-none object-contain drop-shadow-[0_3px_12px_rgba(0,0,0,0.38)] sm:h-12"
            draggable={false}
          />
        </Link>

        <nav className="hidden justify-self-center items-center gap-1 rounded-full border border-border/70 bg-card/55 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{
                className:
                  "border-primary/35 bg-primary/12 text-primary shadow-[0_4px_16px_-10px_oklch(0.6_0.24_28/0.75)]",
              }}
              inactiveProps={{ className: "border-transparent text-foreground/72" }}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition hover:border-border hover:bg-background/60 hover:text-foreground"
            >
              {"icon" in l && l.icon ? <l.icon className="h-3.5 w-3.5" /> : null}
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 justify-self-end rounded-full border border-border/70 bg-card/55 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <Link
            to="/search"
            aria-label={t("nav_search")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/75 transition hover:bg-background/70 hover:text-foreground md:hidden"
          >
            <Search className="h-4 w-4" />
          </Link>
          <select
            aria-label={t("lang_label")}
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="h-9 rounded-full border border-border/70 bg-background/55 px-3 text-xs font-semibold text-foreground outline-none transition hover:border-primary/60 focus:border-primary"
          >
            <option value="en">EN</option>
            <option value="zh">ZH</option>
            <option value="ja">JA</option>
          </select>
          <button
            type="button"
            onClick={toggle}
            aria-label={t("theme_toggle")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/75 transition hover:bg-background/70 hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/75 transition hover:bg-background/70 hover:text-foreground md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/80 bg-background/95 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-primary/10 text-primary" }}
                inactiveProps={{ className: "text-foreground/82" }}
                className="flex items-center gap-2 rounded-lg border-b border-border/45 px-3 py-3 text-sm font-semibold last:border-b-0"
              >
                {"icon" in l && l.icon ? <l.icon className="h-4 w-4" /> : null}
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-16 border-t border-border/80 bg-background/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
        <div className="flex items-center gap-3 rounded-full border border-border/60 bg-card/50 px-3 py-2">
          <span className="flex h-10 items-center overflow-hidden rounded-full bg-background/75 px-2 ring-1 ring-border/50">
            <img
              src={logo}
              alt="ShinobIndex"
              width={170}
              height={44}
              className="h-8 w-auto object-contain"
              draggable={false}
            />
          </span>
          <span className="max-w-xs text-xs text-foreground/72">
            {t("footer_made")}
          </span>
        </div>
        <p className="font-mono text-[11px] text-foreground/62">
          (c) {new Date().getFullYear()} ShinobIndex
        </p>
      </div>
    </footer>
  );
}
