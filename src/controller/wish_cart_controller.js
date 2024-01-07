const { reset } = require("nodemon");
const {
    addToWishlist,
    view_wishlist,
    
  } = require("../services/wish_cart_service");
exports.addToWishlist = async (req, res) => {
    let data = await addToWishlist(req, res);
    res.status(200).send({
      message:"Item Added To Wishlist",
    })
  };
exports.view_wishlist = async (req, res) => {
    let data = await view_wishlist(req, res);
    console.log(data.data);

    res.status(200).send({
      message: "User Wishlist",
      data:data.data,
    })

  };