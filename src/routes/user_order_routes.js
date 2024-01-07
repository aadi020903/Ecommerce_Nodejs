const express = require("express");
const router = express.Router();
const user_auth = require('../../middlewares/user_auth')

const {
  
    
    view_order,
  
} = require("../controller/user_order_controller");


router.get("/view_order", view_order);

module.exports = router