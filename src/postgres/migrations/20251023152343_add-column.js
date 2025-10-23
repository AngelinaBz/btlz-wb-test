/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    await knex.schema.alterTable("tariffs", (table) => {
        table.decimal("base", 10, 4).notNullable().defaultTo(0);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    await knex.schema.alterTable("tariffs", (table) => {
        table.dropColumn("base");
    });
}
