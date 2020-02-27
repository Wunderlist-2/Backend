const express = require("express");
const session = require("express-session");
// const { name, secret, secure } = require("../config");
const helmet = require("helmet");
const cors = require("cors");

const logger = require("./logger");

const sessionConfig = {
  name: "giraffe",
  secret: "one times one never equals two",
  cookie: {
    maxAge: 1000 * 60 * 60, //60 minutes
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false //GDPR laws against setting cookies auto
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
  server.use(logger);
};
