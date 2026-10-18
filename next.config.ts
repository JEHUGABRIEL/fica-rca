import type { NextConfig } from "next";
import { redirectionsWordPress } from "./src/lib/redirections";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
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
