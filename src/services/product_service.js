const productModel = require("../model/product_model");
const adminModel = require("../model/admin_model");
const category_model = require("../model/category_model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let dotenv = require("dotenv");
const axios = require("axios");
const fs = require('fs').promises;

exports.product_add = async (req) => {
  try {
      const token = req.cookies.jwt;
      let admin_data = await adminModel.findOne({ auth_key: token });

      let allCategories = await category_model.find();
      admin_data = {admin_data,allCategories}
      if (admin_data) {
        return {
          message: "data fetched successfully",
          admin_data: admin_data,
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
    console.log(error);
  }
};

exports.product_added = async (req, res) => {
  try {
    let name = req.body.name;
    let subname = req.body.subname;
    let brand = req.body.brand;
    let category = req.body.category;
    let sub_category = req.body.sub_category;
    let delivery_category = req.body.delivery_category;
    let mrp = req.body.mrp;
    let price = req.body.price;
    let discount = req.body.discount;
    let size = req.body.size;
    let color = req.body.color;
    let description = req.body.description;
    let quantity = req.body.quantity;
    let photos = [];
    let main_photo = null;

    if (req.files['main_photo'] && req.files['main_photo'].length > 0) {
        main_photo = req.files['main_photo'][0].filename;
    }

    if (req.files['photos'] && req.files['photos'].length > 0) {
        for (let i = 0; i < Math.min(req.files['photos'].length, 4); i++) {
            photos.push(req.files['photos'][i].filename);
        }
      }
    
    console.log(main_photo);
    console.log(photos);

    let product_data = new productModel({
      name: name,
      subname: subname,
      brand: brand,
      category: category,
      sub_category: sub_category,
      delivery_category: delivery_category,
      mrp: mrp,
      price: price,
      discount: discount,
      size: size,
      color: color,
      description: description,
      quantity: quantity,
      photos :photos,
      main_photo: main_photo,
    });
    console.log({ product_data });

    let productData = await product_data.save();
    if (productData) {
      return {
        message: "product added successfully",
        data: product_data,
        success: true,
      };
    } else {
      return {
        message: "product not added",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    console.log(error + " Product Error");
  }
};

exports.product_viewer = async(req, res) => {
  try{
      const token = req.cookies.jwt;
      const admin_data = await adminModel.findOne({ auth_key: token });

    let data = await productModel.find();

    const product_data = {
       name : data._name,
       subname : data.subname,
       category : data.category,
       mrp : data.mrp,
       price : data.price,
       discount : data.discount,
       quantity : data.quantity,
    }

    console.log(product_data.name);

    if(data){
      return {
        message: "product added successfully",
        data: data,
        admin_data: admin_data,
        success: true,
      };
    }else {
      return {
        message: "product not added",
        data: "",
        success: false,
      };
    }
  }catch (error) {
    console.log(error + " Product Error");
  }
}

exports.product_update = async(req, res) => {
  try{
    const token = req.cookies.jwt;
    const admin_data = await adminModel.findOne({ auth_key: token });

    let id = req.query.id;
    let allCategories = await category_model.find();
    let data = await productModel.findById({_id:id});
    console.log(data);

    const product_data = {
      _id : data._id,
      name : data.name,
      subname : data.subname,
      category : data.category,
      sub_category : data.sub_category,
      size : data.size,
      mrp : data.mrp,
      price : data.price,
      brand : data.brand,
      discount : data.discount,
      quantity : data.quantity,
      description : data.description,
      color : data.color,
      delivery_category : data.delivery_category,
      // image : data.image,
   }

    if(data){
      return {
        message: "product added successfully",
        data: product_data,
        admin_data:admin_data,
        category_data:allCategories,
        success: true,
      };
    }else {
      return {
        message: "product not added",
        data: "",
        success: false,
      };
    }
  }catch (error) {
    console.log(error + " Product Error");
  }
}

exports.product_update_post = async (req, res) => {
  try {
    let id = req.body.id;
    console.log(id);

    // Step 1: Retrieve existing data
    let existingData = await productModel.findById(id);
    let oldPhotos = existingData.photos;

    // Step 2: Remove old photos from the public folder
    if (oldPhotos && oldPhotos.length > 0) {
      const publicFolderPath = '../MICROSUN_ECCMORCE_PROJ/public/products/';
      await Promise.all(
        oldPhotos.map(async (photo) => {
          const filePath = `${publicFolderPath}${photo}`;
          try {
            await fs.unlink(filePath); // Asynchronously delete the file
            console.log(`Deleted file: ${filePath}`);
          } catch (error) {
            console.error(`Error deleting file ${filePath}: ${error.message}`);
          }
        })
      );
    }

    // Step 3: Update data in the database
    // ... (rest of the code remains the same)
    let name = req.body.name;
    let subname = req.body.subname;
    let brand = req.body.brand;
    let category = req.body.category;
    let sub_category = req.body.sub_category;
    let delivery_category = req.body.delivery_category;
    let mrp = req.body.mrp;
    let price = req.body.price;
    let discount = req.body.discount;
    let size = req.body.size;
    let color = req.body.color;
    let description = req.body.description;
    let quantity = req.body.quantity;

    let photos = [];
    for (let i = 0; i < Math.min(req.files.length, 4); i++) {
      photos.push(req.files[i].filename);
    }

    let updatedData = await productModel.findByIdAndUpdate(
      id,
      {  
      name: name,
      subname: subname,
      brand: brand,
      category: category,
      sub_category: sub_category,
      delivery_category: delivery_category,
      mrp: mrp,
      price: price,
      discount: discount,
      size: size,
      color: color,
      description: description,
      quantity: quantity,
      photos :photos,
      },
      { new: true } // To get the updated data after the update operation
    );

    if (updatedData) {
      return {
        message: "Product Updated Successfully",
        data: updatedData,
        success: true,
      };
    } else {
      return {
        message: "Product Not Updated",
        data: "",
        success: false,
      };
    }
  } catch (error) {
    console.log(error + " Product Error");
  }
};

