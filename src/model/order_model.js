const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  entries: [
    {
      ordered_products: [
        {
          product_id: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
          },
          quantity: {
            type: Number,
            default: null,
          },
          item_amount: {
            type: Number,
            default: null,
          },
        },
      ],
      address_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
      transaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
      delivery_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
      total_amount: {
        type: Number,
        default: null,
      },
      transaction_date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("order", orderSchema);
