// tests/posts.test.ts
import { test, expect } from "@playwright/test";
import { validator } from "../utils/openApiValidator";

test("GET /posts/1 matches OpenAPI schema", async ({ request }) => {
  const response = await request.get("/posts/1");
  expect(response.status()).toBe(200);

  const body = await response.json();
  const validationResult = validator.validateResponse(
    "/posts/{id}",
    "get",
    response.status(),
    body
  );

  expect(validationResult.valid).toBe(true);
  if (!validationResult.valid) {
    console.error(validationResult.errors);
  }
});
