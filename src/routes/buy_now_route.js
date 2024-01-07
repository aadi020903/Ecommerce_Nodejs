const express = require("express");
const router = express.Router();
const user_auth = require('../../middlewares/user_auth')

const {
  
    buy_now,
    // view_cart,
  
} = require("../controller/buy_now_controller");

router.post("/buy_now", buy_now);

module.exports = router