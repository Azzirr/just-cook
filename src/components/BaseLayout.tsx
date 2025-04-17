import { Roboto } from "next/font/google";
import { ReactNode } from "react";

import { BottomNavigation } from "@/components/BottomNavigation/BottomNavigation";
import { TopNavigation } from "@/components/TopNavigation/TopNavigation";
import { Toaster } from "@/components/ui/sonner";
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
        className={`antialiased ${roboto.className} flex min-h-screen flex-col bg-[#f8f8f8]`}
      >
        <TopNavigation />
        <div className="mx-auto flex w-full max-w-screen-xl grow flex-col">
          {children}
        </div>
        <BottomNavigation />
        <Toaster />
      </body>
    </html>
  );
};
