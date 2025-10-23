import env from "#config/env/env.js";
import knex from "#postgres/knex.js";
import { Tariff, WbResponse} from "#utils/types.js";
import axios from "axios";

export async function fetchTariffs(): Promise<void> {
    try {
        const today = new Date().toISOString().split("T")[0];

        const response = await axios.get<WbResponse>(env.WB_TARIFFS_URL, {
            headers: {
                Authorization: `Bearer ${env.WB_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            params: { date: today },
        });

        const warehouseList = response.data.response.data.warehouseList ?? [];

        const tariffs: Tariff[] = warehouseList.map((t) => ({
            warehouse: t.warehouseName,
            deliveryType: "box",
            coefficient: parseFloat(t.boxDeliveryCoefExpr.replace(",", ".") || "0"),
            base: parseFloat(t.boxDeliveryBase.replace(",", ".") || "0"),
            raw: t,
        }));

        for (const t of tariffs) {
            await knex("tariffs")
                .insert({
                    date: today,
                    warehouse: t.warehouse,
                    delivery_type: t.deliveryType,
                    coefficient: t.coefficient,
                    base: t.base,
                    raw: t.raw,
                    updated_at: knex.fn.now(),
                })
                .onConflict(["date", "warehouse", "delivery_type"])
                .merge();
        }

        console.log(`[${new Date().toISOString()}] Tariffs updated`);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error("Failed to fetch tariffs:", err.message, err.response?.data);
        } else if (err instanceof Error) {
            console.error("Failed to fetch tariffs:", err.message);
        } else {
            console.error("Failed to fetch tariffs:", err);
        }
    }
}
