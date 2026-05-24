import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages: rikorizky.github.io/tourmariposas/
// Vercel & local dev: served from root (/)
const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? "/tourmariposas/" : "/",
});