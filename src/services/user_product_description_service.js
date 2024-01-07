const userModel = require("../model/user_model");
const productsModel = require("../model/product_model");

exports.user_product_description = async (req, res) => {
  try {

    let _id = req.query._id;

    let product_data1 = await productsModel.findById({_id});

    const product_data = {
        name : product_data1.name,
        subname : product_data1.subname,
        price : product_data1.price,
        description : product_data1.description,
        main_photo : product_data1.main_photo,
        photos : product_data1.photos,
    }

    console.log("Product Data :- ",product_data);

    let category = product_data1.category;
    console.log("Product Category : ",category);

    let recommended_data = await productsModel.find({category:category});

    console.log("Recommended Data :- ",recommended_data);

    if (product_data) {
      return {
        message: "Product Data and Recommended Data",
        success: true,
        product_data: product_data,
        recommended_data: recommended_data,
      };
    } else {
      return {
        message: "No data found",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    console.log(error + " Product Description Error");
    return {
      message: "Internal server error",
      data: [],
      success: false,
    };
  }
};
