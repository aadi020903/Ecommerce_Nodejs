const {
  admin_profile,
  admin_profile_update,
  admin_profile_updated,
} = require("../services/admin_profile_service");

exports.admin_profile = async (req, res) => {
  let data = await admin_profile(req, res);
  console.log(data.message);
  if (data.success) {
    res.render("admin_profile", { admin_data: data.admin_data });
  } else {
    console.log("Invalid user");
  }
};

exports.admin_profile_update = async (req, res) => {
  let data = await admin_profile_update(req, res);
  if (data.success) {
    res.render("admin_profile_update", { admin_data: data.admin_data });
  } else {
    console.log("Invalid user");
  }
};

exports.admin_profile_updated = async (req, res) => {
  let data = await admin_profile_updated(req, res);
  if (data.success) {
    res.redirect("admin_profile_update");
    console.log(data.admin_data)
  } else {
    console.log("Invalid user");
  }
};


