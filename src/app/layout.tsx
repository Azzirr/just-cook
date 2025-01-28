import { ReactNode } from "react";
import { Metadata } from "next";
import "./globals.css";
import { useLocale } from "next-intl";

export const metadata: Metadata = {
  title: "Just Cook",
  description: "Make cooking simple as breathing",
};

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through
export default function RootLayout({ children }: Props) {
  const locale = useLocale();

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
