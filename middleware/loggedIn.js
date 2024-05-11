const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function redirectIfLoggedIn(req, res, next) {
  const token = req.cookies.accessToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const role = decoded.role; // Extract role from JWT payload

      // Redirect based on role
      switch (role) {
        case "adminfti":
          res.redirect("/dashboard");
          break;
        case "adminorg":
          res.redirect("/admorg");
          break;
        case "mhs":
          res.redirect("/home");
          break;
        default:
          next();
      }
    } catch (err) {
      next();
    }
  } else {
    next();
  }
}

module.exports = redirectIfLoggedIn;
