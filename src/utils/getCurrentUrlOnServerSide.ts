import { headers } from "next/headers";

export const getCurrentUrlOnServerSide = async () => {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";

  const locale = headersList.get("x-next-intl-locale") || "pl";

  const linkHeader = headersList.get("link") || "";

  let fullUrl = `${protocol}://${host}${headersList.get("next-url") || ""}`;

  if (linkHeader) {
    const linkRegex = new RegExp(
      `<(http[^>]+/${locale}/[^>]+)>; rel="alternate"; hreflang="${locale}"`,
      "i",
    );
    const match = linkHeader.match(linkRegex);

    if (match && match[1]) {
      fullUrl = match[1];
    }
  }
  //leave this console.log for potential debbuging
  console.log(fullUrl);
  return fullUrl;
};
