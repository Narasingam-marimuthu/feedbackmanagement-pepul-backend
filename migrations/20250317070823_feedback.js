/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("feedback", function (table) {
    table.increments("id").primary();
    table.string("title", 100).notNullable();
    table.string("platform").notNullable().comment("1=android,2=ios,3=web");
    table
      .integer("module")
      .notNullable()
      .comment("1=Channel,2=Project,3=Task,4=Chat,5=Alert");
    table.string("description", 500).notNullable();
    table.string("attachment").nullable();
    table.string("tags").notNullable();
    table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
    table.dateTime("deleted_at").nullable().defaultTo(null);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTableIfExists("feedback");
};
