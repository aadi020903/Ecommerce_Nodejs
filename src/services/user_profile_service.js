const userModel = require("../model/user_model");
const addressModel = require("../model/address_model");
const jwtoken = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcryptjs");


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
exports.user_profile = async (req) => {
  try {
      const token = req.headers.token;
      let user_data1 = await userModel.findOne({ auth_key: token });

      const user_data = {
        u_name : user_data1.u_name,
        u_mobile : user_data1.u_mobile,
        u_email : user_data1.u_email,
        image : user_data1.image,
      }

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

exports.user_profile_updated = async (req, res) => {
  try {
      const token = req.headers.token;

      let image = req.file;
      let u_email = req.body.u_email;

      if (image == undefined) {

        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let u_name = firstname.trim() + " " + lastname.trim();
        let u_mobile = req.body.u_mobile;

        console.log(u_name);
        console.log(u_mobile);

        let user_data = await userModel.findOneAndUpdate(
          { auth_key: token },
          {
            u_name: u_name,
            u_mobile: u_mobile,
          },
          { new: true }
        );
        if (user_data) {
          return {
            message: "Profile Updated Successfully",
            data: user_data,
            success: true,
          };
        } else {
          return {
            message: "Something Went Wrong",
            data: [],
            success: false,
          };
        }
      } else {

        console.log(image);

        let user_data = await userModel.findOneAndUpdate(
          { auth_key: token },
          {
            image: req.file.filename,
          },
          { new: true }
        );
        if (user_data) {
          return {
            message: "Profile Picture Updated Successfully",
            data: user_data,
            success: true,
          };
        } else {
          return {
            message: "Something Went Wrong",
            data: [],
            success: false,
          };
        }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.user_password_updated = async (req, res) => {
  try {
      const token = req.headers.token;

      let old_password = req.body.oldpassword;
      let new_password = req.body.newpassword;

      console.log(old_password);
      console.log(new_password);
      
        const user_data = await userModel.findOne({ auth_key: token });
        console.log(user_data);

        const password = user_data.password
        console.log(password);

        if (user_data) {
          let result = await bcrypt.compare(old_password, password);
          console.log(result);

          let hashPassword = await bcrypt.hash(new_password, 10);
          console.log(hashPassword);

          if (result) {
            let user = await userModel.findOneAndUpdate(
                    { auth_key: token },
                    {
                      password:hashPassword,
                     
                    },)
                    if (user) {
                      return {
                        message: "data updated successfully",
                        data: user_data,
                        success: true,
                      };
                    }
            

        if (result) {
          return {
            data: [],
            success: true,
          };
        } else {
          return {
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

