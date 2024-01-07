const express = require("express");
const router = express.Router();
const user_auth = require('../../middlewares/user_auth')

const {
  
    addToWishlist,
    view_wishlist,
  
} = require("../controller/wish_cart_controller");

router.put("/wishlist", addToWishlist);
router.get("/view_wishlist", view_wishlist);

module.exports = router