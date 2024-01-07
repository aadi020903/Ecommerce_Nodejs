// const transactionModel = require("../model/transaction_model");
const front_bannerModel = require("../model/front_banner_model");
const end_bannerModel = require("../model/end_banner_model");
const adminModel = require("../model/admin_model");


exports.banner_front = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const admin_data = await adminModel.findOne({ auth_key: token });

    if(admin_data){
      return {
        message: "data fetched successfully",
        admin_data:admin_data,
        success: true,
      };
    }
    else{
      return {
        message: "data did not fetch",
        data: "",
        success: false,
      };
    }
  } catch (error) {
    console.error({ message: error.message });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.banner_front_add = async (req, res) => {
    try {
      let photos_desktop = [];
  for (let i = 0; i < Math.min(req.files.length, 4); i++) {
    photos_desktop.push(req.files[i].filename);
  }
      console.log(photos_desktop);

      let front_banner = new front_bannerModel({
        photos_desktop :photos_desktop,
      });
  
      let front_banner_data = await front_banner.save();
      if (front_banner_data) {
        return {
          message: "front banner added successfully",
          data: front_banner_data,
          success: true,
        };
      } else {
        return {
          message: "front banner not added",
          data: [],
          success: false,
        };
      }
    } catch (error) {
      console.log(error + " front banner Error");
    }
  };

  exports.banner_end = async (req, res) => {
    try {
      const token = req.cookies.jwt;
      const admin_data = await adminModel.findOne({ auth_key: token });
  
      if(admin_data){
        return {
          message: "data fetched successfully",
          admin_data:admin_data,
          success: true,
        };
      }
      else{
        return {
          message: "data did not fetch",
          data: "",
          success: false,
        };
      }
    } catch (error) {
      console.error({ message: error.message });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.banner_end_add = async (req, res) => {
    try {
      let photos_desktop = req.file;
      console.log(photos_desktop);

      let end_banner = new end_bannerModel({
        photos_desktop :req.file.filename,
      });
  
      let end_banner_data = await end_banner.save();
      if (end_banner_data) {
        return {
          message: "end banner added successfully",
          data: end_banner_data,
          success: true,
        };
      } else {
        return {
          message: "end banner not added",
          data: [],
          success: false,
        };
      }
    } catch (error) {
      console.log(error + " end banner Error");
    }
  };