const { reset } = require("nodemon");
const {
   
    view_order,

    
  } = require("../services/user_order_services");

exports.view_order = async (req, res) => {
    let data = await view_order(req, res);
    
    console.log(data.product_detele);
    console.log(data.user_delivery);
    console.log(data.uu_order);
    console.log(data.message);
    if (data.success) {
      
      res.status(200).send({
        product_detele:data.product_detele,
        user_delivery:data.user_delivery,
        uu_order:data.uu_order,
        message:"view_order",
      })
    } else {
      res.status(401).send("someting went wrong")
      console.log("Invalid user");
    }
  };