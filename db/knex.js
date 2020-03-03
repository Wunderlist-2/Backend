const knex = require("knex");
const { node_env } = require("../config");
const config = require("../knexfile.js");

module.exports = knex(config[node_env]);
