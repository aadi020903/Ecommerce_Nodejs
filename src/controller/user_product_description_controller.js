const { reset } = require("nodemon");
const { user_product_description } = require("../services/user_product_description_service");

exports.user_product_description = async (req, res) => {
  let data = await user_product_description(req,res);
  if(data.success)
  {
    res.status(200).send({
        message: data.message,
        product_data: data.product_data,
        recommended_products: data.recommended_data,
     })
  }
  else{
    res.status(401).send({
      message: "Something Went Wrong",
    })
  }
}