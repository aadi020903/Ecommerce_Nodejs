const express = require("express");
const router = express.Router();
const user_auth = require('../../middlewares/user_auth');

const {
    user_product_description,
} = require("../controller/user_product_description_controller");

router.get("/user_product_description", user_product_description);

module.exports = router;