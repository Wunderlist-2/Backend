const express = require("express");
const { name, secret, secure } = require("../config");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const logger = require("./logger");

const sessionConfig = {
  name: name,
  secret: secret,
  cookie: {
    maxAge: 1000 * 60 * 60, //60 minutes
    secure: secure,
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
