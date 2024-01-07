const mongoose = require("mongoose");

const deliveryManagerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  entries: [
    {
      status: {
        type: String,
        default: "",
      },
      delivery_date: {
        type: Date,
        default: "",
      },
      order_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
    },
  ],
});

module.exports = mongoose.model("delivery_manager", deliveryManagerSchema);