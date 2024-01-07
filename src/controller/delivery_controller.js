const { reset } = require("nodemon");
const { delivery_manager_get } = require("../services/delivery_service.js");

exports.delivery_manager_get = async (req, res) => {
  let data = await delivery_manager_get(req,res);
  if(data.success)
  {
    res.render("delivery_manager",{delivery_data:data.data, admin_data:data.admin_data});
  }
  else{
    res.send("Delivery Manager Error Happened")
  }
}

// exports.delivery_manager_post = async (req, res) => {
//   let data = await delivery_manager_post(req,res);
//   if(data.success)
//   {
//     res.render("delivery_manager");
//     console.log("Data Successfully Retrieved")
//   }
//   else{
//     res.send("thathastu")
//   }
// };
