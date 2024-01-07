const mongoose = require("mongoose");
const first_bannerSchema = new mongoose.Schema({
  photos_desktop:{
    type: [],
    default: null,
  },
});

module.exports = mongoose.model("first_banner", first_bannerSchema);