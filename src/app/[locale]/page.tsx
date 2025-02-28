import { setRequestLocale } from "next-intl/server";

import { Link, type Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

const HomePage = async ({ params, searchParams }: Props) => {
  const { locale } = await params;
  const { query } = await searchParams;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="mx-auto flex max-w-72 flex-col justify-center gap-3 p-4">
      <h1 className="my-4 text-center">Welcome home</h1>
      <Button asChild size="lg">
        <Link href="/categories">Categories</Link>
      </Button>
      <Button asChild size="lg">
        <Link href="/recipes">Recipes</Link>
      </Button>
    </div>
  );
};

export default HomePage;
