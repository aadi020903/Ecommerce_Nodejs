const express = require("express");
const router = express.Router();
const multer = require('multer');
const admin_auth = require("../../middlewares/admin_auth");

const { 
    admin_profile,
    admin_profile_update,
    admin_profile_updated,

} = require("../controller/admin_profile_controller");

let upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const folderName = req.body.FolderName || "uploads";
        cb(null, `../MICROSUN_ECCMORCE_PROJ/public/${folderName}`);
      },
      filename: (req, file, cb) => {
        // const a_name = req.body.a_name;
        // const a_name = req.body.a_name && req.body.a_name.trim().split(' ')[0];
        // const a_name = req.body.firstname && req.body.firstname.trim();
        const a_email = req.body.email;
        // cb(null, Date.now() + "_" + file.originalname);
         cb(null, `${Date.now()}_${a_name}.jpg`);
        //cb(null, `${a_email}.jpg`);
  
      },
    }),
  });

router.get("/admin_profile", admin_profile);

router.get("/admin_profile_update", admin_profile_update)

router.post("/admin_profile_updated",upload.single("image"),admin_profile_updated)

module.exports = router;