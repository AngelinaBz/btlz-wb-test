import knex, { migrate, seed } from "#postgres/knex.js";
import { scheduleJobs } from "#utils/scheduler.js";

await migrate.latest();
await seed.run();
scheduleJobs();

console.log("All migrations and seeds have been run");