const {
    admin_user_manager,
    admin_user_manager_status,
  } = require("../services/admin_user_manager_service");


//   exports.admin_user_manager = async (req, res) => {
//     res.render("admin_user_manager");
//   };
  
  exports.admin_user_manager = async (req, res) => {
    let data = await admin_user_manager(req, res);
    
    if (data.success) {
      res.render("admin_user_manager", { data: data.data, admin_data:data.admin_data });
    //   console.log(data)
    } else {
      console.log("error");
    }
  };

  exports.admin_user_manager_status = async (req, res) => {
    let data = await admin_user_manager_status(req);
    if (data.success) {
      // res.render("admin_user_manager", { data: data.data });
      res.redirect("admin_user_manager");
      // console.log(data.data);
    } else {
      console.log("status not chenged");
    }
  };