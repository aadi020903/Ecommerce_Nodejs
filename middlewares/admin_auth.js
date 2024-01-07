const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
const admin_model = require("../src/model/admin_model");

const admin_auth = async (req, res, next) => {
  try {
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
      const { _id } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await admin_model.findOne({ _id });
      if (user) {
        next();
      } else {
        res.render("admin_login");
      }
    } else {
      res.render("admin_login");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = admin_auth;
