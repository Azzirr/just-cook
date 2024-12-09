import { ReactNode } from "react";
import { Roboto } from "next/font/google";

import BottomNavigation from "@/components/BottomNavigation/BottomNavigation";
import TopNavigation from "@/components/TopNavigation/TopNavigation";

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
      <body className={`antialiased ${roboto.className}`}>
        <TopNavigation />
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
};
