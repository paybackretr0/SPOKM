const { User, Kegiatan, Notifikasi } = require("../../models/index");
let nanoid;
(async () => {
  nanoid = (await import("nanoid")).nanoid;
})();

exports.admorg = async (req, res) => {
  try {
    const users = await User.findByPk(req.userId);
    res.render("admorg/organisasi", {
      accessToken: req.cookies.accessToken,
      users,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.publish = async (req, res) => {
  try {
    const users = await User.findByPk(req.userId);
    res.render("admorg/publish", {
      accessToken: req.cookies.accessToken,
      users,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.himp = async (req, res) => {
  try {
    const users = await User.findByPk(req.userId);
    res.render("admorg/himp", {
      accessToken: req.cookies.accessToken,
      users,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.dafkgt = async (req, res) => {
  try {
    const users = await User.findByPk(req.userId);
    res.render("admorg/dafkgt", {
      accessToken: req.cookies.accessToken,
      users,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.daftarkgt = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const {
      namaKegiatan,
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
      isi: `Pengajuan Kegiatan ${namaKegiatan} oleh Admin Organisasi telah diajukan`,
      userId: req.userId,
    });

    const io = req.app.get("io");
    io.to("adminfti").emit("new_kegiatan", {
      message: "Pengajuan Kegiatan Baru!",
      kegiatan: {
        namaKegiatan,
        nimKetupel,
        deskripsi,
        bidangKegiatan,
        tanggalMulai,
        tanggalSelesai,
        tanggalPengajuan,
        penyelenggara,
        lingkupKegiatan,
        logo,
        proposal,
        status: "P",
        userId: req.userId,
        nama: "Admin Organisasi",
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
    const users = await User.findByPk(req.userId);
    res.render("admorg/orga", {
      accessToken: req.cookies.accessToken,
      users,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};
