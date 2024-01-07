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
        const name = req.body.name.trim() + req.body.subname.trim();
        cb(null, `${name}-${file.originalname}.jpg`);
  
      },
    }),
  });

const { product_add,
  product_added,
  product_viewer,
  product_update_get,
  product_update_post,
  getSubCategories,
 } = require("../controller/product_controller");

router.get("/product_add", product_add);

// router.post("/product_added",upload.array('photos',4), product_added);
router.post("/product_added", upload.fields([{ name: 'photos', maxCount: 4 }, { name: 'main_photo', maxCount: 1 }]), product_added);

router.get("/product_viewer", product_viewer);

router.get("/product_update", product_update_get);
router.post("/product_update_post",upload.fields([{ name: 'photos', maxCount: 4 }, { name: 'main_photo', maxCount: 1 }]), product_update_post);

router.get('/api/subcategories/:categoryId', getSubCategories);
module.exports = router;
