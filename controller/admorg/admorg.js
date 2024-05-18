const users = require("../../models/user");

exports.admorg = async (req, res) => {
  try {
    const user = await users.findByPk(req.userId);
    res.render("admorg/admorg", { accessToken: req.cookies.accessToken, user });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};
