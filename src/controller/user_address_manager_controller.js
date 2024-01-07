const {
    user_address_manager_added,
    user_address_manager,
    user_address_manager_update,
    user_address_manager_delete,
    
  } = require("../services/user_address_manager_service");

  exports.user_address_manager_added = async (req, res) => {
    let data = await user_address_manager_added(req, res);
    
    if(data.success) {
      res.status(200).send({
        message: data.message
      })
    }
  };

exports.user_address_manager = async (req, res) => {
    let data = await user_address_manager(req, res);
    
    if(data.success) {
      res.status(200).send({
        message: data.message,
        address_data: data.address_data,
      })
    }
  };

  
exports.user_address_manager_update = async (req, res) => {
    let data = await user_address_manager_update(req, res);
    if(data.success) {
      res.status(200).send({
        message: data.message,
        // address_data: data.address_data,
      })
    }
    else{
      res.status(401).send({
        message: data.message,
        // address_data: data.address_data,
      })
    }
  };

exports.user_address_manager_delete = async (req, res) => {
    let data = await user_address_manager_delete(req, res);
    if(data.success) {
      res.status(200).send({
        message: data.message,
        // address_data: data.address_data,
      })
    }
    else{
      res.status(401).send({
        message: data.message,
        // address_data: data.address_data,
      })
    }
  };
