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

exports.verifySocketToken = (socket, next) => {
  const token = socket.handshake.query.token;
  console.log("Token received:", token);

  if (!token) {
    console.error("Token not found");
    return next(new Error("Authentication error"));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return next(new Error("Authentication error"));
    }

    console.log("Token verified, userId:", decoded.userId);
    socket.userId = decoded.userId;
    next();
  });
};
