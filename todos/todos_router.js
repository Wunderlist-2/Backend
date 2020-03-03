const router = require("express").Router();
const TodosDb = require("./todos_model");
const {
  adminOnly,
  restrictedItem,
  isSignedIn
} = require("../auth/auth_middleware");

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
    const recurring = await TodosDb.getRecurring(id);
    res.status(200).json({ ...listItem, recurring });
  } catch (err) {
    res.status(500).json({
      message: "could not retrieve Wunderlist item at specified id",
      error: err.message
    });
  }
});

router.post("/", isSignedIn, verifyNewItem, async (req, res) => {
  try {
    const newItem = {
      ...req.body,
      date_completed: req.body.date_completed
        ? req.body.date_completed
        : req.body.completed
        ? new Date()
        : null
    };
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

  try {
    const preUpdate = await TodosDb.getItemById(id);
    const changes = {
      ...req.body,
      date_completed: req.body.date_completed
        ? req.body.date_completed
        : req.body.completed
        ? !preUpdate.completed
          ? new Date()
          : preUpdate.date_completed
        : null
    };
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
  if (newItem.title && (newItem.user_id || newItem.user_id === 0)) next();
  else res.status(403).json({ message: "title and user_id fields required" });
}

module.exports = router;
