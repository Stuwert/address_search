import { createConnection } from "typeorm";

import seedAddresses from "./streetAddresses";

/**
 * Right now TypeORM doesn't come with a
 * seeder, so I'm making some assumptions
 * about how this will operate.
 *
 * For example this is set up to run through each of the seed functions:
 * Each of the seed functions will be responsible for truncating
 * the corresponding table and then running seeds.
 *
 * This sort of approach would start to fail if there were a lot of
 * databases with foreign keys that relied on each other to be deleted
 * and created in the right order.
 *
 * Because this is a coding challenge, I've decided to
 */

async function runSeeds(): Promise<void> {
  const connection = await createConnection();

  await seedAddresses(connection);
  console.log("Seeding Complete");
  await connection.close();
}

runSeeds();
