const { where } = require("sequelize");
const {
  User,
  Kegiatan,
  Notifikasi,
  Organisasi,
  Berita,
  Kategori,
  Anggota,
  Komentar,
} = require("../../models/index");
let nanoid;
(async () => {
  nanoid = (await import("nanoid")).nanoid;
})();

exports.admorg = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const orga = await Organisasi.findAll();
    const kegiatan = await Kegiatan.findAll();
    const berita = await Berita.findOne({
      order: [["tanggalPublish", "DESC"]],
      limit: 1,
    });
    res.render("admorg/organisasi", {
      accessToken: req.cookies.accessToken,
      pengguna,
      orga,
      kegiatan,
      berita,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.publish = async (req, res) => {
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
    const beritas = await Berita.findAll();
    const orga = await Organisasi.findOne({
      where: { userId: pengguna.userId },
    });
    res.render("admorg/publish", {
      accessToken: req.cookies.accessToken,
      pengguna,
      orga,
      beritas,
      formatDate,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.publishing = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const orga = await Organisasi.findOne({ where: { userId: req.userId } });
    const kategoris = await Kategori.findAll();
    res.render("admorg/publishing", {
      accessToken: req.cookies.accessToken,
      pengguna,
      orga,
      kategoris,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.publikasi = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const orga = await Organisasi.findOne({
      where: { userId: req.userId },
    });

    if (!orga) {
      return res.status(404).json({ message: "Organisasi tidak ditemukan" });
    }

    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    let { penulis, kategori, judul, isi_berita, tanggalPengajuan } = req.body;
    const gambar = req.file ? req.file.filename : null;

    if (!penulis) {
      penulis = orga.namaOrga;
    }

    if (!kategori || !judul || !isi_berita || !tanggalPengajuan || !gambar) {
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
        nama: orga.namaOrga || "Admin Organisasi",
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

exports.publikasi = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const orga = await Organisasi.findOne({
      where: { userId: req.userId },
    });

    if (!orga) {
      return res.status(404).json({ message: "Organisasi tidak ditemukan" });
    }

    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    let { penulis, kategori, judul, isi_berita, tanggalPengajuan } = req.body;
    const gambar = req.file ? req.file.filename : null;

    if (!penulis) {
      penulis = orga.namaOrga;
    }

    if (!kategori || !judul || !isi_berita || !tanggalPengajuan || !gambar) {
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
        nama: orga.namaOrga || "Admin Organisasi",
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

exports.himp = async (req, res) => {
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
    const orga = await Organisasi.findAll({ where: { status: "Y" } });
    res.render("admorg/himp", {
      accessToken: req.cookies.accessToken,
      pengguna,
      orga,
      formatDate,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.daftarKeg = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const orga = await Organisasi.findOne({
      where: { userId: pengguna.userId },
    });
    res.render("admorg/dafkgt", {
      accessToken: req.cookies.accessToken,
      pengguna,
      orga,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.dafkgt = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const orga = await Organisasi.findOne({
      where: { userId: pengguna.userId },
    });

    const {
      namaKegiatan,
      namaKetupel,
      nimKetupel,
      deskripsi,
      bidangKegiatan,
      tanggalMulai,
      tanggalSelesai,
      tanggalPengajuan,
      penyelenggara,
      lingkupKegiatan,
    } = req.body;
    const logo = req.files["logo"] ? req.files["logo"][0].filename : null;
    const proposal = req.files["proposal"]
      ? req.files["proposal"][0].filename
      : null;

    await Kegiatan.create({
      idKegiatan: "K" + nanoid(7),
      namaKegiatan: namaKegiatan,
      namaKetupel: namaKetupel,
      nimKetupel: nimKetupel,
      deskripsi: deskripsi,
      bidangKegiatan: bidangKegiatan,
      tanggalMulai: tanggalMulai,
      tanggalSelesai: tanggalSelesai,
      tanggalPengajuan: tanggalPengajuan,
      penyelenggara: penyelenggara,
      lingkupKegiatan: lingkupKegiatan,
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
      isi: `Pengajuan Kegiatan ${namaKegiatan} oleh ${orga.namaOrga} telah diajukan`,
      userId: req.userId,
    });

    const io = req.app.get("io");
    io.to("adminfti").emit("new_kegiatan", {
      message: "Pengajuan Kegiatan Baru!",
      kegiatan: {
        namaKegiatan,
        nama: orga.namaOrga || "Admin Organisasi",
      },
    });

    return res.status(200).json({ message: "Kegiatan Berhasil diajukan" });
  } catch (error) {
    console.error("Error saat mengajukan Kegiatan:", error);
    return res.status(500).json({ message: "Kesalahan Server" });
  }
};

exports.orga = async (req, res) => {
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
    const organisasi = await Organisasi.findOne({
      where: {
        userId: req.userId,
      },
    });
    res.render("admorg/orga", {
      accessToken: req.cookies.accessToken,
      pengguna,
      organisasi,
      formatDate,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.gantipw = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    res.render("admorg/gantiPw", {
      accessToken: req.cookies.accessToken,
      pengguna,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.editProfileOrg = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const idOrga = req.params.idOrga;
    const org = await Organisasi.findByPk(idOrga);
    res.render("admorg/editOrga", {
      accessToken: req.cookies.accessToken,
      org,
      pengguna,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.updateProfileOrg = async (req, res, next) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    if (!pengguna) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    const idOrga = req.params.idOrga;
    const org = await Organisasi.findByPk(idOrga);
    if (!org) {
      return res.status(404).json({ message: "Organisasi tidak ditemukan" });
    }
    const {
      namaOrga,
      deskripsi,
      tanggalBerdiri,
      lingkupOrganisasi,
      namaKetua,
      nimKetua,
    } = req.body;
    const logo = req.file ? req.file.filename : null;

    const updatedOrg = {
      namaOrga:
        namaOrga !== undefined && namaOrga !== "" ? namaOrga : org.namaOrga,
      deskripsi:
        deskripsi !== undefined && deskripsi !== "" ? deskripsi : org.deskripsi,
      lingkupOrganisasi:
        lingkupOrganisasi !== undefined && lingkupOrganisasi !== ""
          ? lingkupOrganisasi
          : org.lingkupOrganisasi,
      namaKetua:
        namaKetua !== undefined && namaKetua !== "" ? namaKetua : org.namaKetua,
      nimKetua:
        nimKetua !== undefined && nimKetua !== "" ? nimKetua : org.nimKetua,
      tanggalBerdiri:
        tanggalBerdiri !== undefined && tanggalBerdiri !== ""
          ? tanggalBerdiri
          : org.tanggalBerdiri,
      logo: logo !== null ? logo : org.logo,
      status: "Y",
      status: "Y",
    };
    await Organisasi.update(updatedOrg, { where: { idOrga: org.idOrga } });
    return res.status(200).json({ message: "Data berhasil diupdate" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.anggota = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const idOrga = req.params.idOrga;
    const orga = await Organisasi.findByPk(idOrga);
    const anggota = await Anggota.findAll({ where: { idOrga: idOrga } });

    res.render("admorg/anggota", {
      accessToken: req.cookies.accessToken,
      pengguna,
      orga,
      anggota,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.halamanTambahAnggota = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const idOrga = req.params.idOrga;
    const orga = await Organisasi.findByPk(idOrga);
    res.render("admorg/tambahAnggota", {
      accessToken: req.cookies.accessToken,
      pengguna,
      orga,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.tambahPengurus = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const idOrga = req.params.idOrga;
    const orga = await Organisasi.findByPk(idOrga);
    if (!orga) {
      return res.status(404).json({ message: "Organisasi tidak ditemukan" });
    }

    const { nama, nim, jabatan, noHp, jenisKelamin } = req.body;
    if (!nama || !jabatan || !noHp || !jenisKelamin) {
      return res.status(400).json({ message: "Semua bidang harus diisi" });
    }

    if (
      typeof nama !== "string" ||
      typeof jabatan !== "string" ||
      !isNaN(nama) ||
      !isNaN(jabatan)
    ) {
      return res
        .status(400)
        .json({ message: "Nama dan jabatan harus berupa teks" });
    }

    if (isNaN(nim) || isNaN(noHp)) {
      return res
        .status(400)
        .json({ message: "NIM dan noHp harus berupa angka" });
    }

    await Anggota.create({
      idPengurus: "A" + nanoid(7),
      nama: nama,
      nim: nim,
      jabatan: jabatan,
      noHp: noHp,
      jenisKelamin: jenisKelamin,
      idOrga: idOrga,
    });

    return res.status(200).json({ message: "Anggota berhasil ditambahkan" });
  } catch (error) {
    console.error("Error saat menambahkan anggota:", error);
    return res.status(500).json({ message: "Kesalahan Server" });
  }
};

exports.hapusAnggota = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const orga = await Organisasi.findOne({ where: { userId: req.userId } });
    const idPengurus = req.params.idPengurus;
    const pengurus = await Anggota.findByPk(idPengurus);
    if (!pengurus) {
      return res.status(404).json({ message: "Anggota tidak ditemukan" });
    }

    await Anggota.destroy({ where: { idPengurus: idPengurus } });

    res.redirect(`/anggota/${orga.idOrga}`);
  } catch (error) {
    console.error("Error saat menghapus anggota:", error);
    return res.status(500).json({ message: "Kesalahan Server" });
  }
};

exports.editAnggota = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    const orga = await Organisasi.findOne({ where: { userId: req.userId } });
    const idPengurus = req.params.idPengurus;
    const anggota = await Anggota.findByPk(idPengurus);
    res.render("admorg/editAnggota", {
      accessToken: req.cookies.accessToken,
      pengguna,
      anggota,
      orga,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.updateAnggota = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    const idPengurus = req.params.idPengurus;
    const pengurus = await Anggota.findByPk(idPengurus);
    if (!pengurus) {
      return res.status(404).json({ message: "Anggota tidak ditemukan" });
    }

    const { nama, nim, jabatan, noHp, jenisKelamin } = req.body;
    await Anggota.update(
      {
        nama: nama !== undefined && nama !== "" ? nama : pengurus.nama,
        nim: nim !== undefined && nim !== "" ? nim : pengurus.nim,
        jabatan:
          jabatan !== undefined && jabatan !== "" ? jabatan : pengurus.jabatan,
        noHp: noHp !== undefined && noHp !== "" ? noHp : pengurus.noHp,
        jenisKelamin:
          jenisKelamin !== undefined && jenisKelamin !== ""
            ? jenisKelamin
            : pengurus.jenisKelamin,
      },
      { where: { idPengurus: idPengurus } }
    );

    return res.status(200).json({ message: "Data anggota berhasil diupdate" });
  } catch (error) {
    console.error("Error saat mengupdate anggota:", error);
    return res.status(500).json({ message: "Kesalahan Server" });
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
    const orga = await Organisasi.findOne({ where: { userId: userId } });
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
    const news = await Berita.findAll();
    const komentar = await Komentar.findAll({
      where: { idNews: idNews },
    });

    res.render("admorg/detailpublish", {
      accessToken: req.cookies.accessToken,
      orga,
      beritas,
      formatDate,
      komentar,
      news,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
