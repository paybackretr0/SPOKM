const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token == null) return res.redirect("/login");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.json({ msg: "Session telah Habis" });
    req.nim = decoded.nim;
    next();
  });
};
