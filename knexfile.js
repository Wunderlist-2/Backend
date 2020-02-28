// module.exports = {
//   development: {
//     client: "sqlite3",
//     connection: { filename: "./database/usersPG" },
//     useNullAsDefault: true,
//     migrations: {
//       directory: "./database/migrations"
//     },
//     seeds: { directory: "./database/seeds" }
//   },
//   testing: {
//     client: "sqlite3",
//     connection: {
//       filename: "./database/test.db3"
//     },
//     useNullAsDefault: true,
//     migrations: {
//       directory: "./database/migrations"
//     },
//     seeds: {
//       directory: "./database/seeds"
//     }
//   }
// };

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
    },
    production: {
      client: "pg",
      connection: db_url,
      migrations: {
        directory: "./db/migrations"
      },
      seeds: { directory: "./db/seeds" }
    }
  }
};
