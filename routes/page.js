const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const user = require("../controller/auth");
const verif = require("../middleware/verifyToken");
const token = require("../controller/refreshToken");
const login = require("../controller/login");
const redirectIfLoggedIn = require("../middleware/loggedIn");
const checkRole = require("../middleware/checkRole");

//login
router.get("/login", redirectIfLoggedIn, login.page);
router.post("/", user.login);

//page
router.get("/", checkRole("mhs"), verif.verifyToken, user.home);
router.get("/admorg", checkRole("adminorg"), verif.verifyToken, user.admorg);
router.get("/dashboard", checkRole("adminfti"), verif.verifyToken, user.admfti);
router.get("/berita", verif.verifyToken, user.berita);
router.get("/org", verif.verifyToken, user.org);
router.get("/daftar", verif.verifyToken, user.daftar);
router.get("/chat", verif.verifyToken, user.chat);
router.get("/profil", verif.verifyToken, user.profil);

//logout
router.post("/logout", user.logout);

//tidak termasuk
router.post("/user", user.regis);
router.get("/token", token.refreshToken);

module.exports = router;
