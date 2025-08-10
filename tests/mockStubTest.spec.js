import { test, expect } from "@playwright/test";

test("Stub GET /posts", async ({ page }) => {
  await page.route("**/posts", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: 1, title: "Stubbed Post 1" },
        { id: 2, title: "Stubbed Post 2" },
      ]),
    });
  });

  await page.goto("https://your-app.com/posts");
  await expect(page.locator("text=Stubbed Post 1")).toBeVisible();
});

test("Stub POST /posts", async ({ page }) => {
  await page.route("**/posts", async (route) => {
    const requestBody = await route.request().postDataJSON();
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ id: 101, ...requestBody }),
    });
  });

  await page.goto("https://your-app.com/create-post");
  await page.fill("#title", "New Stubbed Post");
  await page.click("#submit");
  await expect(page.locator("text=Post created")).toBeVisible();
});

test("Stub PUT and DELETE /posts", async ({ page }) => {
  await page.route("**/posts/1", async (route) => {
    if (route.request().method() === "PUT") {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ id: 1, title: "Updated" }),
      });
    } else if (route.request().method() === "DELETE") {
      await route.fulfill({ status: 200, body: "{}" });
    }
  });
});
