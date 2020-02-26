const router = require("express").Router();
const TodosDb = require("./todos_model");
const UsersDb = require("../users/users_model");

router.get(
  "/",
  // adminOnly,
  async (req, res) => {
    try {
      const list = await TodosDb.getAllListItems();
      res.status(201).json(list);
    } catch (err) {
      res.status(501).json({
        message: "could not retrieve Wunderlist items",
        error: err.message
      });
    }
  }
);

router.get("/:id", restrictedItem, async (req, res) => {
  const { id } = req.params;
  try {
    const listItem = await TodosDb.getItemById(id);
    res.status(201).json(listItem);
  } catch (err) {
    res.status(501).json({
      message: "could not retrieve Wunderlist item at specified id",
      error: err.message
    });
  }
});

const restrictedItem = async (req, res, next) => {
  const { id } = req.params;
  const userId = await TodosDb.getUserId(id);
  if (req.session && req.session.user)
    if (id) {
      if (req.session.user.id == userId) next();
      else
        res.status(402).json({
          message: "You do not have priviledges to access or edit this item."
        });
    } else next();
  else res.status(401).json({ message: "Not logged in" });
};

module.exports = router;
