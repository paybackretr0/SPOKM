const express = require("express");
const dotenv = require("dotenv").config();
const router = require("../routes/page");
const cookieParser = require("cookie-parser");
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;
const upload = require('../middleware/uploadgambar'); // Mengimpor konfigurasi multer

app.set("view engine", "ejs");

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/assets", express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Aplikasi jalan pada port ${port}`);
});
