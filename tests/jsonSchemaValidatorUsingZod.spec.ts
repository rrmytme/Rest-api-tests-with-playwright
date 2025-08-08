// tests/jsonPlaceholderWithSchema.spec.ts
import { test, expect } from "@playwright/test";
import { postSchema } from "../schemas/postSchema";

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "config", ".env") });

const BASE_URL = process.env.BASE_URL;

test.describe("JSONPlaceholder API with schema validation", () => {
  test("Validate post schema for GET /posts/1", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const result = postSchema.safeParse(body);

    expect(result.success).toBe(true);
    if (!result.success) {
      console.error(result.error.format());
    }
  });

  test("Validate schema for list of posts", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    expect(response.status()).toBe(200);

    const posts = await response.json();
    for (const post of posts.slice(0, 5)) {
      const result = postSchema.safeParse(post);
      expect(result.success).toBe(true);
    }
  });
});
