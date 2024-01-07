const userModel = require("../model/user_model");
const addressModel = require("../model/address_model");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { forEach } = require("lodash");

exports.user_address_manager = async (req, res) => {
    try {

      const token = req.headers.token;

      const user_data =await userModel.findOne({ auth_key: token }); 
      let user_id = user_data._id;

      const address_data = await addressModel.findOne({user_id:user_id});
      console.log(address_data);     
            
      if (address_data) {
     
        return {
          success: true,
          message: "View All Addresses",
          address_data: address_data.entries,
        };
        
      } else {
        return {
          message: "Something Went Wrong",
          data: [],
          success: false,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };


exports.user_address_manager_update = async (req, res) => {
    try {
      const token = req.headers.token;
      const user_data =await userModel.findOne({ auth_key: token }); 
      let user_id = user_data._id;
    
    
      const _id=req.body._id
      

      const name=req.body.name;
      const mobile=req.body.mobile;
      const house_number=req.body.house_number;
      const street_name=req.body.street_name;
      const landmark=req.body.landmark;
      const city=req.body.city;
      const state=req.body.state;
      const latitude=req.body.latitude;
      const longitude=req.body.longitude;
      const type=req.body.type;
      const primary=req.body.primary;
      const zipcode=req.body.zipcode;
      
      let address_data = await addressModel.findOne({ user_id: user_id });   


      console.log(address_data); 
      console.log(street_name); 

      let address_entries = address_data.entries.find(address_entries => address_entries._id == _id)

      address_entries.name = name;
      address_entries.house_number = house_number;
      address_entries.street_name = street_name;
      address_entries.mobile = mobile;
      address_entries.city = city;
      address_entries.state = state;
      address_entries.landmark = landmark;
      address_entries.latitude = latitude;
      address_entries.primary = primary;
      address_entries.zipcode = zipcode;
      address_entries.type = type;
      address_entries.longitude = longitude;
      
      await address_data.save();

      
            
      if (address_data) {
     
        return {
          message: "update successfully",
          data: address_data,
          success: true,
        };
        
      } else {
        
        return {
          message: "data did not update",
          data: [],
          success: false,
        };
        
      }
    
    } catch (error) {
      console.log(error);
    }
  };

exports.user_address_manager_delete = async (req, res) => {
    try {
      
      const token = req.headers.token;
      const user_data =await userModel.findOne({ auth_key: token }); 
      let user_id = user_data._id;
      const _id=req.body._id
      
      
      let address_data =await addressModel.findOne({ user_id: user_id });   

      let address_entries = address_data.entries.findIndex(address_entries => address_entries._id == _id)

      let arr=[];

      for(let i=0;i<address_data.entries.length;i++){
        if(address_data.entries[i]!==address_data.entries[ address_entries]){
          arr.push(address_data.entries[i]);
          await address_data.save();
        }
      }
      console.log(arr); 

      await addressModel.findOneAndUpdate({user_id:user_id},
        {$set:{ entries:arr}}
        );

      // await address_data.save();
      // $push:(address_data,arr)

     
      console.log(address_entries);      
      // await address_data.save();

      
            
      if (address_data) {
     
        return {
          message: "address delet successfully",
          data: address_data,
          success: true,
        };
        
      } else {
        
        return {
          message: "address did not delet",
          data: [],
          success: false,
        };
        
      }
    
    } catch (error) {
      console.log(error);
    }
  };


  exports.user_address_manager_added = async (req, res) => {
    try {
      
      const token = req.headers.token;
    
      let user_data = await userModel.findOne({ auth_key: token });
      let user_id = user_data._id;

      const name=req.body.name;
      const mobile=req.body.mobile;
      const house_number=req.body.house_number;
      const street_name=req.body.street_name;
      const landmark=req.body.landmark;
      const city=req.body.city;
      const state=req.body.state;
      const latitude=req.body.latitude;
      const longitude=req.body.longitude;
      const type=req.body.type;
      const primary=req.body.primary;
      const zipcode=req.body.zipcode;

      let address_data = await addressModel.findOne({ user_id: user_id });

      if(address_data) {
        address_data.entries.push({
           name: name,
           mobile: mobile,
           house_number: house_number,
           street_name: street_name,
           landmark: landmark,
           city: city,
           state: state,
           latitude: latitude,
           longitude: longitude,
           type: type,
           primary: primary,
           zipcode: zipcode,
        })

        let added_address = await addressModel.findOneAndUpdate(
          { user_id: user_id },
          { $set: { entries: address_data.entries } },
          { new: true }
        );
        if (added_address) {
          return {
            message: "New Address Added Successfully",
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
        // If data1 doesn't exist, create a new entry
        let savedata = new addressModel({
          user_id: user_id,
          entries: [
            {
              name: name,
              mobile: mobile,
              house_number: house_number,
              street_name: street_name,
              landmark: landmark,
              city: city,
              state: state,
              latitude: latitude,
              longitude: longitude,
              type: type,
              primary: primary,
              zipcode: zipcode,
            },
          ],
        });
        let saved_data = await savedata.save();
  
        if (saved_data)
          return {
            message: "New Address Added Successfully",
            success: true,
          };
        else {
          return {
            message: "Something Went Wrong",
            success: false,
          };
        }
      }

    } catch (error) {
      console.log(error);
    }
  };