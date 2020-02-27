const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  name: process.env.NAME,
  secure: process.env.SECURE
};
