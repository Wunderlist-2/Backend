const express = require("express");
const configureMiddleware = require("./server-middleware");

const usersRouter = require("../users/users_router");
const todosRouter = require("../todos/todos_router");

const server = express();
configureMiddleware(server);

server.use("/api/users", usersRouter);
server.use("/api/todos", todosRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "API running" });
});

module.exports = server;
