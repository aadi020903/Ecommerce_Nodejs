const { reset } = require("nodemon");
const { checkout_page } = require("../services/user_checkout_service");

exports.checkout_page = async (req, res) => {
  let data = await checkout_page(req,res);
  if(data.success)
  {
    res.status(200).send({
        message: data.message,
        primary_address: data.primary_address,
        u_address: data.u_address,
        product_data: data.product_data,
        user_view_list: data.user_view_list,
     })
  }
  else{
    res.status(401).send({
      message: "Something Went Wrong",
    })
  }
}