import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export type Locale = (typeof routing)["locales"][number];

export const routing = defineRouting({
  locales: ["en", "pl"],
  defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export const isExistingLocale = (locale: string): locale is Locale =>
  routing.locales.includes(locale as any);
