exports.admfti = async (req, res) => {
  try {
    res.render("dashboard", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};
