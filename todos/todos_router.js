const router = require("express").Router();
const TodosDb = require("./todos_model");
const restricted = require("../auth/auth-middleware");

router.get("/", restricted, async (req, res) => {
  try {
    const list = await TodosDb.getList();
    res.status(201).json(list);
  } catch (err) {
    res.status(501).json({
      message: "could not retrieve Wunderlist items",
      error: err.message
    });
  }
});

module.exports = router;
