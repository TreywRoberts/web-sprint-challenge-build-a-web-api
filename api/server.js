const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(express.json())

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)


server.use((err, req, res, next) => {
    res.status(500).json({
      message: err.message, // DEV
      stack: err.stack, // DEV
      custom: 'something went terrible in general', // PRODUCTION
    })
  })

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
