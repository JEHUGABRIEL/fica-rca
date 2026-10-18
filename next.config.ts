import type { NextConfig } from "next";
import { redirectionsWordPress } from "./src/lib/redirections";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Images téléversées depuis le back-office (compte Cloudinary de la FICA).
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/sff2fy8c/image/upload/**" }],
  },
  async redirects() {
    return redirectionsWordPress();
  },
  turbopack: {
    // Évite que Turbopack remonte jusqu'au dépôt du dossier personnel.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
