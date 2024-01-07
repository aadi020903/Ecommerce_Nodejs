const {
  add_new_category,
  add_new_subcategory,
  added_category,
  added_subcategory,
} = require("../services/add_category_service");

exports.add_category = async (req, res) => {
  let data = await add_new_category(req, res);
  if (data.success) {
    res.render("add_category", { admin_data: data.admin_data });
  } else {
    console.log("Invalid user");
  }
};

exports.add_new_subcategory = async (req, res) => {
  let data = await add_new_subcategory(req, res);
  // console.log(data.data.admin_data);
  // console.log(data.data.allCategories);
  // res.send("hi")
  if (data.success) {
    res.render("add_subcategory", { admin_data: data.data.admin_data, category_data: data.data.allCategories });
  } else {
    console.log("Invalid user");
  }
};
exports.added_category = async (req, res) => {
  let data = await added_category(req, res);
  if (data.success) {
    res.redirect("add_subcategory");
  } else {
    console.log("Invalid user");
  }
};


exports.added_subcategory = async (req, res) => {
  let data = await added_subcategory(req, res);
  if (data.success) {
    res.redirect("product_add");
  } else {
    console.log("Invalid user");
  }
};
