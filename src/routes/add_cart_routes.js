const express = require("express");
const router = express.Router();
const user_auth = require('../../middlewares/user_auth')

const {
  
    addTocart,
    view_cart,
  
} = require("../controller/add_cart_controller");

router.put("/cart", addTocart);
router.get("/view_cart", view_cart);

module.exports = router