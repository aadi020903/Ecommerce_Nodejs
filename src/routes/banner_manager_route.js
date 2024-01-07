const express = require("express");
const multer = require('multer');
const router = express.Router();
const admin_auth = require("../../middlewares/admin_auth");
 
let upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const folderName = req.body.FolderName || "uploads";
        cb(null, `../MICROSUN_ECCMORCE_PROJ/public/${folderName}`);
      },
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
      },
    }),
  });

const { 
  banner_front,
  banner_front_add,
  banner_end,
  banner_end_add,
 } = require("../controller/banner_manager_controller");

router.get("/banner_front", banner_front);
router.post("/banner_front_add",upload.array('photos_desktop',4), banner_front_add);

router.get("/banner_end", banner_end);
router.post("/banner_end_add",upload.single('photos_desktop'), banner_end_add);

module.exports = router;
