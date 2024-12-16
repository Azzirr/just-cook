import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  // Cannot be dynamic test
  matcher: ["/", "/(en|pl)/:path*"],
};
