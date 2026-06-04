import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import kayouCss from "../styles/kayou-rarity.css?url";
import heroBg from "@/assets/packs/hero-naruto.jpg";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { Footer, Header } from "@/components/site/header";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Lost scroll</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page is not in the catalog.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ShinobIndex | Naruto Kayou Card Database, Packs & Checklists" },
      { name: "description", content: "Explore Naruto Kayou card packs, series, checklists, chase cards and collector market references in ShinobIndex, an independent collector-built database." },
      { name: "author", content: "ShinobIndex" },
      { property: "og:title", content: "ShinobIndex | Naruto Kayou Card Database, Packs & Checklists" },
      { property: "og:description", content: "Explore Naruto Kayou card packs, series, checklists, chase cards and collector market references in ShinobIndex, an independent collector-built database." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: kayouCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <div className="relative isolate min-h-screen flex flex-col overflow-hidden bg-paper">
            <div className="pointer-events-none fixed inset-0 z-0">
              <img
                src={heroBg}
                alt=""
                width={1920}
                height={1080}
                className="h-full w-full object-cover opacity-[0.16] saturate-[0.85] dark:opacity-[0.46] dark:saturate-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/42 via-background/64 to-background/88 dark:from-background/24 dark:via-background/52 dark:to-background/86" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/82 via-background/44 to-background/20 dark:from-background/78 dark:via-background/38 dark:to-background/12" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.10] dark:opacity-[0.18]" />
            </div>
            <Header />
            <main className="relative z-10 flex-1">
              <Outlet />
            </main>
            <div className="relative z-10">
              <Footer />
            </div>
          </div>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
