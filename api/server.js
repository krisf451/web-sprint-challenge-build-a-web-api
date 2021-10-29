const express = require("express");
const server = express();

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");
server.use(express.json());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);
// Do NOT `server.listen()` inside this file!

//sanity check endpoint
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some backend stuff!!!</h2>`);
});

module.exports = server;
