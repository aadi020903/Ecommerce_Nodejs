const orderModel = require("../model/order_model");
const productModel = require("../model/product_model");
const devliveryModel = require("../model/delivery_model");
const userModel = require("../model/user_model");
const addressModel = require("../model/address_model");

exports.view_order = async (req, res) => {
  let user_view_list = [];
  let u_order = [];
  let ordered_products = [];
  let uu_order = [];
  let product_id = [];
  let item_amount = [];
  let quantity = [];
  let product_detele = [];
  let user_delivery_id = [];
  let user_delivery = [];

  try {
    const token = req.cookies.jwt;
    const view_user = await userModel.findOne({ auth_key: token });
    // console.log(view_user);
    const user_id = view_user._id;
    const view_order = await orderModel.findOne({ user_id: user_id });
    const view_delivery = await devliveryModel.findOne({ user_id: user_id });
    const order = view_order.entries;
    for (let i = 0; i < order.length; i++) {
      u_order.push(order[i]);
    }
    // console.log(u_order)
    for (let i = 0; i < u_order.length; i++) {
      // console.log(u_order[i].order.transaction_date);
      // console.log(u_order[i].order_date);
      ordered_products = u_order[i].ordered_products;
      for (let j = 0; j < ordered_products.length; j++) {
        const ordered_productss = ordered_products[j];
        product_id.push(ordered_productss.product_id);
        quantity.push(ordered_productss.quantity);
        item_amount.push(ordered_productss.item_amount);
      }
      const order_date = u_order[i].order_date;
      const order_id = u_order[i]._id;
      const total_amount = u_order[i].total_amount;

      // user_address_id.push(address_id)
      user_delivery_id.push(order_id);
      uu_order.push({ order_date: order_date, total_amount: total_amount ,order_id:order_id});
    }
    // console.log(uu_order);
    for (let i = 0; i < user_delivery_id.length; i++) {
      const order_id = user_delivery_id[i].toString();
      // console.log(order_id);
      for (let j = 0; j < view_delivery.entries.length; j++) {
        let order = view_delivery.entries[j];
        if (order.order_id == order_id) {
          user_delivery.push({
            delivery_date: order.delivery_date,
            status: order.status,
          });
        }
      }
    }
    // console.log(user_delivery);
    // console.log(product_id);
    // console.log(quantity);
    // console.log(item_amount);
    for (let i = 0; i<product_id.length; i++) {
      const _id = product_id[i];
     
      const view_product = await productModel.findOne({ _id: _id });
     
      // console.log(view_product.main_photo);
      // console.log(view_product.color);
      // console.log(view_product.name);
      product_detele.push({
        product_color: view_product.color,product_name: view_product.name,product_subname:view_product.subname, product_photo:view_product.main_photo});
    }
    // console.log(product_detele);

    if(product_detele,user_delivery, uu_order){
      return {
        // message: "data fetched successfully",
        product_detele: product_detele,
        user_delivery:user_delivery,
        uu_order:uu_order,
        success: true,
      };
    }else {
      return {
        // message: "data did not fetch",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    console.log(error, "asdfgh");
  }
};
