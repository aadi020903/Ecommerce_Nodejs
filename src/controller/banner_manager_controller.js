const {
    banner_front,
    banner_front_add,
    banner_end,
    banner_end_add,
  } = require("../services/banner_manager_service");
  
  exports.banner_front = async (req, res) => {
    let data = await banner_front(req, res);
    if (data.success) {
      res.render("banner_front",{admin_data:data.admin_data});
    } else {
      console.log("Invalid user");
    }
  };

  exports.banner_front_add = async (req, res) => {
    let data = await banner_front_add(req, res);
    if (data.success) {
        res.redirect("admin_dashboard");
    } else {
      console.log("Invalid user");
    }
  };
  

  exports.banner_end = async (req, res) => {
    let data = await banner_end(req, res);
    if (data.success) {
      res.render("banner_end",{admin_data:data.admin_data});
    } else {
      console.log("Invalid user");
    }
  };

  exports.banner_end_add = async (req, res) => {
    let data = await banner_end_add(req, res);
    if (data.success) {
        res.redirect("admin_dashboard");
    } else {
      console.log("Invalid user");
    }
  };