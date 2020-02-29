const cleaner = require("knex-cleaner");
var options = {
  mode: "delete", // Valid options 'truncate', 'delete'
  restartIdentity: true, // Used to tell PostgresSQL to reset the ID counter
  ignoreTables: ["knex_migrations", "knex_migrations_lock"]
};

exports.seed = function(knex) {
  return cleaner.clean(knex, options);
};
