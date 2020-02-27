const TodosDb = require("../todos/todos_model");

const restrictedUser = (req, res, next) => {
  if (req.session && req.session.user)
    if (req.params.id) {
      if (
        req.session.user.id == req.params.id ||
        req.session.user.type === "admin"
      )
        next();
      else
        res.status(401).json({
          message:
            "You do not have sufficient priviledges to access or edit this user."
        });
    } else if (req.session.user.type === "admin") next();
    else
      res.status(401).json({
        message:
          "You do not have sufficient priviledges to access or edit this user."
      });
  else res.status(400).json({ message: "Not logged in", isLoggedIn: false });
};

const restrictedItem = async (req, res, next) => {
  const { id } = req.params;
  const userId = await TodosDb.getUserId(id);
  if (req.session && req.session.user)
    if (id) {
      if (req.session.user.id == userId || req.session.user.type === "admin")
        next();
      else
        res.status(401).json({
          message:
            "You do not have sufficient priviledges to access or edit this item."
        });
    } else if (req.session.user.type === "admin") next();
    else
      res.status(401).json({
        message:
          "You do not have sufficient priviledges to access or edit this user."
      });
  else res.status(400).json({ message: "Not logged in", isLoggedIn: false });
};

const adminOnly = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log("inside", req.session);
    if (req.session.user.type === "admin") next();
    else
      res.status(401).json({
        message:
          "You do not have sufficient priviledges to access or edit this content."
      });
  } else {
    console.log("outside", req.session.user);
    res.status(400).json({ message: "Not logged in", isLoggedIn: false });
  }
};

module.exports = { restrictedUser, adminOnly, restrictedItem };
