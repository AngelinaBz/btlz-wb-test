import { google } from "googleapis";
import knex from "#postgres/knex.js";
import env from "#config/env/env.js";
import fs from "fs";

const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(fs.readFileSync(env.GOOGLE_SA_KEY_FILE, "utf-8")),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

export async function updateSheets() {
    const tariffs = await knex("tariffs").where("date", new Date().toISOString().split("T")[0]).orderBy("coefficient", "asc");

    if (!tariffs.length) {
        console.log("No tariffs found");
        return;
    }

    const values = tariffs.map((t) => [t.warehouse, t.delivery_type, t.coefficient, t.base]);
    const spreadsheetIds = env.SPREADSHEET_IDS.split(",").filter(Boolean);

    for (const id of spreadsheetIds) {
        try {
            await sheets.spreadsheets.values.clear({ spreadsheetId: id, range: env.SHEET_NAME });
            await sheets.spreadsheets.values.update({
                spreadsheetId: id,
                range: `${env.SHEET_NAME}!A2`,
                valueInputOption: "RAW",
                requestBody: { values },
            });

            console.log(`Updated spreadsheet ${id}`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Failed to update spreadsheet:", err.message);
            } else {
                console.error("Failed to update spreadsheet:", err);
            }
        }
    }
}
