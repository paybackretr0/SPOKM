const { User, Mahasiswa, Notifikasi } = require("../../models/index");

exports.home = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    res.render("mhs/home", { accessToken: req.cookies.accessToken, mhs });
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
    res.render("mhs/daftarorg", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.room = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    res.render("mhs/room", { accessToken: req.cookies.accessToken, mhs });
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
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    res.render("mhs/profil", {
      accessToken: req.cookies.accessToken,
      mhs,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.notif = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notifikasi.findAll({ where: { userId } });
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.notifikasi = async (req, res) => {
  try {
    const { judul, tanggal, isi, userId } = req.body;
    await Notifikasi.create({ judul, tanggal, isi, userId });

    io.emit(`notification_${userId}`, { isi });
    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
