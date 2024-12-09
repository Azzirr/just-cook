import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { BaseLayout } from "@/components/BaseLayout";

import { isExistingLocale, routing } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isExistingLocale(locale)) {
    notFound();
  }

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}

// Enable static rendering
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
