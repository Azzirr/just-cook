import { setRequestLocale } from "next-intl/server";

import Category from "@/components/Category/Category";
import type { Locale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

const CategoriesPage = async ({ params, searchParams }: Props) => {
  const { locale } = await params;
  const { query } = await searchParams;

  // Enable static rendering
  setRequestLocale(locale);

  return <Category query={query} />;
};

export default CategoriesPage;
