const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const Swal = require("sweetalert2");
const { user } = require("../models/index");

exports.login = async (req, res) => {
  try {
    const pengguna = await user.findOne({ where: { nim: req.body.nim } });
    if (!pengguna) {
      res.status(404).json({ status: "error", msg: "Login failed" });
    }
    const match = await bcrypt.compare(req.body.password, pengguna.password);
    if (match) {
      const id = pengguna.id;
      const role = pengguna.role;
      const accessToken = jwt.sign(
        { id, nim: pengguna.nim, role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        { id, nim: pengguna.nim, role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      await user.update(
        { refresh_token: refreshToken },
        { where: { id: pengguna.id } }
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
          res.render("admfti/dashboard", { accessToken, pengguna });
          break;
        case "adminorg":
          res.render("admorg/admorg", { accessToken, pengguna });
          break;
        case "mhs":
          res.render("mhs/home", { accessToken, pengguna });
          break;
        default:
          res.status(401).json({ msg: "Invalid role" });
      }
    } else {
      res.status(401).json({ status: "error", msg: "Login failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(204).json({ msg: "NO CONTENT" });
  const pengguna = await user.findOne({
    where: { refresh_token: refreshToken },
  });
  if (!pengguna) return res.status(204).json({ msg: "NO CONTENT 2" });
  const id = pengguna.id;
  await user.update({ refresh_token: null }, { where: { id: id } });
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.redirect("/login");
};
