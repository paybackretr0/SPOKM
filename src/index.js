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

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("joinRoom", (role) => {
    if (role === "adminfti") {
      socket.join("adminfti");
    }
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.set("io", io);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/assets", express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use("/", router);

chat(io);

server.listen(port, () => {
  console.log(`Aplikasi jalan pada port ${port}`);
});
