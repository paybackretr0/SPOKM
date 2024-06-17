const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const user = require("../controller/auth");
const mahasiswa = require("../controller/mhs/mhs");
const org = require("../controller/admorg/admorg");
const fti = require("../controller/admfti/admfti");
const pw = require("../controller/changePw");
const verif = require("../middleware/verifyToken");
const token = require("../controller/refreshToken");
const login = require("../controller/login");
const redirectIfLoggedIn = require("../middleware/loggedIn");
const checkRole = require("../middleware/checkRole");
const edit = require("../controller/editProfile");
const upload = require("../middleware/uploadgambar");

router.get("/login", redirectIfLoggedIn, login.page);
router.get("/", redirectIfLoggedIn, login.page);
router.post("/", user.login);
router.get("/home", checkRole("mhs"), verif.verifyToken, mahasiswa.home);
router.get("/berita", verif.verifyToken, mahasiswa.berita);
router.get("/org", verif.verifyToken, mahasiswa.org);
router.get("/daftarorg", checkRole("mhs"), verif.verifyToken, mahasiswa.daftar);
router.post(
  "/daftarOrg",
  checkRole("mhs"),
  verif.verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "profilOrg", maxCount: 1 },
    { name: "suratRek", maxCount: 1 },
  ]),
  mahasiswa.daftarOrg
);
router.post(
  "/daftarOrg",
  checkRole("mhs"),
  verif.verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "profilOrg", maxCount: 1 },
    { name: "suratRek", maxCount: 1 },
  ]),
  mahasiswa.daftarOrg
);
router.get("/room", verif.verifyToken, mahasiswa.room);
router.get(
  "/daftarkgt",
  checkRole("mhs"),
  verif.verifyToken,
  mahasiswa.daftarkegiatan
);
router.post(
  "/daftarkgt",
  checkRole("mhs"),
  verif.verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "proposal", maxCount: 1 },
  ]),
  mahasiswa.daftarkgt
);
router.get(
  "/daftarnews",
  checkRole("mhs"),
  verif.verifyToken,
  mahasiswa.daftarnews
);
router.post(
  "/publishnews",
  checkRole("mhs"),
  verif.verifyToken,
  upload.single("gambar"),
  mahasiswa.daftarberita
);
router.get(
  "/daftarkgt",
  checkRole("mhs"),
  verif.verifyToken,
  mahasiswa.daftarkegiatan
);
router.post(
  "/daftarkgt",
  checkRole("mhs"),
  verif.verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "proposal", maxCount: 1 },
  ]),
  mahasiswa.daftarkgt
);
router.get(
  "/daftarnews",
  checkRole("mhs"),
  verif.verifyToken,
  mahasiswa.daftarnews
);
router.post(
  "/publishnews",
  checkRole("mhs"),
  verif.verifyToken,
  upload.single("gambar"),
  mahasiswa.daftarberita
);
router.get("/chat", verif.verifyToken, mahasiswa.chat);
router.get("/profil", verif.verifyToken, mahasiswa.profil);
router.get("/changepassword", verif.verifyToken, pw.changepassword);
router.get(
  "/editprofile",
  checkRole("mhs"),
  verif.verifyToken,
  edit.editProfile
);
router.get(
  "/detailNews/:idNews",
  checkRole("mhs"),
  verif.verifyToken,
  mahasiswa.detailBerita
);
router.post(
  "/komentar/:idNews",
  checkRole("mhs"),
  verif.verifyToken,
  mahasiswa.komentar
);

router.get("/organisasi", checkRole("adminorg"), verif.verifyToken, org.admorg);
router.get("/publish", checkRole("adminorg"), verif.verifyToken, org.publish);
router.get("/himp", checkRole("adminorg"), verif.verifyToken, org.himp);
router.get("/dafkgt", checkRole("adminorg"), verif.verifyToken, org.daftarKeg);
router.post(
  "/dafkgt",
  checkRole("adminorg"),
  verif.verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "proposal", maxCount: 1 },
  ]),
  org.dafkgt
);
router.get("/orga", checkRole("adminorg"), verif.verifyToken, org.orga);
router.get("/gantipw", checkRole("adminorg"), verif.verifyToken, org.gantipw);
router.get(
  "/editorg/:idOrga",
  checkRole("adminorg"),
  verif.verifyToken,
  org.editProfileOrg
);
router.post(
  "/editorga/:idOrga",
  checkRole("adminorg"),
  verif.verifyToken,
  upload.single("logo"),
  org.updateProfileOrg
);
router.get(
  "/dafnews",
  checkRole("adminorg"),
  verif.verifyToken,
  org.publishing
);
router.post(
  "/publish-news",
  checkRole("adminorg"),
  verif.verifyToken,
  upload.single("gambar"),
  org.publikasi
);
router.get(
  "/anggota/:idOrga",
  checkRole("adminorg"),
  verif.verifyToken,
  org.anggota
);
router.get(
  "/tambahAnggota/:idOrga",
  checkRole("adminorg"),
  verif.verifyToken,
  org.halamanTambahAnggota
);
router.post(
  "/tambahPengurus/:idOrga",
  checkRole("adminorg"),
  verif.verifyToken,
  org.tambahPengurus
);
router.post(
  "/deleteanggota/:idPengurus",
  checkRole("adminorg"),
  verif.verifyToken,
  org.hapusAnggota
);
router.get(
  "/editAnggota/:idPengurus",
  checkRole("adminorg"),
  verif.verifyToken,
  org.editAnggota
);
router.post(
  "/editPengurus/:idPengurus",
  checkRole("adminorg"),
  verif.verifyToken,
  org.updateAnggota
);

router.get("/dashboard", checkRole("adminfti"), verif.verifyToken, fti.admfti);
router.get("/news", checkRole("adminfti"), verif.verifyToken, fti.informasi);
router.get(
  "/tambahNews",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.tambahinformasi
);
router.post(
  "/addNews",
  checkRole("adminfti"),
  verif.verifyToken,
  upload.single("gambar"),
  fti.createNews
);
router.post(
  "/deletenews/:idNews/delete",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.hapusBerita
);
router.get(
  "/editNews/:idNews",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.editNews
);
router.post(
  "/editBerita/:idNews",
  checkRole("adminfti"),
  verif.verifyToken,
  upload.single("gambar"),
  fti.editBerita
);
router.post(
  "/accBerita/:idNews",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.approveBerita
);
router.post(
  "/tolakBerita/:idNews",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.rejectBerita
);
router.get(
  "/organization",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.organization
);
router.get("/kegiatan", checkRole("adminfti"), verif.verifyToken, fti.kegiatan);
router.post(
  "/accKeg/:idKegiatan",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.accKegiatan
);
router.post(
  "/tolakKeg/:idKegiatan",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.tolakKegiatan
);
router.post(
  "/accOrg/:idOrga",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.accOrg
);
router.post(
  "/tolakOrg/:idOrga",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.tolakOrg
);
router.get("/user", checkRole("adminfti"), verif.verifyToken, fti.user);
router.get(
  "/tambahUser",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.regisUser
);
router.post(
  "/deleteuser/:userId",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.hapusUser
);
router.post(
  "/addUser",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.tambahUser
);

router.post(
  "/deletenews/:idNews/delete",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.hapusBerita
);
router.get(
  "/editNews/:idNews",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.editNews
);
router.post(
  "/editBerita/:idNews",
  checkRole("adminfti"),
  verif.verifyToken,
  upload.single("gambar"),
  fti.editBerita
);
router.post(
  "/accBerita/:idNews",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.approveBerita
);
router.post(
  "/tolakBerita/:idNews",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.rejectBerita
);
router.get(
  "/organization",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.organization
);
router.get("/kegiatan", checkRole("adminfti"), verif.verifyToken, fti.kegiatan);
router.post(
  "/accKeg/:idKegiatan",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.accKegiatan
);
router.post(
  "/tolakKeg/:idKegiatan",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.tolakKegiatan
);
router.post(
  "/accOrg/:idOrga",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.accOrg
);
router.post(
  "/tolakOrg/:idOrga",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.tolakOrg
);
router.get("/user", checkRole("adminfti"), verif.verifyToken, fti.user);
router.get(
  "/tambahUser",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.regisUser
);
router.post(
  "/deleteuser/:userId",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.hapusUser
);
router.post(
  "/addUser",
  checkRole("adminfti"),
  verif.verifyToken,
  fti.tambahUser
);

router.post("/ubahpw", verif.verifyToken, pw.updatepassword);
router.post("/editP", verif.verifyToken, edit.updateProfile);
router.post("/logout", user.logout);
router.get("/token", token.refreshToken);

module.exports = router;
