const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert([
        {
          id: 0,
          username: "admin",
          password: bcrypt.hashSync("password", 12),
          type: "admin"
        },
        { id: 1, username: "test1", password: bcrypt.hashSync("test1", 12) },
        { id: 2, username: "test2", password: bcrypt.hashSync("test2", 12) },
        { id: 3, username: "test3", password: bcrypt.hashSync("test3", 12) }
      ]);
    });
};
