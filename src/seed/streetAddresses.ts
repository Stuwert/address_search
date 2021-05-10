import { Connection } from "typeorm";
import StreetAddressFactory from "../../factories/streetAddress";
const addressSeeds = require("./addresses.json");

export default async function seedStreetAddresses(
  connection: Connection
): Promise<void> {
  console.log("Cleaning Addresses");
  await connection.query(`
    TRUNCATE street_addresses;
    ALTER SEQUENCE street_addresses_id_seq RESTART WITH 1

  `);

  console.log("Creating New Addresses");
  await Promise.all(
    addressSeeds.map((addressSeed: any) =>
      StreetAddressFactory.build(addressSeed).save()
    )
  );
}
