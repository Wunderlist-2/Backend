const express = require('express')
const session = require('express-session')
const { name, secret, node_env } = require('../config')
const helmet = require('helmet')
const cors = require('cors')

const logger = require('./logger')

const sessionConfig = {
  name: name,
  secret: secret,
  cookie: {
    maxAge: 1000 * 60 * 60, //60 minutes
    secure: node_env === 'production' ? true : false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
}

module.exports = server => {
  server.use(helmet())
  server.use(express.json())
  server.use(cors())
  server.use(session(sessionConfig))
  server.use(logger)
}
