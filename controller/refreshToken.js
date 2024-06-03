const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ msg: "Token penyegar tidak ditemukan" });
    const pengguna = await User.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!pengguna)
      return res.status(403).json({ msg: "Token penyegar tidak valid" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({ msg: "Token penyegar tidak valid" });
        const userId = pengguna.userId;
        const nama = pengguna.nama;
        const nim = pengguna.nim;
        const jurusan = pengguna.jurusan;
        const accessToken = jwt.sign(
          { userId, nama, nim, jurusan },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Kesalahan server" });
  }
};
