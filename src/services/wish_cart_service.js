const userModel = require("../model/user_model");
const productModel = require("../model/product_model");
const { forEach } = require("lodash");



exports.view_wishlist = async(req,res)=>{
  // const { _id } = req.body;
  // console.log(_id);
  const view_list ="";
  let stock_status =[];
  let user_view_list=[];
  

  try {
    const token = req.headers.token;
        const view_user = await userModel.findOne({ auth_key: token });
      console.log(view_user);
    const user_wishlist = view_user.wishlist

    for(let i=0;i<user_wishlist.length;i++){

     
      let proId=user_wishlist[i];
      const view_list = await productModel.findById({_id:proId});
      
      if(view_list.quantity<=50&&view_list.quantity!=0){
        stock_status="limeted stock"
      }
      else if(view_list.quantity==0){
        stock_status="out of stock"
      }
      else{
        stock_status="in stock"
      }

      user_view_list.push({name:view_list.name ,price:view_list.price ,stock_status:stock_status,photos:view_list.photos[0]})
     
    }
    if ((user_view_list)) {
      return {
        message: "data fetched successfully",
        data: user_view_list ,
        success: true,
      };
    } else {
      return {
        message: "data did not fetch",
        data: [],
        success: false,
      };
    }
  
  } catch (error) {
    console.log(error ,"asdfgh")
  }
}

exports.addToWishlist = async (req, res) => {
  // const { _id } = req.body;
  const { proId } = req.query;
  try {
    const token = req.headers.token;
    const user = await userModel.findOne({ auth_key: token });

    let _id = user._id;
    console.log(_id);

    // const user = await userModel.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === proId);
    if (user.wishlist.find((id) => id.toString() === proId)) {
      let user = await userModel.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: proId },
        },
        {
          new: true,
        }
      );
      // res.json(user);
      console.log(user);
    } else {
      const token = req.headers.token;
    const user = await userModel.findOneAndUpdate({ auth_key: token },
      // );
      // let user = await userModel.findByIdAndUpdate(
      //   _id,
        {
          $push: { wishlist: proId },
        },
        {
          new: true,
        }
      );
      // res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
};
