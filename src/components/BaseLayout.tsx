import { ReactNode } from "react";
import { Roboto } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import TopNavigation from "@/components/TopNavigation/TopNavigation";
import BottomNavigation from "@/components/BottomNavigation/BottomNavigation";

import { Locale } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  locale: Locale;
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const BaseLayout = ({ children, locale }: Props) => {
  return (
    <html lang={locale}>
      <body
        className={`antialiased ${roboto.className} flex min-h-screen flex-col`}
      >
        <TopNavigation />
        <div className="flex grow flex-col">{children}</div>
        <BottomNavigation />
        <Toaster />
      </body>
    </html>
  );
};
