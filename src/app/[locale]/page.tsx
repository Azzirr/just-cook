import { setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import Category from "@/components/Category/Category";

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

  return <Category searchParams={{ query }} />;
};

export default Home;
