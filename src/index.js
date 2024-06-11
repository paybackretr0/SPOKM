const express = require("express");
const dotenv = require("dotenv").config();
const http = require("http");
const router = require("../routes/page");
const cookieParser = require("cookie-parser");
const socketio = require("socket.io");
const chat = require("../controller/socket");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 3000;
const server = http.createServer(app);
const io = socketio(server);
const upload = require("../middleware/uploadgambar");

app.set("view engine", "ejs");

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("joinRoom", (role) => {
    if (role === "adminfti" || role === "adminorg" || role === "mhs") {
      socket.join(role);
    }
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.set("io", io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use("/assets", express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use("/", router);

chat(io);

server.listen(port, () => {
  console.log(`Aplikasi jalan pada port ${port}`);
});
