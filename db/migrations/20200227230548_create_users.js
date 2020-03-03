exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments("id");
      users
        .string("username")
        .notNullable()
        .unique();
      users.string("password").notNullable();
      users.string("type").defaultTo("user");
    })
    .createTable("todos", todos => {
      todos.increments("id");
      todos.string("title").notNullable();
      todos
        .integer("user_id")
        // .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      todos.timestamp("due_date");
      todos.timestamp("date_completed");
      todos.boolean("completed").defaultTo(false);
    })
    .createTable("recurring", recur => {
      recur.increments("id");
      recur
        .integer("todo_id")
        // .unsigned()
        .notNullable()
        .references("id")
        .inTable("todos")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      recur
        .boolean("sunday")
        .notNullable()
        .defaultTo(false);
      recur
        .boolean("monday")
        .notNullable()
        .defaultTo(false);
      recur
        .boolean("tuesday")
        .notNullable()
        .defaultTo(false);
      recur
        .boolean("wednesday")
        .notNullable()
        .defaultTo(false);
      recur
        .boolean("thursday")
        .notNullable()
        .defaultTo(false);
      recur
        .boolean("friday")
        .notNullable()
        .defaultTo(false);
      recur
        .boolean("saturday")
        .notNullable()
        .defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("recurring")
    .dropTableIfExists("todos")
    .dropTableIfExists("users");
};
