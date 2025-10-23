/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("tariffs", (table) => {
    table.increments("id").primary();
    table.date("date").notNullable().index();
    table.string("warehouse").notNullable();
    table.string("delivery_type").notNullable();
    table.decimal("coefficient", 10, 4).notNullable();
    table.jsonb("raw").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.unique(["date", "warehouse", "delivery_type"]);
  });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("tariffs");
}
