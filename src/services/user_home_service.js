const userModel = require("../model/user_model");
const front_bannerModel = require("../model/front_banner_model");
const end_bannerModel = require("../model/end_banner_model");
const categoryModel = require("../model/category_model");
const top_productsModel = require("../model/top_products_model");
const top_sellerModel = require("../model/top_seller_model");

exports.user_home = async (req, res) => {
  try {

    let category_data = await categoryModel.find();

    let front_banner_data = await front_bannerModel.findOne();

    let end_banner_data = await end_bannerModel.findOne();

    const top_products_data = await top_productsModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product_details",
        },
      },
      {
        $unwind: "$product_details",
      },
      {
        $project: {
          _id: 1,
          name: "$product_details.name",
          price: "$product_details.price",
          image: "$product_details.main_photo",
        },
      },
    ]);


    const top_seller_data = await top_sellerModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product_details",
        },
      },
      {
        $unwind: "$product_details",
      },
      {
        $project: {
          _id: 1,
          name: "$product_details.name",
          price: "$product_details.price",
          image: "$product_details.main_photo",
        },
      },
    ]);

    if (category_data) {
      return {
        message: "Data retrieved successfully",
        category_data: category_data,
        front_banner_data: front_banner_data,
        end_banner_data: end_banner_data,
        top_products_data: top_products_data,
        top_seller_data: top_seller_data,
        success: true,
      };
    } else {
      return {
        message: "No data found",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    console.log(error + " Delivery Manager Error");
    return {
      message: "Internal server error",
      data: [],
      success: false,
    };
  }
};






