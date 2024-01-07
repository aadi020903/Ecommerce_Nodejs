const mongoose = require("mongoose");
const top_productsSchema = new mongoose.Schema({
  product_id:{
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  }
});

module.exports = mongoose.model("top_products", top_productsSchema);