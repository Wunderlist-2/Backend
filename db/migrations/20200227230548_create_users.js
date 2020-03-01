exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users
        .string("username")
        .notNullable()
        .unique();
      users.string("password").notNullable();
      users.string("type").defaultTo("user");
    })
    .createTable("todos", todos => {
      todos.increments();
      todos.string("title").notNullable();
      todos
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      todos.timestamp("due_date");
      todos.timestamp("date_completed");
      todos.boolean("completed").defaultTo(false);
      todos.string("recurring_times");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("todos").dropTableIfExists("users");
};
