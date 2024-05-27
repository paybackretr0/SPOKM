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
