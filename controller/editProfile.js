const { User, Mahasiswa } = require("../models/index");

exports.editProfile = async (req, res) => {
  try {
    const users = await User.findByPk(req.userId);
    const mhs = await Mahasiswa.findOne({ where: { nim: users.nim } });
    res.render("editProfile", { accessToken: req.cookies.accessToken, mhs });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { nama, email, jurusan } = req.body;
    const users = await User.findByPk(req.userId);
    console.log(users);
    if (!User) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    const mhs = await Mahasiswa.findOne({ where: { nim: users.nim } });
    if (!mhs) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }
    const updatedUser = {
      nama: nama !== undefined && nama !== "" ? nama : users.nama,
      email: email !== undefined && email !== "" ? email : users.email,
      jurusan:
        jurusan !== undefined && jurusan !== "" ? jurusan : users.jurusan,
    };
    await Mahasiswa.update(updatedUser, { where: { nim: mhs.nim } });
    return res.status(200).json({ message: "Data berhasil diupdate" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
