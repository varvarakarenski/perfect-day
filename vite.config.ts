import { defineConfig } from "vite";
import { resolve } from "node:path";

const root = import.meta.dirname;

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
        companies: resolve(root, "companies.html"),
        labs: resolve(root, "labs.html"),
        clubsAndTeams: resolve(root, "clubs-and-teams.html"),
      },
    },
  },
});
