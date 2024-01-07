const express = require("express");
const router = express.Router();
const admin_auth = require('../../middlewares/admin_auth')

const {
  
    add_category,
    add_new_subcategory,
    added_category,
    added_subcategory,
  
} = require("../controller/add_category_controller");

router.get("/add_category", add_category);
router.post("/added_category", added_category)

router.get("/add_subcategory", add_new_subcategory);
router.post("/added_subcategory", added_subcategory);



module.exports = router