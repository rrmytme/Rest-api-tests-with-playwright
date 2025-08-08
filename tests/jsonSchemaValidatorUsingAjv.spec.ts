// tests/api/post.test.ts
import { test, expect } from "@playwright/test";
import { validateSchema } from "../utils/schemaValidator";
import { postSchema } from "../schemas/postSchema1";

test("GET /posts/1 should match schema", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  validateSchema(postSchema, body);
});
