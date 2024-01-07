const userModel = require("../model/user_model");
const addressModel = require("../model/address_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let dotenv = require("dotenv");
const axios = require("axios");
const _ = require("lodash");

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

async function getZipCodeInfoIndia2(zipCode) {
  try {
    const response = await axios.get(
      `https://geocode.maps.co/search?q=${zipCode}`
    );
    const data = response.data;

    if (data && data.length > 0) {
      const firstResult = data[0];
      const latitude = firstResult.lat;
      const longitude = firstResult.lon;
      const displayName = firstResult.display_name;

      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
      console.log("Display Name:", displayName);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        return { latitude, longitude };
      } else {
        console.error(
          `Invalid latitude or longitude values for ZipCode: ${zipCode}`
        );
        return { latitude: "", longitude: "" };
      }
    } else {
      console.error(`Invalid ZipCode or no data found for ZipCode: ${zipCode}`);
      return { latitude: "", longitude: "" };
    }
  } catch (error) {
    console.error(
      `Error fetching Indian ZipCode information: ${error.message}`
    );
    return { latitude: "", longitude: "" };
  }
}

// User Register Save Post
exports.user_register_save = async (req) => {
  try {

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    firstname = _.capitalize(firstname);
    lastname = _.capitalize(lastname);
    let u_name = firstname + " " + lastname;
    let u_mobile = req.body.u_mobile;
    let u_email = req.body.u_email;
    let password = req.body.password;
    let image = req.body.photos;
    let gender = req.body.gender;
    gender = _.capitalize(gender);

    let house_number = req.body.house_number;
    let street_name = req.body.street_name;
    let landmark = req.body.landmark;
    let type = req.body.type;
    let ZipCode = req.body.ZipCode;
    let city = req.body.city;
    let state = req.body.state;
    city = _.capitalize(city);
    state = _.capitalize(state);
    let primary = req.body.primary;

    let checkEmail = await userModel.findOne({ u_email: u_email });
    if (checkEmail) {
      console.log("If")
      return {
        message: "User Already Found",
        success: false,
      };
    } else {
      let hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);

      // Determine the country based on the ZipCode length
      let zipCodeInfo;
      let zipCodeInfo2;

      if (ZipCode.length === 5) {
        // Assuming US ZipCode
        zipCodeInfo = await getZipCodeInfoUS(ZipCode);
      } else if (ZipCode.length === 6) {
        // Assuming Indian ZipCode
        zipCodeInfo = await getZipCodeInfoIndia(ZipCode);
        zipCodeInfo2 = await getZipCodeInfoIndia2(ZipCode);
        // const zipcode = "Alwar";
        // zipCodeInfo2 = await getZipCodeInfoIndia2(zipcode);
      } else {
        console.error(`Invalid ZipCode length: ${ZipCode}`);
        return {
          message: "Invalid ZipCode length",
          data: [],
          success: false,
        };
      }

      let user_data = new userModel({
        u_name: u_name,
        u_mobile: u_mobile,
        u_email: u_email,
        password: hashPassword,
        gender: gender,
      });

      let userData = await user_data.save();
      let user = await userModel.findOne({ u_email: u_email });

      type = type == undefined || type == "" ? "Home" : "Office";

      // primary = primary == undefined || primary = "" ? "" 


      let address_data = new addressModel({
        user_id: user._id,
        entries: [
          {
            name: u_name,
            mobile: u_mobile,
            house_number: house_number,
            street_name: street_name,
            landmark: landmark,
            type: type,
            zipcode: ZipCode,
            city: zipCodeInfo.city,
            state: zipCodeInfo.state,
            latitude: zipCodeInfo2.latitude,
            longitude: zipCodeInfo2.longitude,
            primary: primary,
          },
        ],
      });
      let addressData = await address_data.save();
      console.log(userData);
      console.log(addressData);

      if (userData && addressData) {
        return {
          message: "data saved successfully",
          data: user_data,
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

// User Login Post
exports.user_login_save = async (req, res) => {
  // const firstname = req.body.firstname;
  let u_email = req.body.u_email;
    let password = req.body.password;

  // console.log(`${a_email} and password is ${password}`);

  try {
    let foundUser = await userModel.findOne({ u_email: u_email });
    console.log(foundUser);
    if (foundUser) {
      // console.log(foundUser);
      let result = await bcrypt.compare(password, foundUser.password);
      console.log(result);
      if (result == true) {
        const token = await jwt.sign(
          {
            _id: this._id,
          },
          process.env.SECRET_KEY,
          // {
          //   expiresIn:"90s"
          // }
        );
        await userModel.findByIdAndUpdate(foundUser._id, { auth_key: token });
        res.cookie("jwt", token, {});

        let image = foundUser.image;

        const token1 = token;

        return {
          image: image,
          token:token1,
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
    return {
      message: "User Not Found INVALID CREDENTIALS",
      success: false,
    };
  }
};
