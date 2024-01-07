const express = require("express");
const router = express.Router();
const admin_auth = require("../../middlewares/admin_auth");

const { 
    user_address_manager_added,
    user_address_manager,
    user_address_manager_update,
    user_address_manager_delete,

} = require("../controller/user_address_manager_controller");

router.post("/user_address_manager_added", user_address_manager_added)
router.get("/user_address_manager",user_address_manager);
router.post("/user_address_manager_update", user_address_manager_update)
router.delete("/user_address_manager_delete", user_address_manager_delete)

module.exports = router;