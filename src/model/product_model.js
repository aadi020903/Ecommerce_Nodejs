const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    required: true,
  },
  subname: {
    type: String,
    default: "",
    required: true,
  },
  price: {
    type: Number,
    default: null,
    required: true,
  },
  description: {
    type: String,
    default: "",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  photos: {
    type: [],
    default: "",
  },
  mrp: {
    type: Number,
    default: null,
    required: true,
  },
  discount: {
    type: Number,
    default: null,
  },
  brand: {
    type: String,
    default: "",
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  delivery_category: {
    type: String,
    default: "",
  },
  main_photo: {
    type: String,
    default:"",
  },
  photos: [
    {
      type: String,
      default:"",
    },
  ],
  reviews: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: "",
      },
      rating: {
        type: Number,
        default: null,
      },
      review: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("product", productSchema);
