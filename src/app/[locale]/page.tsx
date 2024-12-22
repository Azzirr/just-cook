import { setRequestLocale } from "next-intl/server";

import Category from "@/components/Category/Category";

import { Locale } from "@/i18n/routing";

interface HomeProps {
  params: Promise<{
    locale: Locale;
  }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

const Home = async ({ params, searchParams }: HomeProps) => {
  const { locale } = await params;

  const query = (await searchParams).query || "";

  // Enable static rendering
  setRequestLocale(locale);

  return <Category query={query} />;
};

export default Home;
