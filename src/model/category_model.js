const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  category_name:{
    type: String,
    default: "",
  },
  sub_categories:[{
    name: {
      type: String,
      default: "",
    },
  }]
});

module.exports = mongoose.model("category", categorySchema);