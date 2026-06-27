import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚠️  Remplace "mon-livre-de-recettes" par le nom exact de ton dépôt GitHub.
// Exemple : si ton repo s'appelle "recettes-famille", mets "/recettes-famille/"
const REPO_NAME = "livre-recettes";

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
