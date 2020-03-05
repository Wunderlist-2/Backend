const express = require("express");
const session = require("express-session");
const { name, secret, node_env } = require("../config");
const helmet = require("helmet");
const cors = require("cors");

const logger = require("./logger");

const sessionConfig = {
  name: name,
  secret: secret,
  cookie: {
    maxAge: 1000 * 60 * 60, //60 minute
    secure: false,
    httpOnly: true
  },
  // resave: node_env === "production" ? true : false,
  resave: false,
  saveUninitialized: false //GDPR laws against setting cookies auto
};

const corsConfig = {
  origin: /http/,
  credentials: true
};

function useCors(req, res, next) {
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Origin", "*");
}

module.exports = server => {
  server.use(express.json());
  server.use(helmet());
  server.use(session(sessionConfig));
  // server.use(cors());
  server.use(logger);
  server.use(useCors);
  server.use(cors(corsConfig));
  server.options("*", cors(corsConfig));
};
