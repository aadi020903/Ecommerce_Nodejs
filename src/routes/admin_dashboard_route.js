const express = require("express");
const router = express.Router();
const admin_auth = require('../../middlewares/admin_auth')

const {
  
  admin_dashboard_get,

} = require("../controller/admin_dashboard_controller");

router.get("/admin_dashboard", admin_dashboard_get);

module.exports = router;