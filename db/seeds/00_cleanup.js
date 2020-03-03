const cleaner = require("knex-cleaner");
var options = {
  mode: "truncate", // Valid options 'truncate', 'delete'
  ignoreTables: ["knex_migrations", "knex_migrations_lock"]
};

exports.seed = function(knex) {
  return cleaner.clean(knex, options);
};
