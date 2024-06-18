const { Kegiatan } = require("../models/index");

exports.page = (req, res) => {
  res.render("login");
};

exports.kegiatan = async (req, res) => {
  try {
    const kegiatan = await Kegiatan.findAll({ where: { status: "Y" } });
    res.json(kegiatan);
  } catch (error) {
    console.error("Error fetching kegiatan:", error);
    res
      .status(500)
      .json({ message: "Kesalahan server saat mengambil data kegiatan" });
  }
};
