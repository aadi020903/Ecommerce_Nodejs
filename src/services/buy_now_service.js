const orderModel = require("../model/order_model");
const productModel = require("../model/product_model");
const devliveryModel = require("../model/delivery_model");
const userModel = require("../model/user_model");
const addressModel = require("../model/address_model");
const transactionModel = require("../model/transaction_model");
const mongoose = require("mongoose");
const { Types } = mongoose;

exports.buy_now = async(req,res)=>{
    const product_id=req.body.product_id;
    console.log(product_id);
    console.log(product_id);
    const quantity=req.body.quantity;
    const pay_mode=req.body.pay_mode;
    console.log(quantity);
    try {
        var arr={};
        var arrr={};
        // let user_cart ={};
        var ordered_products=[]
        let order_idd =[]
        let order_iddd =[]
        let order_id =[]
        let delivery_manager_order_id=[]
        let delivery_manager_delivery_id=[]
        let order_manager_order_id=[]
        let transaction_id=[]

        // let address_id = mongoose.Schema.Types.ObjectId;

        const token = req.headers.token;

        const produc_data = await productModel.findById({ _id:product_id});
        console.log(produc_data.price);
        console.log(produc_data._id);
        const item_amount = produc_data.price
        const pro_id = produc_data._id

        const user_data = await userModel.findOne({ auth_key: token });
        const user_id = user_data._id
        const user_address = await addressModel.findOne({ user_id: user_id });
        console.log(user_address.user_id)
        const address = user_address.entries;
        console.log("helloooooo");
        const address_id=new Types.ObjectId();
        // const objectIdVariable = new Types.ObjectId();
        for(let i=0;i<address.length;i++){ 
            if(address[i].primary=="Primary"){
             
                address_id =address[i]._id
                
          }
        }
        

        console.log(address_id);
        const user_order = await orderModel.findOne({ user_id: user_id });

        if(user_order){
            console.log("vikas");
            console.log(user_order.entries);
            let total_amount = quantity*item_amount
            let data_order = user_order.entries
            ordered_products.push({product_id:pro_id, quantity:quantity, item_amount:item_amount})
            arr.address_id = address_id;
            arr.total_amount = total_amount;
            arr.ordered_products = ordered_products
            console.log("helooooooo"+arr);
            data_order.push(arr)
            console.log(data_order);
            try {
                
                await orderModel.findOneAndUpdate({ user_id: user_id },
                    {$set:{ entries:data_order}}
                    );
            } catch (error) {
                console.log(error);
            }

        }else{
            let total_amount = quantity*item_amount
            let order_data = new orderModel({
                user_id:user_id,
                entries:[
                    {
                        ordered_products:
                        [
                          {
                            product_id:pro_id,
                            quantity:quantity,
                            item_amount:item_amount
                          }  
                        ],
                        address_id:address_id,
                        total_amount:total_amount,
                    }
                ],
                
                
                
                
    
             })
             let orderData = await order_data.save();
        }
        const user_orderr = await orderModel.findOne({ user_id: user_id });
        for(let i=0;i<user_orderr.entries.length;i++){

            
            // let o_entries = user_orderr.entries[i].ordered_products
          
            // for(let j=0;j<o_entries.length;j++){
                order_idd.push(user_orderr.entries[i]._id)

            // }
        }
        console.log(order_idd);

        for(let i=0;i<order_idd.length;i++){
            const order_id = order_idd[i];
            const user_transaction = await transactionModel.findOne({order_id: order_id})
            console.log(user_transaction);
            if(user_transaction==undefined){
                console.log("asdfghjkl");
                let total_amount = quantity*item_amount
                let user_transacti = new transactionModel({
                    user_id:user_id,
                    order_id:order_id,
                    total_amount:total_amount,
                    pay_mode:pay_mode,
                
                
                 })
                 let transactoindata = await user_transacti.save();
            }
        }
        
        for(let i=0;i<order_idd.length;i++){
            const order_id = order_idd[i];
            const user_transaction_data = await transactionModel.findOne({order_id: order_id})
           
            transaction_id.push(user_transaction_data._id)
        }
        console.log(transaction_id);
        for(let i=0;i<transaction_id.length;i++){
            let _id = transaction_id[i].toString()
                    console.log(_id);
                    
            const user_manager = await orderModel.findOne({ user_id: user_id });
            
            let user_cart = user_manager.entries.find(user_cart => user_cart.transactoin_id == _id)
            let user_order = user_manager.entries.find(user_order => user_order.transactoin_id == null)
           
            if(user_cart==undefined&&user_order){
                user_order.transactoin_id = _id
                    console.log(user_order);
                    
                    try {
                        await user_manager.save();
                        console.log('User manager saved successfully.');
                    } catch (error) {
                        console.error('Error saving user manager:', error.message);
                      
                    }
            }else{
               console.log("hello");
            }
            
        }
        
        const user_delivery = await devliveryModel.findOne({ user_id: user_id });
         if(user_delivery){
        for(let i=0;i<user_delivery.entries.length;i++){
            order_iddd.push(user_delivery.entries[i].order_id)
        }
        for(let i=0;i<order_idd.length;i++){
            if(order_idd[i].equals(order_iddd[i])){
            }else{
                let data_order = user_delivery.entries                   
                // arrr.address_id = address_id;
                arrr.order_id = order_idd[i]
                arrr.status = "panding"
                data_order.push(arrr)
                
                await devliveryModel.findOneAndUpdate({ user_id: user_id },
                    {$set:{ entries:data_order}}
                    );
                }
            }
            }else{
                for(let i=0;i<order_idd.length;i++){
                let user_delivery = new devliveryModel({
                    user_id:user_id,
                    entries:[{
                        order_id:order_idd[i],
                        status:"panding"
                    }]
                })
                let deliverydata = await user_delivery.save();
            }
            }
            
            const delivery_manager = await devliveryModel.findOne({ user_id: user_id });
            
            
                   for(let i=0;i<delivery_manager.entries.length;i++){
            
                delivery_manager_order_id.push(delivery_manager.entries[i]._id)

               
            }
            for(let i=0;i<delivery_manager_order_id.length;i++){
                    let _id = delivery_manager_order_id[i].toString()
                    console.log(_id);
                    
            const user_manager = await orderModel.findOne({ user_id: user_id });
            console.log("heloooo");
            let user_cart = user_manager.entries.find(user_cart => user_cart.delivery_id == _id)
            let user_order = user_manager.entries.find(user_order => user_order.delivery_id == null)
     
            if(user_cart==undefined&&user_order){
                user_order.delivery_id = _id
                    console.log(user_order);
                    
                    try {
                        await user_manager.save();
                        console.log('User manager saved successfully.');
                    } catch (error) {
                        console.error('Error saving user manager:', error.message);
                   
                    }
            }else{
               console.log("hello");
            }
            }
        
            

        if(user_orderr){
            return {
                // message: "data fetched successfully",
                data:user_address,
                success: true,
              };
        }
        else {
            return {
              message: "data did not fetch",
              data: [],
              success: false,
            };
          }

    } catch (error) {
     console.log(error);   
    }


}