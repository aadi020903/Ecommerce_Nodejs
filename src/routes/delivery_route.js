const express = require("express");
const multer = require('multer');
const router = express.Router();
const admin_auth = require("../../middlewares/user_auth");
const {delivery_manager_get, delivery_manager_post,} = require("../controller/delivery_controller.js");

router.get("/delivery_manager", delivery_manager_get);
// router.post("/delivery_manager_post",delivery_manager_post);

module.exports = router;