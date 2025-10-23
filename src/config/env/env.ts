import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.union([z.undefined(), z.enum(["development", "production"])]),
    POSTGRES_HOST: z.union([z.undefined(), z.string()]),
    POSTGRES_PORT: z
        .string()
        .regex(/^[0-9]+$/)
        .transform((value) => parseInt(value)),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    APP_PORT: z.union([
        z.undefined(),
        z
            .string()
            .regex(/^[0-9]+$/)
            .transform((value) => parseInt(value)),
    ]),
    DATABASE_URL: z.string().optional(),
    WB_TARIFFS_URL: z.string().url(),
    WB_API_TOKEN: z.string().optional(),
    GOOGLE_SA_KEY_FILE: z.string(),
    SPREADSHEET_IDS: z.string().default(""),
    SHEET_NAME: z.string().default("stocks_coefs"),
    TIMEZONE: z.string().default("Europe/Moscow"),
});

const env = envSchema.parse(process.env);

export default env;
