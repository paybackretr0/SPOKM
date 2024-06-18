const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const Swal = require("sweetalert2");
const {
  User,
  Mahasiswa,
  Organisasi,
  Kegiatan,
  Berita,
} = require("../models/index");

exports.login = async (req, res) => {
  try {
    const pengguna = await User.findOne({ where: { nim: req.body.nim } });
    if (!pengguna) {
      res.status(404).json({ status: "error", msg: "Login failed" });
    }
    const match = await bcrypt.compare(req.body.password, pengguna.password);
    if (match) {
      const userId = pengguna.userId;
      const role = pengguna.role;
      const accessToken = jwt.sign(
        { userId, nim: pengguna.nim, role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        { userId, nim: pengguna.nim, role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      await User.update(
        { refresh_token: refreshToken },
        { where: { userId: pengguna.userId } }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
      const orga = await Organisasi.findAll();
      const kegiatan = await Kegiatan.findAll();
      const berita = await Berita.findOne({
        order: [["tanggalPublish", "DESC"]],
        limit: 1,
      });
      switch (role) {
        case "adminfti":
          res.render("admfti/dashboard", {
            accessToken,
            pengguna,
            orga,
            kegiatan,
          });
          break;
        case "adminorg":
          res.render("admorg/organisasi", {
            accessToken,
            pengguna,
            orga,
            kegiatan,
            berita,
          });
          break;
        case "mhs":
          res.render("mhs/home", {
            accessToken,
            pengguna,
            mhs,
            orga,
            kegiatan,
            berita,
          });
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
  const pengguna = await User.findOne({
    where: { refresh_token: refreshToken },
  });
  if (!pengguna) return res.status(204).json({ msg: "NO CONTENT 2" });
  const userId = pengguna.userId;
  await User.update({ refresh_token: null }, { where: { userId: userId } });
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.redirect("/login");
};
