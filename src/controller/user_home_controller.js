const { reset } = require("nodemon");
const { user_home } = require("../services/user_home_service");

exports.user_home = async (req, res) => {
  let data = await user_home(req,res);
  if(data.success)
  {
    // //Category Data End
    // console.log("Category Data :-");
    // for (const category of data.category_data) {
    //     console.log("Category Name:", category.category_name);
    //     console.log("Sub-categories:");
    //     for (const subCategory of category.sub_categories) {
    //       console.log("-", subCategory.name);
    //     }
    //   }
    // console.log("");


    // // Front Banner Data
    // console.log("Front Banner Data :-");
    // for (let i = 0; i < data.front_banner_data.photos_desktop.length; i++) {
    //     console.log(`Image ${(i + 1)}: `, data.front_banner_data.photos_desktop[i]);
    //   }
    // console.log("");


    // // End Banner Data
    // console.log("End Banner Data :-");
    // console.log("End Banner Image : ",data.end_banner_data.photos_desktop)
    // console.log("");


    // // Top Products Data
    // console.log("Top Products Data :-");
    // console.log(data.top_products_data);
    // console.log("");

    // // Top Seller Data
    // console.log("Top Seller Data :-");
    // console.log(data.top_seller_data);
    // console.log("");
    res.status(200).send({
      category_data:data.category_data,
      front_banner_data:data.front_banner_data,
      top_products_data:data.top_products_data,
      top_seller_data: data.top_seller_data,
      end_banner_data: data.end_banner_data,
     })
  }
  else{
    res.status(401).send({
      message: "Something Went Wrong",
    })
  }
}