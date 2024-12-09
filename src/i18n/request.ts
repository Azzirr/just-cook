import { getRequestConfig } from "next-intl/server";

import { routing, isExistingLocale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const validLocale =
    locale && isExistingLocale(locale) ? locale : routing.defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
