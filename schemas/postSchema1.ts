// schemas/postSchema.ts
import { JSONSchemaType } from 'ajv';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const postSchema: JSONSchemaType<Post> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    body: { type: 'string' },
    userId: { type: 'number' }
  },
  required: ['id', 'title', 'body', 'userId'],
  additionalProperties: false
};
