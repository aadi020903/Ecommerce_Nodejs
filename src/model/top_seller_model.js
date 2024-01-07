const mongoose = require("mongoose");
const top_sellerSchema = new mongoose.Schema({
  product_id:{
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  }
});

module.exports = mongoose.model("top_seller", top_sellerSchema);