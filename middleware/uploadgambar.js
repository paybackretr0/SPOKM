const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.userId; // Replace this with how you get the user's ID
    const dir = path.join(__dirname, "..", "uploads", userId.toString()); // Construct the absolute path

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    // Get the file extension
    const ext = path.extname(file.originalname).toLowerCase();
    // Create the filename with the timestamp and original extension
    const filename = `file-${timestamp}${ext}`;
    cb(null, filename);
  },
});

// Middleware untuk memeriksa tipe file
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Error: Invalid file type!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Maksimal ukuran file 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
