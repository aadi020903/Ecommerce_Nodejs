const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  pay_mode: {
    type: String,
    default: "",
  },
  total_amount: {
    type: Number,
    default: null,
  },
  transaction_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
