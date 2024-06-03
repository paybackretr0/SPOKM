const { User, Berita } = require("../../models");
let nanoid;

// Use an IIFE (Immediately Invoked Function Expression) to import nanoid
(async () => {
  nanoid = (await import("nanoid")).nanoid;
})();
exports.admfti = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
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
    const pengguna = await User.findByPk(req.userId);
    res.render("admfti/news", {
      accessToken: req.cookies.accessToken,
      pengguna,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.tambahinformasi = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    res.render("admfti/tambahNews", {
      accessToken: req.cookies.accessToken,
      pengguna,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.createNews = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const { judul, kategori, isi_berita, penulis, tanggalPengajuan } = req.body;
    const gambar = req.file ? req.file.filename : null;

    await Berita.create({
      idNews: "B" + nanoid(7),
      judul: judul,
      kategori: kategori,
      isi_berita: isi_berita,
      gambar: gambar,
      penulis: penulis,
      tanggalPengajuan: tanggalPengajuan,
      status: "Y",
      userId: req.userId,
    });

    return res.status(200).json({ message: "Data berhasil diinput" });
  } catch (error) {
    console.error("Error saat membuat Berita:", error);
    return res.status(500).json({ message: "Kesalahan Server" });
  }
};
