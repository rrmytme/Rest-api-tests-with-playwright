// utils/schemaValidator.ts
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv({ allErrors: true });

export function validateSchema<T>(
  schema: JSONSchemaType<T>,
  data: unknown
): void {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    const errors = validate.errors
      ?.map((err) => `${err.instancePath} ${err.message}`)
      .join(", ");
    throw new Error(`Schema validation failed: ${errors}`);
  }
}
