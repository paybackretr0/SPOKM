const express = require("express");
const dotenv = require("dotenv").config();
const http = require("http");
const router = require("../routes/page");
const cookieParser = require("cookie-parser");
const socketio = require("socket.io");
const chat = require("../controller/socket");

const app = express();
const server = http.createServer(app);
const port = 3000;
const io = socketio(server);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/assets", express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(router);

chat(io);

server.listen(port, () => {
  console.log(`Aplikasi jalan pada port ${port}`);
});
