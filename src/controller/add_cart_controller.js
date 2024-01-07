const { reset } = require("nodemon");
const {
    addTocart,
    view_cart,

    
  } = require("../services/add_cart_service");
exports.addTocart = async (req, res) => {
    let data = await addTocart(req, res);
    res.status(200).send({
      message: "Item Added To Cart",
    })
  };

  exports.view_cart = async (req, res) => {
    let data = await view_cart(req, res);
    
    console.log(data.u_address);
    console.log(data.user_view_list);
    res.status(200).send({
      message:"User Cart",
      u_address: data.u_address,
      user_view_list: data.user_view_list,
    })
  };