const jwt = require("jsonwebtoken");
const userModel = require("../src/model/user_model");

module.exports = async (req, res, next) => {
  try {
    console.log("req.cookies", req.cookies);
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.headers.token;
      const { _id } = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await userModel.findOne({ _id });
      if (req.user) {
        next();
      } else {
        res.render("user_home");
      }
    } else {
      res.render("user_login");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
};
