const users = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ msg: "Token penyegar tidak ditemukan" });
    const user = await users.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!user)
      return res.status(403).json({ msg: "Token penyegar tidak valid" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({ msg: "Token penyegar tidak valid" });
        const id = user.id;
        const nama = user.nama;
        const nim = user.nim;
        const jurusan = user.jurusan;
        const accessToken = jwt.sign(
          { id, nama, nim, jurusan },
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
