const bcrypt = require("bcrypt");
const users = require("../../models/user");
const { where } = require("sequelize");

exports.home = async (req, res) => {
  try {
    res.render("home", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.berita = async (req, res) => {
  try {
    res.render("berita", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.org = async (req, res) => {
  try {
    res.render("org", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.daftar = async (req, res) => {
  try {
    res.render("daftar", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.chat = async (req, res) => {
  try {
    res.render("chat", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.profil = async (req, res) => {
  try {
    res.render("profil", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};
