const adminModel = require("../model/admin_model");
const category_model = require("../model/category_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let dotenv = require("dotenv");

exports.add_new_category = async (req) => {
  try {
    const token = req.cookies.jwt;
    const admin_data = await adminModel.findOne({ auth_key: token });

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

exports.add_new_subcategory = async (req) => {
  try {
    const token = req.cookies.jwt;
    let admin_data = await adminModel.findOne({ auth_key: token });

    let allCategories = await category_model.find();
    admin_data = { admin_data, allCategories };

    if (admin_data) {
      return {
        message: "data fetched successfully",
        data: admin_data,
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

exports.added_category = async (req) => {
  try {
    let category = req.body.category;
    // console.log(category);
    const existingCategory = await category_model.findOne({
      category_name: category,
    });

    if (existingCategory) {
      return {
        message: "Category already exists",
        success: false,
      };
    }

    let data = await category_model({
      category_name: category,
    });



    let category_data = await data.save();

    // console.log(category_data);
    if (category_data) {
      return {
        message: "data fetched successfully",
        data: category_data,
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

exports.added_subcategory = async (req, res) => {
  try {
    let category = req.body.category;
    let sub_category = req.body.sub_category;

    // console.log(category, sub_category);

    // Find the category where you want to add the subcategory
    let existingCategory = await category_model.findOne({
      category_name: category,
    });

    if (existingCategory) {
      // Check if the subcategory already exists in the category
      const subCategoryExists = existingCategory.sub_categories.some(
        (sub) => sub.name === sub_category
      );

      if (subCategoryExists) {
        return {
          message: "Subcategory already exists in the category",
          success: false,
        };
      } else {
        // Push the new subcategory to the sub_categories array
        existingCategory.sub_categories.push({ name: sub_category });

        // Save the updated category with the new subcategory
        let updatedCategory = await existingCategory.save();

        if (updatedCategory) {
          return {
            message: "Subcategory added successfully",
            data: updatedCategory,
            success: true,
          };
        } else {
          return {
            message: "Failed to add subcategory",
            data: [],
            success: false,
          };
        }
      }
    } else {
      return {
        message: "Category not found",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
