const {
    user_profile,
    user_profile_updated,
    user_password_updated,
  } = require("../services/user_profile_service");
  
  exports.user_profile = async (req, res) => {
    let data = await user_profile(req, res);

    if (data.success) {
      console.log(data);
      console.log(data.message);

      res.status(200).send({
        message: "User Profile",
        data : data.data,
      })
    } else {
      res.status(401).send({
        message: "Something Went Wrong",
      })
    }
  };
  
  exports.user_profile_updated = async (req, res) => {
    let data = await user_profile_updated(req, res);
    if (data.success) {
      console.log(data.message);
      res.status(200).send({
        message: data.message,
      })

    } else {
      res.status(401).send({
        message: "Something Went Wrong",
      })
    }
  };
  
  exports.user_password_updated = async (req, res) => {
    let data = await user_password_updated (req, res);
    console.log(data);
    if (data.success) {
      res.status(200).send({
          
          message:"password change successfully",
        })
    
  } else {
      res.status(401).send("someting went wrong")
      
    }
  };