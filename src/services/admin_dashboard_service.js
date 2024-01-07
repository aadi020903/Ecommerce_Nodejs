const adminModel = require("../model/admin_model");

exports.admin_dashboard_get = async (req) => {
    try {
      if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
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
      }
    } catch (error) {
      console.log(error);
    }
  };