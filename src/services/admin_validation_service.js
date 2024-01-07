const adminModel = require("../model/admin_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let dotenv = require("dotenv");
const axios = require("axios");
const _ = require('lodash');

//Admin Register Save

async function getZipCodeInfoIndia(zipCode) {
  try {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${zipCode}`
    );
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
    console.error(
      `Error fetching Indian ZipCode information: ${error.message}`
    );
    return { city: "", state: "" };
  }
}
exports.admin_register_save = async (req) => {
  try {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    firstname = _.capitalize(firstname)
    lastname = _.capitalize(lastname)
    let a_name = firstname + " " + lastname;

    let a_mobile = req.body.a_mobile;
    let a_email = req.body.a_email;
    let password = req.body.password;
    let ZipCode = req.body.ZipCode;
    let address = req.body.address;
    let image =  "blank_profile.jpg";


    let checkEmail = await adminModel.findOne({ a_email: a_email });
    if (checkEmail) {
      return {
        success: false,
      };
    } else {
      let hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);

      // Determine the country based on the ZipCode length
      let zipCodeInfo;

      if (ZipCode.length === 5) {
        // Assuming US ZipCode
        zipCodeInfo = await getZipCodeInfoUS(ZipCode);
      } else if (ZipCode.length === 6) {
        // Assuming Indian ZipCode
        zipCodeInfo = await getZipCodeInfoIndia(ZipCode);
      } else {
        console.error(`Invalid ZipCode length: ${ZipCode}`);
        return {
          message: "Invalid ZipCode length",
          data: [],
          success: false,
        };
      }

      let admin_data = new adminModel({
        a_name: a_name,
        a_mobile: a_mobile,
        a_email: a_email,
        address: address,
        password: hashPassword,
        zipcode: ZipCode,
        city: zipCodeInfo.city,
        state: zipCodeInfo.state,
        image,
      });

      console.log(zipCodeInfo.city);
      console.log(zipCodeInfo.state);

      let adminData = await admin_data.save();
      if (adminData) {
        return {
          message: "data saved successfully",
          data: admin_data,
          success: true,
        };
      } else {
        return {
          message: "data did not save",
          data: [],
          success: false,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//Admin Login Post
exports.admin_login_save = async (req, res) => {
  // const firstname = req.body.firstname;
  const password = req.body.password;
  const a_email = req.body.a_email;

  // console.log(`${a_email} and password is ${password}`);

  try {
    let foundUser = await adminModel.findOne({ a_email: a_email });
    // console.log(foundUser);
    if (foundUser) {
      // console.log(foundUser);
      let result = await bcrypt.compare(password, foundUser.password);
      // console.log(result);
      if (result == true) {
        const token = await jwt.sign(
          {
            _id: this._id,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "90s",
          }
        );
        await adminModel.findByIdAndUpdate(foundUser._id, { auth_key: token });
        res.cookie("jwt", token, {});

        let a_name = foundUser.a_name;
        return {
          // a_name: a_name,
          data:foundUser,
          message: "User Found",
          success: true,
        };
      } else {
        return {
          message: "User Not Found INVALID CREDENTIALS",
          success: false,
        };
      }
    } else {
      return {
        message: "User Not Found INVALID CREDENTIALS",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
