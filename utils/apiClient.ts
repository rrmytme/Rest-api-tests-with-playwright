// utils/apiClient.ts
import { APIRequestContext } from '@playwright/test';

export class ApiClient {
  constructor(private request: APIRequestContext, private basePath: string) {}

  async getAll() {
    return this.request.get(this.basePath);
  }

  async getById(id: number) {
    return this.request.get(`${this.basePath}/${id}`);
  }

  async create(data: any) {
    return this.request.post(this.basePath, { data });
  }

  async update(id: number, data: any) {
    return this.request.put(`${this.basePath}/${id}`, { data });
  }

  async patch(id: number, data: any) {
    return this.request.patch(`${this.basePath}/${id}`, { data });
  }

  async delete(id: number) {
    return this.request.delete(`${this.basePath}/${id}`);
  }

  async deleteAll() {
    return this.request.delete(this.basePath);
  }

  async getByName(name: string) {
    return this.request.get(`${this.basePath}?name=${encodeURIComponent(name)}`);
  }

  async getByPriceRange(min: number, max: number) {
    return this.request.get(`${this.basePath}?minPrice=${min}&maxPrice=${max}`);
  }

  async getByCategory(category: string) {
    return this.request.get(`${this.basePath}?category=${encodeURIComponent(category)}`);
  }

  async getByNameAndPrice(name: string, price: number) {
    return this.request.get(`${this.basePath}?name=${encodeURIComponent(name)}&price=${price}`);
  }
}
