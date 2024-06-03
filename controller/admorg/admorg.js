const { User } = require("../../models/index");

exports.admorg = async (req, res) => {
  try {
    const users = await User.findByPk(req.userId);
    res.render("admorg/admorg", {
      accessToken: req.cookies.accessToken,
      users,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};
