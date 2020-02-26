exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();

      users
        .string("username", 255)
        .notNullable()
        .unique();
      users.string("password", 255).notNullable();
      users.string("type", 255).defaultTo("user");
    })
    .createTable("todos", todos => {
      todos.increments();
      todos.string("title", 255).notNullable();
      todos
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      todos.dateTime("due_date", 255);
      todos.dateTime("date_completed", 255);
      todos.boolean("completed").defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("todos").dropTableIfExists("users");
};
