const { reset } = require("nodemon");

const {
  payment,
} = require('../services/pament_test_service')

exports.payment_test = async(req, res) => {
    res.render("payment_test");
  }

  exports.payment = async (req,res)=>{
    let data = await payment(req,res);
    if(data.success){
        res.render("admin_login");
        console.log(data.options);
    }
    else{
        res.send("product_not_added");
    }
}