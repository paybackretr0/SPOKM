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
  Notifikasi,
} = require("../models/index");

exports.login = async (req, res) => {
  try {
    const pengguna = await User.findOne({ where: { nim: req.body.nim } });
    if (!pengguna) {
      return res.render("login", {
        alert: {
          type: "error",
          title: "Login failed",
          text: "Username atau Password Salah",
        },
      });
    }
    const match = await bcrypt.compare(req.body.password, pengguna.password);

    if (req.body.password === "" || req.body.nim === "") {
      return res.render("login", {
        alert: {
          type: "error",
          title: "Login failed",
          text: "Username atau Password Salah",
        },
      });
    }

    if (!match) {
      return res.render("login", {
        alert: {
          type: "error",
          title: "Login failed",
          text: "Username atau Password Salah",
        },
      });
    }
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

      function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return day + " " + month + " " + year;
      }
      const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
      const orga = await Organisasi.findAll();
      const kegiatan = await Kegiatan.findAll();
      const brt = await Berita.findAll();
      const user = await User.findAll();
      const berita = await Berita.findOne({
        order: [["tanggalPublish", "DESC"]],
        limit: 1,
      });
      const orgas = await Organisasi.count();
      const kegiatans = await Kegiatan.count();
      const beritas = await Berita.count();
      const notif = await Notifikasi.findAll({
        where: { penerima: "adminfti" },
        attributes: ["judul", "tanggal", "isi"],
        order: [["createdAt", "DESC"]],
      });
      const notifs = await Notifikasi.findAll({
        where: { penerima: pengguna.userId },
        attributes: ["judul", "tanggal", "isi"],
        order: [["createdAt", "DESC"]],
      });
      const notify = await Notifikasi.findAll({
        where: { penerima: pengguna.userId },
        attributes: ["judul", "tanggal", "isi"],
        order: [["createdAt", "DESC"]],
      });
      const org = await Organisasi.findAll({
        where: { status: "Y" },
        limit: 2,
        order: [["createdAt", "DESC"]],
      });
      const kgt = await Kegiatan.findAll({
        where: { status: "Y" },
        limit: 2,
        order: [["createdAt", "DESC"]],
      });
      switch (role) {
        case "adminfti":
          res.render("admfti/dashboard", {
            accessToken,
            pengguna,
            orgas,
            orga,
            kegiatan,
            user,
            notif,
            brt,
            formatDate,
            kegiatans,
            beritas,
          });
          break;
        case "adminorg":
          res.render("admorg/organisasi", {
            accessToken,
            pengguna,
            orga,
            kegiatan,
            berita,
            formatDate,
            notifs,
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
            formatDate,
            notify,
            org,
            kgt,
          });
          break;
        default:
          res.status(401).json({ msg: "Invalid role" });
      }
    } else {
      return res.status(401).json({ status: "error", msg: "Login failed" });
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
