/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tracking", function (table) {
    table.increments("id").primary();
    table.string("api_name");
    table.text("request_body");
    table.text("response_body");
    table.integer("status_code");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tracking");
};
