const multer = require("multer");
const path = require("path");
const storageImage = multer.memoryStorage();
const maxSize = 5 * 1024 * 1024; // 5MB

const uploadImageProfile = multer({
  storage: storageImage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimeType && extname) return cb(null, true);

    cb(new Error("Only .jpg, .jpeg, .png files are allowed"));
  },
}).single("image");

const uploadImageProduct = multer({
  storage: storageImage,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|jpeg|png/;
    const mimetype = filetypes.test(file.mimetype);

    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error("Only .jpg, .jpeg, .png files are allowed"));
  },
}).fields([{ name: "image_cover", maxCount: 5 }]);

module.exports = { uploadImageProfile, uploadImageProduct };
