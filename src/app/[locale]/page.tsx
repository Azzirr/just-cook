import { setRequestLocale } from "next-intl/server";

import Category from "@/components/Category/Category";

import { Locale } from "@/i18n/routing";

const Home = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <Category />;
};

export default Home;
