const express = require("express");
const router = express.Router();
const user_auth = require('../../middlewares/user_auth');

const {
  
  user_register_save,
  user_login_save,
} = require("../controller/user_validation_controller");


router.post("/user_register_save", user_register_save);

router.post("/user_login_save",user_login_save )

module.exports = router;

