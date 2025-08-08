// utils/openApiValidator.ts
import { createValidator } from "playwright-ajv-schema-validator";

export const validator = createValidator({
  schemaFilePath: "./schemas/openapi.json",
  apiBaseUrl: "https://jsonplaceholder.typicode.com",
});
