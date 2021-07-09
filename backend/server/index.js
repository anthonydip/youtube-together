require('dotenv').config();
const mysql = require('mysql2');
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

// MySQL connection
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

// Connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  let createUsers = `create table if not exists users(id int primary key auto_increment,
                                                      email varchar(255) not null,
                                                      username varchar(255) not null,
                                                      password varchar(255) not null
                    )`;

  // Create the users table if does not exist
  connection.query(createUsers, function(err, results, fields) {
    if(err) {
      console.log(err.message);
    }
  });

  console.log("Connected to the MySQL server.");
});

// Socket IO Connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // On video submission from a socket
  socket.on("submit", (videoCode) => {
    console.log("video code: " + videoCode);

    // Emit submitted video to connected sockets
    io.emit("submit", videoCode);
  });

  // On play event from a socket
  socket.on("play", (msg) => {
    console.log(msg);

    io.emit("play");
  });

  // On pause event from a socket
  socket.on("pause", (msg) => {
    console.log(msg);

    io.emit("pause");
  });

  // On skip event from a socket
  socket.on("skip", (newValue, timeInVideo) => {
    console.log("thumb: " + newValue);
    console.log("timeinvideo: " + timeInVideo);

    io.emit("skip", newValue, timeInVideo);
  });

  // On socket disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // MySQL user sign up
  
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));