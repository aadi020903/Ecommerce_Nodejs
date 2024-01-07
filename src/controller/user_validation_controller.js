const { reset } = require("nodemon");
const {
  user_register_save,
  user_login_save,
} = require("../services/user_validation_service");

exports.user_register_save = async (req, res) => {
  let data = await user_register_save(req);
  if (data.success) {
    res.status(200).send({
      message: data.message,
    })
  } else {
    res.status(401).send({
      message: data.message,
    })
  }
};  

exports.user_login_save = async (req, res) => {
  let data = await user_login_save(req, res);
  if (data.success) {
    console.log(data.token);
    res.status(200).send({
      message: "Successfully Logined",
      image:data.image,
      token:data.token,
    })
  } else {
    res.status(401).send({
      message: "Wrong Crediantials",
    })
  }
};