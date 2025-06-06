/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('notes', function (table) {
        table.increments('id').primary();
        table.string('title');
        table.text('content');
        table.timestamps(true, true); // created_at & updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('notes');
};
