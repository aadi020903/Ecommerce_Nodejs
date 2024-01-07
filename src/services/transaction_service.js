const transactionModel = require("../model/transaction_model");
const userModel = require("../model/user_model");
const adminModel = require("../model/admin_model");


exports.transactions_viewer = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const admin_data = await adminModel.findOne({ auth_key: token });
    const data = await transactionModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          u_name: '$user.u_name', // Include the user's name in the output
          image: '$user.image', // Include the user's name in the output
          _id: 1, // Exclude _id from the output
          order_id: 1,
          total_amount: 1,
          pay_mode: 1,
          transaction_date: 1,
        }
      }
    ]);

    if(data){
      return {
        message: "data fetched successfully",
        data: data,
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
