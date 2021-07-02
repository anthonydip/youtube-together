const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = new Server(server);

// on socket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));