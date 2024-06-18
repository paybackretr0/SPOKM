const { User, Mahasiswa, Organisasi } = require("../models/index");

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
