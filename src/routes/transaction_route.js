const express = require("express");
const router = express.Router();

const { transactions_viewer } = require("../controller/transaction_controller");


router.get("/transactions_viewer", transactions_viewer);

module.exports = router;
