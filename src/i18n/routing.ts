import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export type Locale = (typeof LOCALES)[number];

const LOCALES = ["en", "pl"] as const;
const DEFAULT_LOCALE: Locale = "en";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export const isExistingLocale = (locale: string): locale is Locale =>
  LOCALES.includes(locale as any);
