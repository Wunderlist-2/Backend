require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  name: process.env.NAME,
  node_env: process.env.NODE_ENV,
  db_url: process.env.DATABASE_URL,
  admin_user: process.env.ADMIN_USER,
  admin_pass: process.env.ADMIN_PASS
};
