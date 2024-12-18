import { setRequestLocale } from "next-intl/server";

import Category from "@/components/Category/Category";

import { Locale } from "@/i18n/routing";

interface HomeProps {
  params: {
    locale: Locale;
  };
  searchParams: Record<string, string | undefined>;
}

const Home = async ({ params, searchParams }: HomeProps) => {
  const { locale } = params;

  const query = searchParams.query || "";

  // Enable static rendering
  setRequestLocale(locale);

  return <Category query={query} />;
};

export default Home;
