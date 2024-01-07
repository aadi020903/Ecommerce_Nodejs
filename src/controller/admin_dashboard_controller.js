const {
    admin_dashboard_get,
  } = require("../services/admin_dashboard_service");
  
exports.admin_dashboard_get = async (req, res) => {
    let data = await admin_dashboard_get(req, res);
    if (data.success) {
      res.render("admin_dashboard", { admin_data: data.admin_data });
    } else {
      console.log("Invalid user");
    }
};