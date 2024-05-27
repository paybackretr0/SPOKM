const { user } = require("../../models/index");

exports.admfti = async (req, res) => {
  try {
    const pengguna = await user.findByPk(req.userId);
    res.render("admfti/dashboard", {
      accessToken: req.cookies.accessToken,
      pengguna,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.informasi = async (req, res) => {
  try {
    const user = await users.findByPk(req.userId);
    res.render("admfti/informasi", { accessToken: req.cookies.accessToken, user});
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.tambahinformasi = async (req, res) => {
  try {
    const user = await users.findByPk(req.userId);
    res.render("admfti/tambahinformasi", { accessToken: req.cookies.accessToken, user });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};