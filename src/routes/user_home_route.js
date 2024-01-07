const express = require("express");
const router = express.Router();
const user_auth = require('../../middlewares/user_auth');

const {
    user_home,
} = require("../controller/user_home_controller");

router.get("/user_home", user_home);

module.exports = router;