const { User } = require("../models/index");
const bcrypt = require("bcrypt");

exports.changepassword = async (req, res) => {
  try {
    res.render("mhs/changepw", { accessToken: req.cookies.accessToken });
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
