const db = require("../database/dbConfig");

module.exports = {
  getList
};

function getList() {
  return db("todos");
}
