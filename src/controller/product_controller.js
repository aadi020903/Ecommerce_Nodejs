const { reset } = require("nodemon");
const productModel = require('../model/product_model')
const category_model = require("../model/category_model");

const {
  product_add,
  product_added,
  product_update,
  product_viewer,
  product_update_post,
} = require("../services/product_service");

exports.product_add = async (req, res) => {
  let data = await product_add(req, res);
  // console.log(data.admin_data);
  if (data.success) {
    res.render("product_add", {
      admin_data: data.admin_data.admin_data,
      category_data: data.admin_data.allCategories,
    });
  } else {
    res.send("Error Happened");
  }
};

exports.product_added = async (req,res)=>{
    let data = await product_added(req,res);
    if(data.success){
      res.redirect("product_add");
    }
    else{
        res.send("product_not_added");
    }
}

exports.product_viewer = async (req,res)=>{
  let data = await product_viewer(req,res);
  if(data.success){
      res.render("product_viewer",{product_data:data.data, admin_data:data.admin_data});
  }
  else{
      res.send("product_not_added");
  }
}

exports.product_update_get = async (req,res)=>{
  let data = await product_update(req,res);
  if(data.success){
      res.render("product_update",{data:data.data, admin_data:data.admin_data,category_data:data.category_data});
  }
  else{
      res.send("product_not_added");
  }
}

exports.product_update_post = async (req,res)=>{
  let data = await product_update_post(req,res);
  if(data.success){
      // res.render("product_update",{data:data.data});
      res.redirect("product_viewer");
  }
  else{
      res.send("product_not_added");
  }
}


exports.getSubCategories = async (req, res) => {
  try {
    const selectedCategory = req.params.categoryId; // Assuming the category ID is passed in the URL
    console.log(selectedCategory);
    let subCategories = await category_model.find({ category_name: selectedCategory });
    subCategories = (subCategories[0].sub_categories);
    console.log(subCategories);
    
    res.status(200).json(subCategories); // Sending the sub-categories as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
