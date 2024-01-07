const express = require("express");
const router = express.Router();
const admin_auth = require("../../middlewares/admin_auth");

const { 
    admin_user_manager,
    admin_user_manager_status,

} = require("../controller/admin_user_manager_controller");



router.get("/admin_user_manager", admin_user_manager)

router.post("/admin_user_manager_status",admin_user_manager_status)

module.exports = router;