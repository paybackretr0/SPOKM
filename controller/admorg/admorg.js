const {
  User,
  Kegiatan,
  Notifikasi,
  Organisasi,
} = require("../../models/index");
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

exports.daftarKeg = async (req, res) => {
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

exports.dafkgt = async (req, res) => {
  try {
    const pengguna = await User.findByPk(req.userId);
    if (!pengguna) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

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
      isi: `Pengajuan Kegiatan ${namaKegiatan} oleh Admin Organisasi telah diajukan`,
      userId: req.userId,
    });

    const io = req.app.get("io");
    io.to("adminfti").emit("new_kegiatan", {
      message: "Pengajuan Kegiatan Baru!",
      kegiatan: {
        namaKegiatan,
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
    const users = await User.findByPk(req.userId);
    const organisasi = await Organisasi.findOne({
      where: {
        userId: req.userId,
      },
    });
    res.render("admorg/orga", {
      accessToken: req.cookies.accessToken,
      users,
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
    const users = await User.findByPk(req.userId);
    res.render("admorg/gantiPw", {
      accessToken: req.cookies.accessToken,
      users,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.editProfileOrg = async (req, res) => {
  try {
    const users = await User.findByPk(req.userId);
    const idOrga = req.params.idOrga;
    const org = await Organisasi.findByPk(idOrga);
    res.render("admorg/editOrga", {
      accessToken: req.cookies.accessToken,
      org,
      users,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.updateProfileOrg = async (req, res, next) => {
  try {
    const { namaOrga, deskripsi, tanggalBerdiri } = req.body;
    const logo = req.file ? req.file.filename : null;
    const idOrga = req.params.idOrga;
    const org = await Organisasi.findByPk(idOrga);
    if (!org) {
      return res.status(404).json({ message: "Organisasi tidak ditemukan" });
    }
    const updatedOrg = {
      namaOrga:
        namaOrga !== undefined && namaOrga !== "" ? namaOrga : org.namaOrga,
      deskripsi:
        deskripsi !== undefined && deskripsi !== "" ? deskripsi : org.deskripsi,
      tanggalBerdiri:
        tanggalBerdiri !== undefined && tanggalBerdiri !== ""
          ? tanggalBerdiri
          : org.tanggalBerdiri,
      logo: logo !== null ? logo : org.logo,
    };
    await Organisasi.update(updatedOrg, { where: { idOrga: org.idOrga } });
    return res.status(200).json({ message: "Data berhasil diupdate" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
