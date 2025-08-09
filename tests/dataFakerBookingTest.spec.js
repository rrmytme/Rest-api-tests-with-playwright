const { test, expect } = require("@playwright/test");
import { generateBookingData } from "../utils/dataFaker";

test("data faker example in playwright", async ({ request }) => {
  const bookingData = generateBookingData();
  // create post api request using playwright
  const postAPIResponse = await request.post("/booking", {
    data: bookingData,
  });

  // validate status code
  console.log(await postAPIResponse.json());

  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);

  // validate api response json obj
  const postAPIResponseBody = await postAPIResponse.json();

  expect(postAPIResponseBody.booking).toHaveProperty("firstname", firstName);
  expect(postAPIResponseBody.booking).toHaveProperty("lastname", lastName);

  // validate api response nested json obj
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    checkInDate
  );
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    checkOutDate
  );
});
