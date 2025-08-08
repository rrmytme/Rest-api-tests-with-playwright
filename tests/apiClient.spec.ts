// tests/item-api.spec.ts
import { test, expect } from "@playwright/test";
import { ApiClient } from "../utils/apiClient";

test.describe("Item API Tests", () => {
  let client: ApiClient;
  let itemId: number;

  test.beforeEach(({ request }) => {
    client = new ApiClient(request, "/items");
  });

  test("Create and retrieve item", async () => {
    const res = await client.create({ name: "Test Item", price: 50 });
    expect(res.status()).toBe(201);
    const body = await res.json();
    itemId = body.id;

    const getRes = await client.getById(itemId);
    expect(getRes.status()).toBe(200);
    const item = await getRes.json();
    expect(item.name).toBe("Test Item");
  });

  // Add more tests using client.update, client.patch, client.delete...
  test("Update item", async () => {
    const updateData = { name: "Updated Item", price: 75 };
    const res = await client.update(itemId, updateData);
    expect(res.status()).toBe(200);
    const getRes = await client.getById(itemId);
    expect(getRes.status()).toBe(200);
    const item = await getRes.json();
    expect(item.name).toBe("Updated Item");
    expect(item.price).toBe(75);
  });

  test("Delete item", async () => {
    const res = await client.delete(itemId);
    expect(res.status()).toBe(204);
    const getRes = await client.getById(itemId);
    expect(getRes.status()).toBe(404);
    const body = await getRes.json();
    expect(body.message).toBe("Item not found");
  });

  test("Get all items", async () => {
    const res = await client.getAll();
    expect(res.status()).toBe(200);
    const items = await res.json();
    expect(Array.isArray(items)).toBe(true);
  });

  test("Patch item", async () => {
    const patchData = { price: 100 };
    const res = await client.patch(itemId, patchData);
    expect(res.status()).toBe(200);
    const getRes = await client.getById(itemId);
    expect(getRes.status()).toBe(200);
    const item = await getRes.json();
    expect(item.price).toBe(100);
  });

  test("Get non-existent item", async () => {
    const res = await client.getById(9999); // Assuming 9999 does not exist
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body.message).toBe("Item not found");
  });

  test("Create item with invalid data", async () => {
    const res = await client.create({ name: "", price: -10 });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toBe("Invalid item data");
  });

  test("Update non-existent item", async () => {
    const res = await client.update(9999, { name: "Non-existent Item" });
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body.message).toBe("Item not found");
  });

  test("Delete non-existent item", async () => {
    const res = await client.delete(9999);
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body.message).toBe("Item not found");
  });

  test("Get all items when empty", async () => {
    const res = await client.getAll();
    expect(res.status()).toBe(200);
    const items = await res.json();
    expect(items).toEqual([]);
  });

  test("Patch non-existent item", async () => {
    const res = await client.patch(9999, { price: 50 });
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body.message).toBe("Item not found");
  });

  test("Create item with missing fields", async () => {
    const res = await client.create({ price: 20 }); // Missing name
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toBe("Invalid item data");
  });

  test("Get item with invalid ID", async () => {
    const res = await client.getById(-1); // Assuming negative IDs are invalid
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toBe("Invalid item ID");
  });

  test("Update item with invalid data", async () => {
    const res = await client.update(itemId, { name: "", price: -20 });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toBe("Invalid item data");
  });

  test("Patch item with invalid data", async () => {
    const res = await client.patch(itemId, { price: -30 });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toBe("Invalid item data");
  });

  test("Delete item with invalid ID", async () => {
    const res = await client.delete(-1); // Assuming negative IDs are invalid
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toBe("Invalid item ID");
  });

  test("Get all items with pagination", async () => {
    const res = await client.getAll();
    expect(res.status()).toBe(200);
    const items = await res.json();
    expect(Array.isArray(items)).toBe(true);
    // Assuming the API supports pagination, you can add checks for pagination here
  });

  test("Get item with special characters in name", async () => {
    const specialItem = { name: "Item with @special#chars!", price: 30 };
    const createRes = await client.create(specialItem);
    expect(createRes.status()).toBe(201);
    const body = await createRes.json();
    const specialItemId = body.id;

    const getRes = await client.getById(specialItemId);
    expect(getRes.status()).toBe(200);
    const item = await getRes.json();
    expect(item.name).toBe(specialItem.name);
  });

  test("Create item with large data", async () => {
    const largeData = {
      name: "Large Item",
      price: 100,
      description: "A".repeat(1000),
    };
    const res = await client.create(largeData);
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.name).toBe(largeData.name);
    expect(body.description.length).toBe(1000);
  });

  test("Get item with large data", async () => {
    const largeData = {
      name: "Large Item",
      price: 100,
      description: "B".repeat(1000),
    };
    const createRes = await client.create(largeData);
    expect(createRes.status()).toBe(201);
    const body = await createRes.json();
    const largeItemId = body.id;

    const getRes = await client.getById(largeItemId);
    expect(getRes.status()).toBe(200);
    const item = await getRes.json();
    expect(item.description.length).toBe(1000);
  });

  test("Create item with duplicate name", async () => {
    const res1 = await client.create({ name: "Duplicate Item", price: 20 });
    expect(res1.status()).toBe(201);
    const res2 = await client.create({ name: "Duplicate Item", price: 30 });
    expect(res2.status()).toBe(409); // Assuming the API returns 409 for duplicates
    const body = await res2.json();
    expect(body.message).toBe("Item with this name already exists");
  });
});
