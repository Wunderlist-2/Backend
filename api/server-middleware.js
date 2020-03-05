const express = require('express')
const session = require('express-session')
const { name, secret, node_env } = require('../config')
const helmet = require('helmet')
const cors = require('cors')

const logger = require('./logger')

const sessionConfig = {
  name: name,
  secret: secret,
  proxy: node_env === 'production' ? true : false,
  cookie: {
    maxAge: 1000 * 60 * 60, //60 minute
    secure: false,
    httpOnly: node_env === 'production' ? false : true,
  },
  resave: node_env === 'production' ? true : false,
  saveUninitialized: true,
}
module.exports = server => {
  server.use(helmet())
  server.use(express.json())
  server.use(cors())
  server.use(session(sessionConfig))
  server.use(logger)
}

module.exports = server => {
  server.use(express.json())
  server.use(helmet())
  server.use(session(sessionConfig))
  // server.use(cors());
  server.use(logger)
  server.use(useCors)
  server.use(cors(corsConfig))
  server.options('*', cors(corsConfig))
}
