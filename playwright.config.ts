import { defineConfig } from "@playwright/test";

const LOCAL_URL = "http://127.0.0.1:4173";
const externalURL = process.env.INTIKEPRI_BASE_URL;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: externalURL ?? LOCAL_URL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  webServer: externalURL
    ? undefined
    : {
        command: "pnpm build && node tests/e2e/serve-dist.mjs",
        url: `${LOCAL_URL}/health`,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
