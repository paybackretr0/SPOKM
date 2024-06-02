const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const user = require("../controller/auth");
const mahasiswa = require("../controller/mhs/mhs");
const publish = require("../controller/mhs/ppi");
const org = require("../controller/admorg/admorg");
const fti = require("../controller/admfti/admfti");
const pw = require("../controller/changePw");
const verif = require("../middleware/verifyToken");
const token = require("../controller/refreshToken");
const login = require("../controller/login");
const redirectIfLoggedIn = require("../middleware/loggedIn");
const checkRole = require("../middleware/checkRole");
const edit = require("../controller/editProfile");

//login
router.get("/login", redirectIfLoggedIn, login.page);
router.get("/", redirectIfLoggedIn, login.page);
router.post("/", user.login);

//page mhs
router.get("/home", checkRole("mhs"), verif.verifyToken, mahasiswa.home);
router.get("/berita", verif.verifyToken, mahasiswa.berita);
router.get("/org", verif.verifyToken, mahasiswa.org);
router.get("/room", verif.verifyToken, mahasiswa.room);
router.get("/chat", verif.verifyToken, mahasiswa.chat);
router.get("/profil", verif.verifyToken, mahasiswa.profil);

//page org
router.get("/admorg", checkRole("adminorg"), verif.verifyToken, org.admorg);

//page fti
router.get("/dashboard", checkRole("adminfti"), verif.verifyToken, fti.admfti);
router.get("/news", checkRole("adminfti"), verif.verifyToken, fti.informasi);
router.get(
  "/tambahNews",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.tambahinformasi
);

//change password
router.get("/changepassword", verif.verifyToken, pw.changepassword);
router.post("/ubahpw", verif.verifyToken, pw.updatepassword);

//edit profile
router.get("/editprofile", verif.verifyToken, edit.editProfile);
router.post("/editP", verif.verifyToken, edit.updateProfile);

//publikasi informasi
router.get("/publikasi", verif.verifyToken, publish.publikasi);
router.post("/publish", verif.verifyToken, publish.publish);

//logout
router.post("/logout", user.logout);

//tidak termasuk
router.get("/token", token.refreshToken);

module.exports = router;
