const express = require("express");
const configureMiddleware = require("./server-middleware");

const authenticate = require("../auth/auth_middleware");
const usersRouter = require("../users/users_router");
const todosRouter = require("../todos/todos_router");

const server = express();
configureMiddleware(server);

// server.use("/api/auth", authRouter);
server.use(
  "/api/users",
  // authenticate,
  usersRouter
);
server.use(
  "/api/myList",
  // authenticate,
  todosRouter
);

server.get("/", (req, res) => {
  res.status(200).json({ api: "API running" });
});

module.exports = server;
