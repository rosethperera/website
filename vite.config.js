import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgPagesRepo = repoName?.endsWith(".github.io");
const isCustomDomainDeploy =
  process.env.GITHUB_ACTIONS &&
  process.env.GITHUB_REPOSITORY === "rosethperera/website";
let base = "/";

if (isCustomDomainDeploy) {
  base = "/";
} else if (process.env.GITHUB_ACTIONS && repoName && !isUserOrOrgPagesRepo) {
  base = `/${repoName}/`;
}

export default defineConfig({
  base,
  plugins: [react()],
});
