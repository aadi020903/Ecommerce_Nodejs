const userModel = require("../model/user_model");
const adminModel = require("../model/admin_model");
const jwtoken = require("jsonwebtoken");
const axios = require("axios");

exports.admin_user_manager = async (req, res) => {
    try {
      const token = req.cookies.jwt;
      const admin_data = await adminModel.findOne({ auth_key: token });

      const user_data = await userModel.find();

      if (user_data) {
        return {
          message: "data fetched successfully",
          data: user_data,
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
    } catch (error) {
      console.log(error);
    }
  };
exports.admin_user_manager_status = async (req, res) => {
    try {
      // const token = req.cookies.jwt;
      let _id = req.body._id;
      let answer = req.body.answer;

      console.log(_id);
      console.log(answer);

      const user_data = await userModel.findByIdAndUpdate({_id:_id},{
        status:answer,
      });
      user_data.save();
      // console.log("hello"+user_data)
      // const user_data_data = await userModel.find();
      
      if (user_data) {
        return {
          message: "data fetched successfully",
          data: user_data,
          success: true,
        };
      } else {
        return {
          message: "data did not fetch",
          data: [],
          success: false,
        };
      }
    
    } catch (error) {
      console.log(error);
    }
  };


