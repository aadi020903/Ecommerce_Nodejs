const { reset } = require("nodemon");
const {
  admin_register_save,
  admin_login_save,
} = require("../services/admin_validation_service");

exports.admin_register = async (req, res) => {
  res.render("admin_register");
};
exports.admin_register_save = async (req, res) => {
  let data = await admin_register_save(req);
  if (data.success) {
    res.render("admin_login");
    // console.log(data.message);
  } else {
    console.log("User Already Exists");
  }
};

exports.admin_login = async (req, res) => {
  res.render("admin_login");
};

exports.admin_login_save = async (req, res) => {
  let data = await admin_login_save(req, res);
  if (data.success) {
    // res.render("admin_profile");
    res.redirect("admin_dashboard");
  } else {
    console.log("invalid user");
  }
};
