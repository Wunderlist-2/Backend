const { db_url } = require("./config");

module.exports = {
  development: {
    client: "pg",
    connection: db_url,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: { directory: "./db/seeds" }
  },
  testing: {
    client: "pg",
    connection: db_url,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },
  staging: {
    client: "pg",
    connection: db_url,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },
  production: {
    client: "pg",
    connection: db_url,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: { directory: "./db/seeds" }
  }
};
