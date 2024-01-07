const express = require("express");
const multer = require("multer");
const router = express.Router();
const user_auth = require("../../middlewares/user_auth");

const {
  user_profile,
  user_profile_updated,
  user_password_updated,
} = require("../controller/user_profile_controller");

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const folderName = req.body.FolderName || "uploads";
      cb(null, `../MICROSUN_ECCMORCE_PROJ/public/user_profile`);
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  }),
});


router.get("/user_profile", user_profile);
router.post("/user_password_updated", user_password_updated);

router.post(
  "/user_profile_updated",
  upload.single("image"),
  user_profile_updated
);

module.exports = router;
