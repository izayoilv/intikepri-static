import { expect, type Page, test } from "@playwright/test";

const MAIN_ROUTES = [
  "/tentang-kami/",
  "/berita/",
  "/agenda/",
  "/galeri/",
  "/direktori/",
  "/pustaka/",
];

function collectPageErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test.describe("intikepri-static", () => {
  test("home renders without runtime errors", async ({ page }) => {
    const errors = collectPageErrors(page);
    const response = await page.goto("/");

    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/INTI Kepri/);
    await expect(
      page.getByRole("heading", { level: 1, name: /PROVINSI/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Navigasi utama" }),
    ).toBeVisible();
    expect(
      await page.getByRole("navigation").getByRole("link").count(),
    ).toBeGreaterThanOrEqual(7);
    expect(errors).toEqual([]);
  });

  test("berita list opens an article with sanitized body", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/berita/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Berita & Kegiatan" }),
    ).toBeVisible();

    await page
      .locator('main a[href^="/berita/"]:not([href="/berita/"])')
      .first()
      .click();
    await expect(page).toHaveURL(/\/berita\/[^/]+\/$/);
    await expect(page.locator("main h1")).toBeVisible();

    const article = page.locator("article");
    await expect(article).toBeVisible();
    expect((await article.innerText()).trim().length).toBeGreaterThan(0);

    expect(await page.locator("article script").count()).toBe(0);
    expect(await page.locator('article a[href^="javascript:"]').count()).toBe(
      0,
    );
    expect(errors).toEqual([]);
  });

  test("main routes render", async ({ page }) => {
    for (const route of MAIN_ROUTES) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(
        page.getByRole("navigation", { name: "Navigasi utama" }),
        route,
      ).toBeVisible();
      expect(
        (await page.locator("main").innerText()).length,
        route,
      ).toBeGreaterThan(100);
    }
  });

  test("unknown path serves the custom 404 page", async ({ page }) => {
    const response = await page.goto("/halaman-yang-tidak-ada/");

    expect(response?.status()).toBe(404);
    await expect(page.getByText("Halaman tidak ditemukan")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Kembali ke Beranda" }),
    ).toBeVisible();
  });

  test("robots.txt and sitemap.xml are served", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Sitemap:");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(sitemap.headers()["content-type"]).toContain("xml");
    expect(await sitemap.text()).toContain("<urlset");
  });
});
