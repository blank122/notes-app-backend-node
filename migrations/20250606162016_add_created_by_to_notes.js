/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('notes', function (table) {
        table.integer('created_by').unsigned();
        table
            .foreign('created_by')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE'); // optional
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable('notes', function (table) {
        table.dropForeign('created_by');
        table.dropColumn('created_by');
    });
};
