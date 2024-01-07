const userModel = require("../model/user_model");
const productModel = require("../model/product_model");
const addressModel = require("../model/address_model");


exports.checkout_page = async(req,res)=>{  
    try {

        const token = req.headers.token;
        let pageName = req.query.page_name;

        let user_view_list=[];
        // let user_view_list2 = "";
        let u_address = [];
        let primary_address = "";

        const view_user = await userModel.findOne({ auth_key: token });
        const user_id = view_user._id;

        const view_address = await addressModel.findOne({user_id: user_id});
        const address = view_address.entries;

        for(let i = 0; i<address.length; i++){
            if(address[i].primary=="Primary") {
                primary_address = address[i];
            } else{
                u_address.push({address:address[i]})
            }
        }

        console.log("Primary Address",primary_address);
        console.log("All Other Address",u_address);

        if(pageName == "Cart") {
            const user_cart = view_user.cart;

            for(let i=0; i<user_cart.length; i++) {
              const pro_Id = user_cart[i].product_id;
              const quantity = user_cart[i].quantity;

              const all_cart_items = await productModel.findById({_id: pro_Id});
              user_view_list.push({naem:all_cart_items.name, price:all_cart_items.price, quantity:quantity, photo: all_cart_items.main_photo})
            }

            console.log(user_view_list);
        } else {
          const pro_Id = req.query.proId;
          const all_cart_items = await productModel.findById({_id: pro_Id});
          user_view_list = all_cart_items;
        }
  
   
      if (primary_address && user_view_list) {
        return {
          success: true,
          message: "Checkout Data :-",
          primary_address: primary_address,
          u_address:u_address,
          user_view_list: user_view_list,
        };
      } else {
        return {
          message: "Something Went Wrong",
          data: [],
          success: false,
        };
      }
    
    } catch (error) {
      console.log(error ,"Checkout")
    }
  }