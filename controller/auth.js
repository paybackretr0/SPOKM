const users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const dotenv = require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const user = await users.findOne({ where: { nim: req.body.nim } });
    if (!user) {
      return res.status(404).json({ msg: "Login Gagal" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const id = user.id;
      const role = user.role; // assuming 'role' is the field in your user model
      const accessToken = jwt.sign(
        { id, nim: user.nim, role }, // include role in the JWT payload
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        { id, nim: user.nim, role }, // include role in the JWT payload
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      await users.update(
        { refresh_token: refreshToken },
        { where: { id: user.id } }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Redirect based on role
      switch (role) {
        case "adminfti":
          res.render("admfti/dashboard", { accessToken, user });
          break;
        case "adminorg":
          res.render("admorg/admorg", { accessToken, user });
          break;
        case "mhs":
          res.render("mhs/home", { accessToken, user });
          break;
        default:
          res.status(401).json({ msg: "Invalid role" });
      }
    } else {
      res.status(401).json({ msg: "Login gagal" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(204).json({ msg: "NO CONTENT" });
  const user = await users.findOne({
    where: { refresh_token: refreshToken },
  });
  if (!user) return res.status(204).json({ msg: "NO CONTENT 2" });
  const id = user.id;
  await users.update({ refresh_token: null }, { where: { id: id } });
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.redirect("/login");
};
