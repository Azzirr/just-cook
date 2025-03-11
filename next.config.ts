import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    //TODO - delete domains, I had to use that, because without this next/image will not allow me to render images from 3rd party sites
    domains: [
      "assets.tmecosys.com",
      "www.alphafoodie.com",
      "www.allrecipes.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
