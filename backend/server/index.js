require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;
const index = require("./routes/index");

const app = express();
app.use(index);

// Socket IO connection
const server = http.createServer(app);
const io = new Server(server);

// MongoDB connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Successfully connected to database!");
});

// on socket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // on video submitted from a socket
  socket.on("submit", (videoCode) => {
    console.log("video code: " + videoCode);

    // emit the submitted video to everyone connected
    io.emit("submit", videoCode);
  });

  // on press play from a socket
  socket.on("play", (msg) => {
    console.log(msg);

    // emit the play event
    io.emit("play");
  });

  // on press pause from a socket
  socket.on("pause", (msg) => {
    console.log(msg);

    io.emit("pause");
  });

  // on skip from a socket
  socket.on("skip", (newValue, timeInVideo) => {
    console.log("thumb: " + newValue);
    console.log("timeinvideo: " + timeInVideo);

    io.emit("skip", newValue, timeInVideo);
  });

  // on socket disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));