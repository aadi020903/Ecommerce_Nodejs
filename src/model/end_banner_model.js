const mongoose = require("mongoose");
const end_bannerSchema = new mongoose.Schema({
  photos_desktop:{
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("end_banner", end_bannerSchema);