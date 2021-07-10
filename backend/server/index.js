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
  console.log("New client connected with socket ID: " + socket.id);

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

  // MySQL validate unique user
  socket.on("check signup", (email, username, fn) => {
    let sql = `SELECT * FROM users WHERE (email = '${email}') OR (username = '${username}')`;

    connection.query(sql, function(error, results, fields) {
      console.log("TO SOCKET ID: " + socket.id);
      if(error){
        return console.error(error.message);
      }

      if(results.length === 0){
        fn("pass");
      }
      else{
        fn("fail");
      }
    });
  });

  // MySQL user sign up
  socket.on("signup", (email, username, password) => {
    console.log("Signed up with ID: " + socket.id);

    // Insert user if does not exist
    let sql = `INSERT INTO users(email, username, password)
              VALUES('${email}','${username}','${password}')`;

    connection.query(sql, function(error, results, fields) {
      if(error) {
        return console.error(error.message);
      }
        console.log("Added user");
    });
    
  });

  // On socket disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));