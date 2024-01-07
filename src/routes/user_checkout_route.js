const express = require("express");
const router = express.Router();
const user_auth = require('../../middlewares/user_auth');

const {
    checkout_page,
} = require("../controller/user_checkout_controller");

router.get("/checkout_page", checkout_page);

module.exports = router;