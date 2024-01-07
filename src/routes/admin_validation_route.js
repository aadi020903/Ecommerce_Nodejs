const express = require("express");
const router = express.Router();
const admin_auth = require('../../middlewares/admin_auth')

const {
  
  admin_register,
  admin_register_save,
  admin_login,
  admin_login_save,

} = require("../controller/admin_validation_controller");

router.get("/admin_register", admin_register);

router.post("/admin_register_save", admin_register_save);

router.get("/", admin_login);

router.post("/admin_login_save",admin_login_save )


// router.get("/admin_dashboard",admin_auth,(req,res)=>{
//   res.send("hemlo")
// })

module.exports = router;

