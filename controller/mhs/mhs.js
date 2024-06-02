const { user } = require("../../models/index");

exports.home = async (req, res) => {
  try {
    const pengguna = await user.findByPk(req.userId);
    res.render("mhs/home", { accessToken: req.cookies.accessToken, pengguna });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.berita = async (req, res) => {
  try {
    res.render("mhs/berita", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.org = async (req, res) => {
  try {
    res.render("mhs/org", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.daftar = async (req, res) => {
  try {
    res.render("mhs/daftar", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.room = async (req, res) => {
  try {
    const pengguna = await user.findByPk(req.userId);
    res.render("mhs/room", { accessToken: req.cookies.accessToken, pengguna });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.chat = async (req, res) => {
  try {
    res.render("mhs/chat", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.profil = async (req, res) => {
  try {
    const pengguna = await user.findByPk(req.userId);
    res.render("profil", { accessToken: req.cookies.accessToken, pengguna });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};
