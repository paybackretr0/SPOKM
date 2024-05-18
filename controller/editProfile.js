const users = require("../models/user");

exports.editProfile = async (req, res) => {
  try {
    const user = await users.findByPk(req.userId);
    res.render("editProfile", { accessToken: req.cookies.accessToken, user });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { nama, email, jurusan } = req.body;
    // Cari pengguna berdasarkan userId
    const user = await users.findByPk(req.userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    const updatedUser = {
      nama: nama !== undefined && nama !== "" ? nama : user.nama,
      email: email !== undefined && email !== "" ? email : user.email,
      jurusan: jurusan !== undefined && jurusan !== "" ? jurusan : user.jurusan,
    };
    await user.update(updatedUser);
    return res.status(200).json({ message: "Data berhasil diupdate" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
