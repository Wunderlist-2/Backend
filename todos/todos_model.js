const db = require("../db/knex");

module.exports = {
  getAllListItems,
  getListByUserId,
  getItemById,
  getUserId,
  add,
  remove,
  update,
  getRecurring
};

const checkBoolean = obj => {
  return {
    ...obj,
    completed: !!obj.completed
  };
};

//usable by admin only
function getAllListItems() {
  return db("todos").then(table => table.map(ele => checkBoolean(ele)) || null);
}

function getListByUserId(user_id) {
  return db("todos as t")
    .where("t.user_id", user_id)
    .then(table => table.map(ele => checkBoolean(ele)) || null);
}
function getItemById(item_id) {
  return db("todos as t")
    .where("t.id", item_id)
    .first()
    .then(item => checkBoolean(item) || null);
}

function getUserId(item_id) {
  return db("todos")
    .where("todos.id", item_id)
    .select("user_id")
    .first()
    .then(ele => ele.user_id || null);
}

async function add(item) {
  const newItem = await db("todos")
    .insert(item, "id")
    .then(ids => {
      const [id] = ids;
      return getItemById(id);
    });
  return getListByUserId(newItem.user_id || null);
}

async function remove(itemId) {
  const itemToDelete = await getItemById(itemId);
  return await db("todos")
    .where("todos.id", itemId)
    .del()
    .then(prom => getListByUserId(itemToDelete.user_id) || null);
}

async function update(id, changes) {
  const updatedItem = await db("todos")
    .where("todos.id", id)
    .update(changes)
    .then(prom => (prom > 0 ? getItemById(id) : null));
  return updatedItem.user_id ? getListByUserId(updatedItem.user_id) : null;
}

function getRecurring(item_id) {
  return db("recurring as r")
    .where("r.todo_id", item_id)
    .select(
      "r.sunday",
      "r.monday",
      "r.tuesday",
      "r.wednesday",
      "r.thursday",
      "r.friday",
      "r.saturday"
    );
}
