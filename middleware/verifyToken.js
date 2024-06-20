const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { User, Mahasiswa } = require("../models/index");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.redirect("/login");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.json({ msg: "Session telah Habis" });

    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.userNim = decoded.nim;
    next();
  });
};
