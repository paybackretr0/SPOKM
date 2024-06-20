const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function checkRole(role) {
  return function (req, res, next) {
    try {
      const token = req.cookies.accessToken;
      if (!token) {
        return res.redirect("/login");
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userRole = decoded.role;

      if (userRole !== role) {
        return res.redirect("/");
      }
      next();
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  };
}

module.exports = checkRole;
