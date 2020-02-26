const restricted = (req, res, next) => {
  if (req.session && req.session.user)
    if (req.params.id) {
      if (req.session.user.id == req.params.id)
        //the user logged in can only operate on their own account (delete, access content)
        next();
      else
        res.status(402).json({
          message: "You do not have priviledge to access or edit this user."
        });
    } else next();
  else res.status(401).json({ message: "Invalid Credentials" });
};

module.exports = restricted;
