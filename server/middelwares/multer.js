import multer from "multer";
import path from "path";

const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extention = path.extname(file.originalname);
    if (extention !== ".jpg" && extention !== ".jpeg" && extention !== ".png") {
      cb(new Error("File extention not supported"), false);
      return;
    }
    cb(null, true);
  },
});

export { multerUpload };
