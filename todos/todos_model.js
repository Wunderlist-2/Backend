const db = require("../database/dbConfig");

module.exports = {
  getAllListItems,
  getListByUserId,
  getItemById,
  getUserId
};

const checkBoolean = obj => {
  return {
    ...obj,
    completed: !!obj.completed
  };
};

//usable by admin only
function getAllListItems() {
  return db("todos").then(table => table.map(ele => checkBoolean(ele)));
}

function getListByUserId(user_id) {
  return db("todos")
    .where("todos.user_id", user_id)
    .then(table => table.map(ele => checkBoolean(ele)));
}
function getItemById(item_id) {
  return db("todos")
    .where("todos.id", item_id)
    .then(ele => checkBoolean(ele));
}

function getUserId(item_id) {
  return db("todos")
    .where("todos.id", item_id)
    .select("user_id");
}
