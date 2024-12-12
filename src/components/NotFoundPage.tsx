import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/routing";

export const NotFoundPage = () => {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="mx-auto max-w-prose p-4 text-center">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="mt-3 text-balance text-lg">{t("description")}</p>
      <Button asChild className="mt-5">
        <Link href="/">{t("back")}</Link>
      </Button>
    </div>
  );
};
