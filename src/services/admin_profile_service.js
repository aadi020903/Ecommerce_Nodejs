const adminModel = require("../model/admin_model");
const jwtoken = require("jsonwebtoken");
const axios = require("axios");
const _ = require('lodash');



async function getZipCodeInfoIndia(zipCode) {
  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${zipCode}`);
    const data = response.data;
    if (data && data[0] && data[0].PostOffice) {
      const postOffice = data[0].PostOffice[0];
      const city = postOffice.District;
      const state = postOffice.State;
      return { city, state };
    } else {
      console.error(`Invalid ZipCode or no data found for ZipCode: ${zipCode}`);
      return { city: "", state: "" };
    }
  } catch (error) {
    console.error(`Error fetching Indian ZipCode information: ${error.message}`);
    return { city: "", state: "" };
  }
}
exports.admin_profile = async (req) => {
  try {
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
      const admin_data = await adminModel.findOne({ auth_key: token });
      console.log(admin_data);
      console.log(admin_data.image);
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

exports.admin_profile_update = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

exports.admin_profile_updated = async (req, res) => {
  try {
    console.log("here");
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;

      let firstname = req.body.firstname;
      let lastname = req.body.lastname;
      firstname = _.capitalize(firstname)
      lastname = _.capitalize(lastname)
      let a_name = firstname.trim()+" "+lastname.trim();
      let a_mobile = req.body.a_mobile;
      let a_email = req.body.a_email;
      let ZipCode = req.body.ZipCode;
      let image = req.file;
      
      // console.log(a_name);
      console.log(a_name);
      console.log(a_email);
      console.log(a_mobile);
      console.log(ZipCode);
      console.log(image);

      zipCodeInfo = await getZipCodeInfoIndia(ZipCode);

      if(image == undefined)
      {
        let admin_data = await adminModel.findOneAndUpdate(
          { auth_key: token },
          {
            a_name:a_name,
            a_email:a_email,
            a_mobile:a_mobile,
            zipcode:ZipCode,
            city:zipCodeInfo.city,
            state:zipCodeInfo.state,
            // image: "blank_profile.jpg",
          },
          { new: true },
        );
        if (admin_data) {
          return {
            message: "data updated successfully",
            admin_data: admin_data,
            success: true,
          };
        } else {
          return {
            message: "data did not update",
            data: [],
            success: false,
          };
        }
      }else {
        let admin_data = await adminModel.findOneAndUpdate(
          { auth_key: token },
          {
            a_name:a_name,
            a_email:a_email,
            a_mobile:a_mobile,
            zipcode:ZipCode,
            city:zipCodeInfo.city,
            state:zipCodeInfo.state,
            image: req.file.filename,
          },
          { new: true },
        );
        if (admin_data) {
          return {
            message: "data updated successfully",
            data: admin_data,
            success: true,
          };
        } else {
          return {
            message: "data did not update",
            data: [],
            success: false,
          };
        }
      }
      
      
    }
  } catch (error) {
    console.log(error);
  }
};
