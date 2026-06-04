import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — ShinobIndex" },
      { name: "description", content: "About this fan-built ShinobIndex card catalog." },
    ],
  }),
});

function AboutPage() {
  const { t, lang } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      {lang !== "en" && <span className="kanji-stamp text-xs">{lang === "ja" ? "概要" : "关于"}</span>}
      <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold">{t("about_title")}</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("about_body")}</p>
      <p className="mt-8 text-xs text-muted-foreground italic border-l-2 border-primary pl-4">
        {t("about_disclaimer")}
      </p>
    </div>
  );
}
