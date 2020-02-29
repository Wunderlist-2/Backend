const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users").insert([
    {
      id: 0,
      username: "wunderAdmin",
      password: bcrypt.hashSync("WunderLi$t", 12),
      type: "admin"
    },
    {
      id: 1,
      username: "test1",
      password: bcrypt.hashSync("test1", 12),
      type: "user"
    },
    {
      id: 2,
      username: "test2",
      password: bcrypt.hashSync("test2", 12),
      type: "user"
    },
    {
      id: 3,
      username: "test3",
      password: bcrypt.hashSync("test3", 12),
      type: "user"
    }
  ]);
};
