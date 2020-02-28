require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  name: process.env.NAME,
  secure: process.env.SECURE,
  node_env: process.env.NODE_ENV
};
