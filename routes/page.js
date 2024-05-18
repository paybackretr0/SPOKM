const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const user = require("../controller/auth");
const mhs = require("../controller/mhs/mhs");
const org = require("../controller/admorg/admorg");
const fti = require("../controller/admfti/admfti");
const pw = require("../controller/changePw");
const verif = require("../middleware/verifyToken");
const token = require("../controller/refreshToken");
const login = require("../controller/login");
const redirectIfLoggedIn = require("../middleware/loggedIn");
const checkRole = require("../middleware/checkRole");

//login
router.get("/login", redirectIfLoggedIn, login.page);
router.get("/", redirectIfLoggedIn, login.page);
router.post("/", user.login);

//page
router.get("/home", checkRole("mhs"), verif.verifyToken, mhs.home);
router.get("/admorg", checkRole("adminorg"), verif.verifyToken, org.admorg);
router.get("/dashboard", checkRole("adminfti"), verif.verifyToken, fti.admfti);
router.get("/berita", verif.verifyToken, mhs.berita);
router.get("/org", verif.verifyToken, mhs.org);
router.get("/daftar", verif.verifyToken, mhs.daftar);
router.get("/chat", verif.verifyToken, mhs.chat);
router.get("/profil", verif.verifyToken, mhs.profil);
router.get("/changepassword", verif.verifyToken, pw.changepassword);
router.post("/ubahpw", verif.verifyToken, pw.updatepassword);

//logout
router.post("/logout", user.logout);

//tidak termasuk
// router.post("/user", user.regis);
router.get("/token", token.refreshToken);

module.exports = router;
