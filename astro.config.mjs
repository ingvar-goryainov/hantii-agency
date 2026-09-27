// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://hantii.com",
  output: "static",
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  devToolbar: { enabled: false },
  // One page: inlining its ~20 KB of CSS saves two render-blocking requests (CSP allows inline styles).
  build: { inlineStylesheets: "always" },
  vite: {
    build: {
      // Never inline scripts: the CSP allows only same-origin script files (docs/design.md §10.3).
      // Returning undefined keeps Vite's default limit for everything else.
      assetsInlineLimit: (filePath) => (filePath.endsWith(".js") ? false : undefined),
    },
  },
});
