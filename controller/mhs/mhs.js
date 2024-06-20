const { where } = require("sequelize");
const bcrypt = require("bcrypt");
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

function isPDF(file) {
  const allowedExtensions = /(\.pdf)$/i;
  return allowedExtensions.test(file.originalname);
}

function isImage(file) {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  return allowedExtensions.test(file.originalname);
}

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

exports.home = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    const berita = await Berita.findOne({
      order: [["createdAt", "DESC"]],
      limit: 1,
    });
    const notify = await Notifikasi.findAll({
      where: { penerima: pengguna.userId },
      attributes: ["judul", "tanggal", "isi"],
      order: [["createdAt", "DESC"]],
    });
    const org = await Organisasi.findAll({
      where: { status: "Y" },
      limit: 2,
      order: [["createdAt", "DESC"]],
    });
    const kgt = await Kegiatan.findAll({
      where: { status: "Y" },
      limit: 2,
      order: [["createdAt", "DESC"]],
    });
    const kegiatan = await Kegiatan.findAll();
    res.render("mhs/home", {
      accessToken: req.cookies.accessToken,
      mhs,
      pengguna,
      berita,
      org,
      kegiatan,
      formatDate,
      notify,
      kgt,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.editProfile = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    res.render("mhs/editProfile", {
      accessToken: req.cookies.accessToken,
      mhs,
      pengguna,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { nama, email, jurusan } = req.body;
    const pengguna = await User.findByPk(req.userId);
    console.log(pengguna);
    if (!User) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    if (!mhs) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }
    const updatedUser = {
      nama: nama !== undefined && nama !== "" ? nama : pengguna.nama,
      email: email !== undefined && email !== "" ? email : pengguna.email,
      jurusan:
        jurusan !== undefined && jurusan !== "" ? jurusan : pengguna.jurusan,
    };
    await Mahasiswa.update(updatedUser, { where: { nim: mhs.nim } });
    return res.status(200).json({ message: "Data berhasil diupdate" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.changepassword = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    res.render("mhs/changepw", {
      accessToken: req.cookies.accessToken,
      pengguna,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.updatepassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Cari pengguna berdasarkan userId
    const users = await User.findByPk(req.userId);
    console.log(users);
    if (!users) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    // Periksa apakah password saat ini cocok
    const isPasswordValid = await bcrypt.compare(oldPassword, users.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password saat ini salah" });
    }

    // Enkripsi password baru
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Perbarui password pengguna di database
    await users.update({ password: hashedNewPassword });

    return res.status(200).json({ message: "Password berhasil diubah" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.berita = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    const beritas = await Berita.findAll({
      where: { status: "Y" },
      order: [["createdAt", "DESC"]],
    });
    const notify = await Notifikasi.findAll({
      where: { penerima: pengguna.userId },
      attributes: ["judul", "tanggal", "isi"],
      order: [["createdAt", "DESC"]],
    });
    res.render("mhs/berita", {
      accessToken: req.cookies.accessToken,
      pengguna,
      mhs,
      beritas,
      formatDate,
      notify,
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
    const orga = await Organisasi.findAll({
      where: { status: "Y" },
      order: [["createdAt", "DESC"]],
    });
    const notify = await Notifikasi.findAll({
      where: { penerima: pengguna.userId },
      attributes: ["judul", "tanggal", "isi"],
      order: [["createdAt", "DESC"]],
    });
    res.render("mhs/org", {
      accessToken: req.cookies.accessToken,
      pengguna,
      orga,
      mhs,
      formatDate,
      notify,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.detailOrg = async (req, res) => {
  try {
    const userId = req.userId;
    const pengguna = await User.findOne({ where: { userId: userId } });
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    const idOrga = req.params.idOrga;
    const orga = await Organisasi.findOne({ where: { idOrga: idOrga } });
    const organisasi = await Organisasi.findAll({ where: { status: "Y" } });
    const notify = await Notifikasi.findAll({
      where: { penerima: pengguna.userId },
      attributes: ["judul", "tanggal", "isi"],
      order: [["createdAt", "DESC"]],
    });
    res.render("mhs/detailorga", {
      accessToken: req.cookies.accessToken,
      mhs,
      orga,
      pengguna,
      formatDate,
      organisasi,
      notify,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
    const notify = await Notifikasi.findAll({
      where: { penerima: pengguna.userId },
      attributes: ["judul", "tanggal", "isi"],
      order: [["createdAt", "DESC"]],
    });
    res.render("mhs/daftarorg", {
      accessToken: req.cookies.accessToken,
      pengguna,
      mhs,
      formatDate,
      notify,
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
      isi: `Pengajuan Organisasi bernama "${namaOrga}" oleh ${
        mhs.nama || "Mahasiswa"
      } telah diajukan`,
      pengirim: pengguna.userId,
      penerima: "adminfti",
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
    const notify = await Notifikasi.findAll({
      where: { penerima: pengguna.userId },
      attributes: ["judul", "tanggal", "isi"],
      order: [["createdAt", "DESC"]],
    });
    res.render("mhs/daftarkgt", {
      accessToken: req.cookies.accessToken,
      mhs,
      pengguna,
      notify,
      formatDate,
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
      isi: `Pengajuan Kegiatan bernama "${namaKegiatan}" oleh ${
        mhs.nama || "Mahasiswa"
      } telah diajukan`,
      pengirim: pengguna.userId,
      penerima: "adminfti",
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
    const notify = await Notifikasi.findAll({
      where: { penerima: pengguna.userId },
      attributes: ["judul", "tanggal", "isi"],
      order: [["createdAt", "DESC"]],
    });
    res.render("mhs/daftarnews", {
      accessToken: req.cookies.accessToken,
      mhs,
      pengguna,
      kategoris,
      formatDate,
      notify,
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
      pengirim: pengguna.userId,
      penerima: "adminfti",
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
    const news = await Berita.findAll({ where: { status: "Y" } });
    const komentar = await Komentar.findAll({
      where: { idNews: idNews },
    });
    const notify = await Notifikasi.findAll({
      where: { penerima: pengguna.userId },
      attributes: ["judul", "tanggal", "isi"],
      order: [["createdAt", "DESC"]],
    });
    res.render("mhs/detailNews", {
      accessToken: req.cookies.accessToken,
      mhs,
      beritas,
      formatDate,
      komentar,
      news,
      notify,
      formatDate,
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

exports.laporKegiatan = async (req, res) => {
  try {
    const userId = req.userId;
    const pengguna = await User.findOne({ where: { userId: userId } });
    const kegiatan = await Kegiatan.findAll({
      where: { userId: userId, status: "Y" },
    });
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    if (!kegiatan) {
      return res
        .status(404)
        .json({ message: "Anda belum pernah mengajukan Kegiatan" });
    }
    const notify = await Notifikasi.findAll({
      where: { penerima: pengguna.userId },
      attributes: ["judul", "tanggal", "isi"],
      order: [["createdAt", "DESC"]],
    });
    res.render("mhs/laporKegiatan", {
      accessToken: req.cookies.accessToken,
      pengguna,
      kegiatan,
      mhs,
      formatDate,
      notify,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.laporkgt = async (req, res) => {
  try {
    const idKegiatan = req.body.idKegiatan;
    if (!idKegiatan) {
      return res.status(400).json({ message: "idKegiatan is required" });
    }
    const kegiatan = await Kegiatan.findOne({
      where: { idKegiatan: idKegiatan },
    });

    if (!kegiatan) {
      return res.status(404).json({ message: "Kegiatan not found" });
    }

    const jumlahPeserta = parseInt(req.body.jumlahPeserta);

    if (isNaN(jumlahPeserta)) {
      return res
        .status(400)
        .json({ message: "Jumlah Peserta must be a number" });
    }

    const laporanKegiatan =
      req.files["laporanKegiatan"] && isPDF(req.files["laporanKegiatan"][0])
        ? req.files["laporanKegiatan"][0].filename
        : null;
    if (!laporanKegiatan) {
      return res
        .status(400)
        .json({ message: "Laporan Kegiatan harus berupa file PDF" });
    }

    const dok1 =
      req.files["dok1"] && isImage(req.files["dok1"][0])
        ? req.files["dok1"][0].filename
        : null;
    const dok2 =
      req.files["dok2"] && isImage(req.files["dok2"][0])
        ? req.files["dok2"][0].filename
        : null;
    const dok3 =
      req.files["dok3"] && isImage(req.files["dok3"][0])
        ? req.files["dok3"][0].filename
        : null;

    if (!dok1 || !dok2 || !dok3) {
      return res
        .status(400)
        .json({ message: "Dokumentasi harus berupa file gambar" });
    }
    await Kegiatan.update(
      {
        laporanKegiatan: laporanKegiatan,
        dok1: dok1,
        dok2: dok2,
        dok3: dok3,
        jumlahPeserta: jumlahPeserta,
      },
      { where: { idKegiatan: idKegiatan } }
    );

    res.status(200).json({ message: "Laporan Kegiatan berhasil diinput" });
  } catch (error) {
    console.error("Gagal mengajukan laporan kegiatan:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengajukan laporan kegiatan" });
  }
};

exports.kegiatan = async (req, res) => {
  try {
    const userId = req.userId;
    const pengguna = await User.findOne({ where: { userId: userId } });
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    const kegiatan = await Kegiatan.findAll({ where: { status: "Y" } });
    const notify = await Notifikasi.findAll({
      where: { penerima: pengguna.userId },
      attributes: ["judul", "tanggal", "isi"],
      order: [["createdAt", "DESC"]],
    });
    res.render("mhs/activity", {
      accessToken: req.cookies.accessToken,
      pengguna,
      kegiatan,
      mhs,
      formatDate,
      notify,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.detailKgt = async (req, res) => {
  try {
    const userId = req.userId;
    const pengguna = await User.findOne({ where: { userId: userId } });
    const mhs = await Mahasiswa.findOne({ where: { nim: pengguna.nim } });
    const idKegiatan = req.params.idKegiatan;
    const kegiatan = await Kegiatan.findOne({
      where: { idKegiatan: idKegiatan },
    });
    const kegiatans = await Kegiatan.findAll();
    const notify = await Notifikasi.findAll({
      where: { penerima: pengguna.userId },
      attributes: ["judul", "tanggal", "isi"],
      order: [["createdAt", "DESC"]],
    });
    res.render("mhs/detailkgt", {
      accessToken: req.cookies.accessToken,
      mhs,
      kegiatan,
      pengguna,
      formatDate,
      kegiatans,
      notify,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
