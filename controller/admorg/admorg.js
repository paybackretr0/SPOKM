exports.admorg = async (req, res) => {
  try {
    res.render("admorg", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};
