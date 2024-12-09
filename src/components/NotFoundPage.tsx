import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/routing";

export const NotFoundPage = () => {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="mx-auto max-w-[60ch] p-4 text-center">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="my-2 text-balance text-xl">{t("description")}</p>
      <Button asChild className="my-3 self-center">
        <Link href="/">{t("back")}</Link>
      </Button>
    </div>
  );
};
