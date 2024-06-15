const {
  User,
  Berita,
  Kategori,
  Kegiatan,
  Organisasi,
  Mahasiswa,
  Notifikasi,
} = require("../../models/index");
let nanoid;
(async () => {
  nanoid = (await import("nanoid")).nanoid;
})();
const bcrypt = require("bcrypt");

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
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[date.getMonth()]; // January is 0!
      const year = date.getFullYear();

      return day + " " + month + " " + year;
    }
    const pengguna = await User.findByPk(req.userId);
    const beritas = await Berita.findAll({
      include: [
        {
          model: Kategori,
          attributes: ["namaKategori"],
        },
      ],
    });
    res.render("admfti/news", {
      accessToken: req.cookies.accessToken,
      pengguna,
      beritas,
      formatDate,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.tambahinformasi = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const kategoris = await Kategori.findAll();
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
    const today = new Date();

    await Berita.create({
      idNews: "B" + nanoid(7),
      judul: judul,
      idKategori: kategori,
      isi_berita: isi_berita,
      gambar: gambar,
      penulis: penulis,
      tanggalPengajuan: tanggalPengajuan,
      status: "Y",
      tanggalPublish: today,
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

exports.organization = async (req, res) => {
  try {
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[date.getMonth()]; // January is 0!
      const year = date.getFullYear();

      return day + " " + month + " " + year;
    }
    const pengguna = await User.findByPk(req.userId);
    const org = await Organisasi.findAll();
    res.render("admfti/organization", {
      accessToken: req.cookies.accessToken,
      pengguna,
      org,
      formatDate,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.kegiatan = async (req, res) => {
  try {
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();

      return day + " " + month + " " + year;
    }
    const pengguna = await User.findByPk(req.userId);
    const kegiatan = await Kegiatan.findAll();
    res.render("admfti/kegiatan", {
      accessToken: req.cookies.accessToken,
      pengguna,
      kegiatan,
      formatDate,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.user = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Mahasiswa,
        },
      ],
    });
    res.render("admfti/user", {
      accessToken: req.cookies.accessToken,
      users,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.hapusUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const hapusUsers = await User.findOne({ where: { userId } });
    if (!hapusUsers) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    await hapusUsers.destroy();
    res.redirect("/user");
  } catch (error) {
    console.error("Error saat hapus User:", error);
    return res.status(500).json({ message: "Kesalahan Server" });
  }
};

exports.regisUser = async (req, res) => {
  try {
    res.render("admfti/tambahUser", {
      accessToken: req.cookies.accessToken,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.tambahUser = async (req, res) => {
  const { nim, password, passwordLagi, role } = req.body;

  if (password !== passwordLagi) {
    return res.status(400).json({ msg: "Konfirmasi password tidak sesuai" });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    await Mahasiswa.create({
      nim: nim,
    });
    await User.create({
      userId: "U" + nanoid(7),
      nim: nim,
      password: hashPass,
      role: role,
    });

    res.json({ msg: "Registrasi berhasil" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Registrasi gagal, coba lagi nanti" });
  }
};

exports.accKegiatan = async (req, res) => {
  try {
    const idKegiatan = req.params.idKegiatan;
    const kegiatan = await Kegiatan.findOne({ where: { idKegiatan } });
    if (!kegiatan) {
      return res.status(404).json({ message: "Kegiatan tidak ditemukan" });
    }
    await kegiatan.update({ status: "Y" });
    const userId = kegiatan.userId;

    const newNotification = await Notifikasi.create({
      idNotif: "N" + nanoid(7),
      judul: "Pengajuan Disetujui!",
      tanggal: new Date(),
      status: "N",
      isi: `Pengajuan Kegiatan ${kegiatan.namaKegiatan} telah disetujui`,
      userId: userId,
    });

    const io = req.app.get("io");
    io.to(userId).emit("kegiatan_setuju", {
      message: `Pengajuan Kegiatan ${kegiatan.namaKegiatan} Disetujui!`,
    });

    res.redirect("/kegiatan");
  } catch (error) {
    console.error("Error saat acc Kegiatan:", error);
    return res.status(500).json({ message: "Kesalahan Server" });
  }
};

exports.tolakKegiatan = async (req, res) => {
  try {
    const idKegiatan = req.params.idKegiatan;
    const kegiatan = await Kegiatan.findOne({ where: { idKegiatan } });
    if (!kegiatan) {
      return res.status(404).json({ message: "Kegiatan tidak ditemukan" });
    }
    await kegiatan.update({ status: "N" });
    const userId = kegiatan.userId;

    const newNotification = await Notifikasi.create({
      idNotif: "N" + nanoid(7),
      judul: "Pengajuan Ditolak!",
      tanggal: new Date(),
      status: "N",
      isi: `Pengajuan Kegiatan ${kegiatan.namaKegiatan} ditolak`,
      userId: userId,
    });

    const io = req.app.get("io");
    io.to(userId).emit("kegiatan_ditolak", {
      message: `Pengajuan Kegiatan ${kegiatan.namaKegiatan} Ditolak!`,
    });

    res.redirect("/kegiatan");
  } catch (error) {
    console.error("Error saat acc Kegiatan:", error);
    return res.status(500).json({ message: "Kesalahan Server" });
  }
};

exports.approveBerita = async (req, res) => {
  try {
    const beritaId = req.params.idNews;
    const berita = await Berita.findByPk(beritaId);

    if (!berita) {
      return res.status(404).json({ message: "Publikasi tidak ditemukan" });
    }

    await berita.update({ status: "Y" });
    const userId = berita.userId;

    const newNotification = await Notifikasi.create({
      idNotif: "N" + nanoid(7),
      judul: "Pengajuan disetujui!",
      tanggal: new Date(),
      status: "N",
      isi: `Pengajuan berita ${berita.namaberita} disetujui`,
      userId: userId,
    });

    const io = req.app.get("io");
    io.to(userId).emit("berita_disetujui", {
      message: `Pengajuan publikasi dengan judul "${berita.judul}" disetujui!`,
    });

    res.redirect("/news");
  } catch (error) {
    console.error("Error approving berita:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.rejectBerita = async (req, res) => {
  try {
    const beritaId = req.params.idNews;
    const berita = await Berita.findByPk(beritaId);

    if (!berita) {
      return res.status(404).json({ message: "Publikasi tidak ditemukan" });
    }

    await berita.update({ status: "N" });
    const userId = berita.userId;

    const newNotification = await Notifikasi.create({
      idNotif: "N" + nanoid(7),
      judul: "Pengajuan Ditolak!",
      tanggal: new Date(),
      status: "N",
      isi: `Pengajuan publikasi dengan judul "${berita.judul}" ditolak`,
      userId: userId,
    });

    const io = req.app.get("io");
    io.to(userId).emit("berita_ditolak", {
      message: `Pengajuan publikasi dengan judul "${berita.judul}" ditolak!`,
    });

    res.redirect("/news");
  } catch (error) {
    console.error("Error rejecting berita:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.accOrg = async (req, res) => {
  try {
    const idOrga = req.params.idOrga;
    const org = await Organisasi.findByPk(idOrga);
    if (!org) {
      return res.status(404).json({ message: "Organisasi tidak ditemukan" });
    }
    await org.update({ status: "Y" });
    const userId = org.userId;

    const newNotification = await Notifikasi.create({
      idNotif: "N" + nanoid(7),
      judul: "Pengajuan Disetujui!",
      tanggal: new Date(),
      status: "N",
      isi: `Pengajuan Organisasi ${org.namaOrga} telah disetujui`,
      userId: userId,
    });

    const io = req.app.get("io");
    io.to(userId).emit("organisasi_setuju", {
      message: `Pengajuan Organisasi dengan nama "${org.namaOrga}" Disetujui!`,
    });

    res.redirect("/organization");
  } catch (error) {
    console.error("Error saat acc Organisasi:", error);
    return res.status(500).json({ message: "Kesalahan Server" });
  }
};

exports.tolakOrg = async (req, res) => {
  try {
    const idOrga = req.params.idOrga;
    const org = await Organisasi.findByPk(idOrga);
    if (!org) {
      return res.status(404).json({ message: "Organisasi tidak ditemukan" });
    }
    await org.update({ status: "N" });
    const userId = org.userId;

    const newNotification = await Notifikasi.create({
      idNotif: "N" + nanoid(7),
      judul: "Pengajuan Ditolak!",
      tanggal: new Date(),
      status: "N",
      isi: `Pengajuan Organisasi ${org.namaOrga} ditolak`,
      userId: userId,
    });

    const io = req.app.get("io");
    io.to(userId).emit("organisasi_ditolak", {
      message: `Pengajuan Organisasi dengan nama "${org.namaOrga}" Ditolak!`,
    });

    res.redirect("/organization");
  } catch (error) {
    console.error("Error saat acc Organisasi:", error);
    return res.status(500).json({ message: "Kesalahan Server" });
  }
};
