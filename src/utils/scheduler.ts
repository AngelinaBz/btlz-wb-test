import cron from "node-cron";

import env from "#config/env/env.js";
import { fetchTariffs } from "#services/wb-service.js";
import { updateSheets } from "#services/google-sheet-service.js";

export function scheduleJobs() {
  cron.schedule("0 * * * *", fetchTariffs, { timezone: env.TIMEZONE });
  cron.schedule("0 9 * * *", updateSheets, { timezone: env.TIMEZONE });

  console.log(`Jobs scheduled (TZ=${env.TIMEZONE})`);
}