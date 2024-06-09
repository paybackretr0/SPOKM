const { User, Berita, Kategori } = require("../../models/index");
let nanoid;
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
    const beritas = await Berita.findAll({
      include: [
        {
          model: Kategori,
          attributes: ["namaKategori"], // replace with the actual column name in 'Kategori' table
        },
      ],
    });
    res.render("admfti/news", {
      accessToken: req.cookies.accessToken,
      pengguna,
      beritas,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.tambahinformasi = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const kategoris = await Kategori.findAll(); // Fetch all categories
    res.render("admfti/tambahNews", {
      accessToken: req.cookies.accessToken,
      pengguna,
      kategoris,
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
      idKategori: kategori,
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

exports.hapusBerita = async (req, res) => {
  try {
    const idNews = req.params.idNews;
    const hapusNews = await Berita.findOne({ where: { idNews } });
    if (!hapusNews) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }
    await hapusNews.destroy();
    res.redirect("/news");
  } catch (error) {
    console.error("Error saat hapus Berita:", error);
    return res.status(500).json({ message: "Kesalahan Server" });
  }
};

exports.editNews = async (req, res) => {
  try {
    const users = await User.findByPk(req.userId);
    const beritas = await Berita.findByPk(req.params.idNews);
    const kategoris = await Kategori.findAll();
    res.render("admfti/editNews", {
      accessToken: req.cookies.accessToken,
      users,
      beritas,
      kategoris,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.editBerita = async (req, res) => {
  try {
    const idNews = req.params.idNews;
    const { judul, kategori, isi_berita, penulis, tanggalPengajuan } = req.body;
    const gambar = req.file ? req.file.filename : null;

    console.log("Incoming data:", {
      judul,
      kategori,
      isi_berita,
      gambar,
      penulis,
      tanggalPengajuan,
    });
    console.log("idNews from params:", idNews);

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    const beritas = await Berita.findByPk(idNews);
    if (!beritas) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }

    console.log("Existing berita:", beritas.toJSON());

    const updatedBerita = {
      judul: judul !== undefined && judul !== "" ? judul : beritas.judul,
      idKategori:
        kategori !== undefined && kategori !== "" ? kategori : beritas.kategori,
      isi_berita:
        isi_berita !== undefined && isi_berita !== ""
          ? isi_berita
          : beritas.isi_berita,
      penulis:
        penulis !== undefined && penulis !== "" ? penulis : beritas.penulis,
      tanggalPengajuan:
        tanggalPengajuan !== undefined && tanggalPengajuan !== ""
          ? tanggalPengajuan
          : beritas.tanggalPengajuan,
    };

    // Hanya perbarui gambar jika ada file yang diunggah
    if (gambar !== null) {
      updatedBerita.gambar = gambar;
    }

    await beritas.update(updatedBerita);

    console.log("Updated berita:", updatedBerita);

    res.status(200).json({ message: "Berita berhasil diupdate" });
  } catch (error) {
    console.error("Error saat update Berita:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
