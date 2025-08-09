// utils/dataFaker.js
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

export function generateBookingData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int({ max: 1000 });
  const depositPaid = faker.datatype.boolean();
  const additionalNeeds = faker.lorem.words(3);
  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
  const checkOutDate = DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd");

  return {
    firstname: firstName,
    lastname: lastName,
    totalprice: totalPrice,
    depositpaid: depositPaid,
    additionalneeds: additionalNeeds,
    bookingdates: {
      checkin: checkInDate,
      checkout: checkOutDate,
    },
  };
}

export function generateJsonPlaceholderTestData() {
  const title = faker.title;
  const body = faker.lorem.words(10);
  const userId = faker.number.int({ max: 1000 });

  return {
    title,
    body,
    userId,
  };
}
