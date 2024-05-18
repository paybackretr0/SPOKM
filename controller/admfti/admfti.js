const users = require("../../models/user");

exports.admfti = async (req, res) => {
  try {
    const user = await users.findByPk(req.userId);
    res.render("admfti/dashboard", {
      accessToken: req.cookies.accessToken,
      user,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};
