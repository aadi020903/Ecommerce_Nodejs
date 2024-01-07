const { reset } = require("nodemon");
const {
    buy_now,
    // view_cart,

    
  } = require("../services/buy_now_service");
  exports.buy_now = async (req, res) => {
      let data = await buy_now(req,res); 
    console.log(data.data);
    if (data.success) {
        res.status(200).send({
            
            message:"order placed successfully",
          })
      
    } else {
        res.status(401).send("someting went wrong")
        
      }
  };