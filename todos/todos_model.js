const db = require("../database/dbConfig");

module.exports = {
  getAllListItems,
  getListByUserId,
  getItemById,
  getUserId,
  add,
  remove,
  update
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
  return db("todos as t")
    .join("users as u", "t.user_id", "u.id")
    .select("t.*", "u.username")
    .where("t.user_id", user_id)
    .then(table => table.map(ele => checkBoolean(ele)));
}
function getItemById(item_id) {
  return db("todos as t")
    .join("users as u", "t.user_id", "u.id")
    .where("t.id", item_id)
    .select("t.*", "u.username")
    .then(table => table.map(ele => checkBoolean(ele)));
}

function getUserId(item_id) {
  return db("todos")
    .where("todos.id", item_id)
    .select("user_id")
    .first()
    .then(ele => ele.user_id);
}

function add(item) {
  return db("todos")
    .insert(item, "id")
    .then(ids => {
      const [id] = ids;
      return getItemById(id);
    });
}

async function remove(itemId) {
  const itemToDelete = await getItemById(itemId);
  return await db("todos")
    .where("todos.id", itemId)
    .del()
    .then(prom => {
      if (prom === 1) return itemToDelete;
      else return prom;
    });
}

function update(id, changes) {
  return db("todos")
    .where("todos.id", id)
    .update(changes)
    .then(prom => {
      if (prom > 0) return getItemById(id);
      else return prom;
    });
}
