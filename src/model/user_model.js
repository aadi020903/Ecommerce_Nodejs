const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
u_name: { 
  type: String, 
  default: "" 
},
u_email: { 
  type: String, 
  default: "" ,
},
u_mobile: {  
  type: Number, 
  default: null 
},
gender:{
  type: String,
  default: "",
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
 cart: [
  {
    product_id: {
      type: String,
      default: "null",
    },
    quantity: {
      type: Number,
      default: "",
    },
  },
],
 wishlist: [{
    type: Array,
    default: [],
 }],
 status:{
  type: String,
  default: "Active",
 },
});

module.exports = mongoose.model("user", userSchema);
