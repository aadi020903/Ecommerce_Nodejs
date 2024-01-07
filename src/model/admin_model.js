const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  a_name: { 
    type: String, 
    default: "" ,
  },
  a_mobile: { 
    type: Number, 
    default: null },
  address: {
    type:String,
    default:"",
  },
  zipcode: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: "",
  },
  state:{
    type: String,
    default: "",
  },
  a_email: { 
    type: String, 
    default: "" 
  },
  password: { 
    type: String, 
    default: null 
  },
  auth_key: { 
    type: String, 
    default: null 
  },
  image: {
    type: String,
    default: "",
  },
  category_type: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("admin", adminSchema);

