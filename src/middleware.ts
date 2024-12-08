import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Cant use variables here
  matcher: ["/", "/(en|pl)/:path*"],
};
