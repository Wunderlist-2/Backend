const router = require("express").Router();
const TodosDb = require("./todos_model");
const { adminOnly, restrictedItem } = require("../auth/auth_middleware");

router.get("/", adminOnly, async (req, res) => {
  try {
    const list = await TodosDb.getAllListItems();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({
      message: "could not retrieve Wunderlist items",
      error: err.message
    });
  }
});

router.get("/:id", restrictedItem, async (req, res) => {
  const { id } = req.params;
  try {
    const listItem = await TodosDb.getItemById(id);
    res.status(200).json(listItem);
  } catch (err) {
    res.status(500).json({
      message: "could not retrieve Wunderlist item at specified id",
      error: err.message
    });
  }
});

router.post("/", verifyNewItem, async (req, res) => {
  const newItem = req.body;
  try {
    const postedItem = await TodosDb.add(newItem);
    res.status(201).json(postedItem);
  } catch (err) {
    res.status(500).json({
      message: "could not create new todos item",
      error: err.message
    });
  }
});

router.delete("/:id", restrictedItem, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await TodosDb.remove(id);
    if (deletedItem === 0)
      res.status(400).json({ message: "could not delete item - user error" });
    else
      res.status(200).json({
        message: "Item deleted successfully",
        deleted_item: deletedItem
      });
  } catch (err) {
    res.status(500).json({
      message: "could not delete item at specified id - server error",
      error: err.message
    });
  }
});

router.put("/:id", restrictedItem, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const changedItem = await TodosDb.update(id, changes);
    if (changedItem === 0) res.status(400).json({ message: "no changes made" });
    else res.status(200).json(changedItem);
  } catch (err) {
    res.status(500).json({
      message: "could not update item at specified id",
      error: err.message
    });
  }
});

function verifyNewItem(req, res, next) {
  const newItem = req.body;
  if (newItem.title && newItem.user_id) next();
  else res.status(403).json({ message: "title and user_id fields required" });
}

module.exports = router;
