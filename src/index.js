const express = require("express");
const dotenv = require("dotenv").config();
const db = require("../src/koneksi");
const router = require("../routes/page");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

try {
  db.authenticate();
  console.log("DB TERKNONEK");
} catch (error) {
  console.log(error);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/assets", express.static("public"));
app.use(cookieParser());
app.use(express.json());
//app.use(router);

app.get("/profil", (req, res) => {
  res.render("profil");
});

app.listen(port, () => {
  console.log(`Aplikasi jalan pada port ${port}`);
});
