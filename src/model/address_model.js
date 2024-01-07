const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: "",
  },
  entries: [
    {
      name: {
        type: String,
        default: "",
      },
      mobile: {
        type: Number,
        default: null,
      },
      // house no., building name
      house_number: {
        type: String,
        default: "",
      },
      // road name, street name
      street_name: {
        type: String,
        default: "",
      },
      landmark: {
        type: String,
        default: "",
      },
      // home, office
      type: {
        type: String,
        default: "",
      },
      zipcode: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      latitude: {
        type: String,
        default: "",
      },
      longitude: {
        type: String,
        default: "",
      },
      primary: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("address", addressSchema);
