const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination(req, file, cb) {

    let folder = "uploads/";

    if (file.fieldname === "profileImage") {
      folder = "uploads/profile-images/";
    }

    if (file.fieldname === "resume") {
      folder = "uploads/resumes/";
    }

    if (file.fieldname === "companyLogo") {
      folder = "uploads/company-logos/";
    }

    // Create folder if it doesn't exist
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {

  if (
    file.mimetype.startsWith("image") ||
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/msword"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }

};

module.exports = multer({
  storage,
  fileFilter,
});