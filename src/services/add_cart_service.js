const userModel = require("../model/user_model");
const productModel = require("../model/product_model");
const addressModel = require("../model/address_model");


exports.view_cart = async(req,res)=>{
    // const { _id } = req.body;
    // console.log(_id);
    
    // let stock_status =[];
    let user_view_list=[];
   let u_address = [];
    
  
    try {
        const token = req.headers.token;
        // console.log(token);
        const view_user = await userModel.findOne({ auth_key: token });
        // console.log(view_user);
      const user_cart = view_user.cart
        const user_id = view_user._id;
        console.log(user_id);
        const view_address = await addressModel.findOne({user_id:user_id});
      console.log(view_address);
      const address = view_address.entries;
      for(let i=0;i<address.length;i++){ 
        console.log(address[i].primary)
        if(address[i].primary=="Primary"){
            u_address.push({address:address[i]})
        }
      }
    //   console.log(u_address);
      
      for(let i=0;i<user_cart.length;i++){
       const pro_Id=user_cart[i].product_id
       const quantity=user_cart[i].quantity
        // console.log(pro_Id);
        const view_list = await productModel.findById({_id:pro_Id});

        // for(let j=0;j<view_list.photos.length;j++){
        //     console.log(view_list.photos[j]);
        // }
        // const user_address = await addressModel.
        user_view_list.push({name:view_list.name ,price:view_list.price ,quantity:quantity,photos:view_list.main_photo, reviews:view_list.reviews})
      }
    //   console.log(user_view_list);
  
   
      if ((user_view_list ,u_address)) {
        return {
          message: "data fetched successfully",
          user_view_list: user_view_list,
          u_address:u_address,
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

exports.addTocart = async(req,res)=>{
    // const _id=req.body._id;
    const product_id=req.query.product_id;
    
    var arr={};
    
    try {
        const token = req.headers.token;
        const user = await userModel.findOne({ auth_key: token });
        let user_cart = user.cart.find(user_cart => user_cart.product_id  == product_id)
     
        if(user_cart){
            
            let coun = user_cart.quantity
            coun=coun+1;
            user_cart.quantity = coun
            await user.save();
           
        }
        else{
           
           let data_cart = user.cart
            
            arr.product_id = product_id;
            arr.quantity = 1;
           
            console.log(arr);

            
            data_cart.push(arr)
            console.log(data_cart);
            await userModel.findOneAndUpdate({ auth_key: token },
                {$set:{ cart:data_cart}}
                );
            
        }
    } catch (error) {
        console.log(error)
    }
}