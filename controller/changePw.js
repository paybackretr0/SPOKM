const users = require("../models/user");
const bcrypt = require("bcrypt");

exports.changepassword = async (req, res) => {
  try {
    res.render("changepw", { accessToken: req.cookies.accessToken });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};

exports.updatepassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Cari pengguna berdasarkan userId
    const user = await users.findByPk(req.userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    // Periksa apakah password saat ini cocok
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password saat ini salah" });
    }

    // Enkripsi password baru
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Perbarui password pengguna di database
    await user.update({ password: hashedNewPassword });

    return res.status(200).json({ message: "Password berhasil diubah" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
