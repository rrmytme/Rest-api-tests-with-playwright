// tests/jsonPlaceholder.spec.ts
import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "config", ".env") });

const BASE_URL = process.env.BASE_URL;

test.describe("JSONPlaceholder CRUD API Tests", () => {
  let createdPostId: number;

  test("Create a new post", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/posts`, {
      data: {
        title: "Playwright Test",
        body: "This is a test post",
        userId: 1,
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe("Playwright Test");
    createdPostId = body.id;
  });

  test("Read a post by ID", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(1);
  });

  test("Update a post", async ({ request }) => {
    const response = await request.put(`${BASE_URL}/posts/1`, {
      data: {
        id: 1,
        title: "Updated Title",
        body: "Updated body content",
        userId: 1,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toBe("Updated Title");
  });

  test("Delete a post", async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/1`);
    expect(response.status()).toBe(200);
  });
});
