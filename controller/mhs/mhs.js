const {
  User,
  Mahasiswa,
  Notifikasi,
  Organisasi,
  Kegiatan,
  Berita,
  Kategori,
  Komentar,
} = require("../../models/index");
let nanoid;
(async () => {
  nanoid = (await import("nanoid")).nanoid;
})();

exports.home = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    res.render("mhs/home", {
      accessToken: req.cookies.accessToken,
      mhs,
      pengguna,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.berita = async (req, res) => {
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
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    const beritas = await Berita.findAll({ where: { status: "Y" } });
    res.render("mhs/berita", {
      accessToken: req.cookies.accessToken,
      pengguna,
      mhs,
      beritas,
      formatDate,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.org = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    res.render("mhs/org", {
      accessToken: req.cookies.accessToken,
      pengguna,
      mhs,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.room = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    res.render("mhs/room", {
      accessToken: req.cookies.accessToken,
      mhs,
      pengguna,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.daftar = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    res.render("mhs/daftarorg", {
      accessToken: req.cookies.accessToken,
      pengguna,
      mhs,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.daftarOrg = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const {
      namaOrga,
      deskripsi,
      tanggalPengajuan,
      tanggalBerdiri,
      lingkupOrganisasi,
      namaKetua,
      nimKetua,
      no_wa,
      departemen,
    } = req.body;
    const logo = req.files["logo"] ? req.files["logo"][0].filename : null;
    const profilOrg = req.files["profilOrg"]
      ? req.files["profilOrg"][0].filename
      : null;
    const suratRek = req.files["suratRek"]
      ? req.files["suratRek"][0].filename
      : null;

    await Organisasi.create({
      idOrga: "O" + nanoid(7),
      namaOrga: namaOrga,
      deskripsi: deskripsi,
      tanggalPengajuan: tanggalPengajuan,
      tanggalBerdiri: tanggalBerdiri,
      lingkupOrganisasi: lingkupOrganisasi,
      namaKetua: namaKetua,
      nimKetua: nimKetua,
      no_wa: no_wa,
      departemen: departemen,
      logo: logo,
      profilOrg: profilOrg,
      suratRek: suratRek,
      status: "P",
      userId: req.userId,
    });

    const newNotification = await Notifikasi.create({
      idNotif: "N" + nanoid(7),
      judul: "Pengajuan Organisasi",
      tanggal: new Date(),
      status: "N",
      isi: `Pengajuan Organisasi ${namaOrga} oleh ${req.userId} telah diajukan`,
      userId: req.userId,
    });

    const io = req.app.get("io");
    io.to("adminfti").emit("new_organisasi", {
      message: "Pengajuan Organisasi Baru!",
      orga: {
        namaOrga,
        nama: mhs.nama || "Mahasiswa",
      },
    });

    res.status(200).json({ message: "Organisasi berhasil didaftarkan" });
  } catch (error) {
    console.error("Gagal mendaftarkan organisasi:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mendaftarkan organisasi" });
  }
};

exports.daftarkegiatan = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    res.render("mhs/daftarkgt", {
      accessToken: req.cookies.accessToken,
      mhs,
      pengguna,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.daftarkgt = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const {
      namaKegiatan,
      deskripsi,
      namaKetupel,
      nimKetupel,
      tanggalPengajuan,
      bidangKegiatan,
      lingkupKegiatan,
      tanggalMulai,
      tanggalSelesai,
      penyelenggara,
    } = req.body;
    const logo = req.files["logo"] ? req.files["logo"][0].filename : null;
    const proposal = req.files["proposal"]
      ? req.files["proposal"][0].filename
      : null;

    await Kegiatan.create({
      idKegiatan: "K" + nanoid(7),
      namaKegiatan: namaKegiatan,
      namaKetupel: namaKetupel,
      deskripsi: deskripsi,
      tanggalPengajuan: tanggalPengajuan,
      tanggalMulai: tanggalMulai,
      tanggalSelesai: tanggalSelesai,
      bidangKegiatan: bidangKegiatan,
      lingkupKegiatan: lingkupKegiatan,
      nimKetupel: nimKetupel,
      penyelenggara: penyelenggara,
      logo: logo,
      proposal: proposal,
      status: "P",
      userId: req.userId,
    });

    const newNotification = await Notifikasi.create({
      idNotif: "N" + nanoid(7),
      judul: "Pengajuan Kegiatan",
      tanggal: new Date(),
      status: "N",
      isi: `Pengajuan Kegiatan ${namaKegiatan} oleh ${req.userId} telah diajukan`,
      userId: req.userId,
    });

    const io = req.app.get("io");
    io.to("adminfti").emit("new_kegiatanMhs", {
      message: "Pengajuan Kegiatan Baru!",
      kegiatan: {
        namaKegiatan,
        nama: mhs.nama || "Mahasiswa",
      },
    });

    res.status(200).json({ message: "Kegiatan berhasil didaftarkan" });
  } catch (error) {
    console.error("Gagal mendaftarkan Kegiatan:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mendaftarkan Kegiatan" });
  }
};

exports.daftarnews = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    const kategoris = await Kategori.findAll();

    res.render("mhs/daftarnews", {
      accessToken: req.cookies.accessToken,
      mhs,
      pengguna,
      kategoris,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.daftarberita = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const { penulis, kategori, judul, isi_berita, tanggalPengajuan } = req.body;
    const gambar = req.file ? req.file.filename : null;

    if (
      !penulis ||
      !kategori ||
      !judul ||
      !isi_berita ||
      !tanggalPengajuan ||
      !gambar
    ) {
      return res.status(400).json({ message: "Semua bidang harus diisi" });
    }

    await Berita.create({
      idNews: "B" + nanoid(7),
      judul: judul,
      idKategori: kategori,
      isi_berita: isi_berita,
      gambar: gambar,
      penulis: penulis,
      tanggalPengajuan: tanggalPengajuan,
      status: "P",
      userId: req.userId,
    });

    const newNotification = await Notifikasi.create({
      idNotif: "N" + nanoid(7),
      judul: "Pengajuan Publikasi",
      tanggal: new Date(),
      status: "N",
      isi: `Pengajuan Publikasi dengan judul ${judul} oleh ${req.userId} telah diajukan`,
      userId: req.userId,
    });

    const io = req.app.get("io");
    io.to("adminfti").emit("new_berita", {
      message: "Pengajuan Publikasi Baru!",
      berita: {
        judul,
        nama: mhs.nama || "Mahasiswa",
      },
    });

    res.status(200).json({ message: "Publikasi berhasil didaftarkan" });
  } catch (error) {
    console.error("Gagal mendaftarkan publikasi:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mendaftarkan publikasi" });
  }
};

exports.chat = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    res.render("mhs/chat", { accessToken: req.cookies.accessToken, pengguna });
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
      pengguna,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.detailBerita = async (req, res) => {
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
    const userId = req.userId;
    const pengguna = await User.findOne({ where: { userId: userId } });
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    const idNews = req.params.idNews;
    const beritas = await Berita.findOne({
      where: { idNews: idNews },
      include: [
        {
          model: Kategori,
          attributes: ["namaKategori"],
        },
      ],
    });
    const komentar = await Komentar.findAll({
      where: { idNews: idNews },
    });
    res.render("mhs/detailNews", {
      accessToken: req.cookies.accessToken,
      mhs,
      beritas,
      formatDate,
      komentar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.komentar = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    const idNews = req.params.idNews;
    const beritas = await Berita.findOne({ where: { idNews: idNews } });
    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    const { komentar, namaPengirim } = req.body;
    await Komentar.create({
      idKomentar: "COM" + nanoid(5),
      idNews: req.params.idNews,
      userId: req.userId,
      komentar: komentar,
      tanggal: new Date(),
      namaPengirim: namaPengirim,
    });
    res.status(200).json({ message: "Komentar berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal Komentar:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat Komentar" });
  }
};
