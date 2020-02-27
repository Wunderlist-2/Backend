const TodosDb = require("../todos/todos_model");

const isSignedIn = (req, res, next) => {
  if (req.session && req.session.user) next();
  else res.status(400).json({ message: "Not logged in", isLoggedIn: false });
};

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
            "You do not have sufficient priviledges to perform this action."
        });
    } else if (req.session.user.type === "admin") next();
    else
      res.status(401).json({
        message:
          "You do not have sufficient priviledges to perform this action."
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
            "You do not have sufficient priviledges to perform this action."
        });
    } else if (req.session.user.type === "admin") next();
    else
      res.status(401).json({
        message:
          "You do not have sufficient priviledges to perform this action."
      });
  else res.status(400).json({ message: "Not logged in", isLoggedIn: false });
};

const adminOnly = (req, res, next) => {
  if (req.session && req.session.user) {
    if (req.session.user.type === "admin") next();
    else
      res.status(401).json({
        message:
          "You do not have sufficient priviledges to access or edit this content."
      });
  } else {
    res.status(400).json({ message: "Not logged in", isLoggedIn: false });
  }
};

module.exports = { restrictedUser, adminOnly, restrictedItem, isSignedIn };
