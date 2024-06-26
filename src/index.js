const express = require("express");
const dotenv = require("dotenv").config();
const http = require("http");
const router = require("../routes/page");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const chat = require("../controller/socket");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 3000;
const server = http.createServer(app);
const io = socketio(server);
const upload = require("../middleware/uploadFile");

app.set("view engine", "ejs");

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("joinRoom", (role) => {
    if (role === "adminfti") {
      socket.join("adminfti");
    }
  });

  socket.on("join", (userId) => {
    console.log(`User with userId ${userId} joined room`);
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

chat(io);

app.set("io", io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use("/assets", express.static("public"));
app.use(cookieParser());
app.use("/", router);

server.listen(port, () => {
  console.log(`Aplikasi jalan pada port ${port}`);
});
