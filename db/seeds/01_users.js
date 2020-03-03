const bcrypt = require("bcryptjs");
const { admin_pass, admin_user } = require("../../config");

exports.seed = function(knex) {
  return knex("users").insert([
    {
      id: 0,
      username: admin_user,
      password: bcrypt.hashSync(admin_pass, 12),
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
