const delivery_model = require("../model/delivery_model");
const orderModel = require("../model/order_model");
const userModel = require("../model/user_model");
const productModel = require("../model/product_model");
const adminModel = require("../model/admin_model");


exports.delivery_manager_get = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const admin_data = await adminModel.findOne({ auth_key: token });
    let data = await delivery_model.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $lookup: {
          from: "orders",
          localField: "entries.order_id",
          foreignField: "entries._id",
          as: "orderDetails"
        }
      },
      {
        $unwind: { path: "$orderDetails", preserveNullAndEmptyArrays: true }
      },
      {
        $project: {
          _id: 1,
          user_id: 1,
          userName: "$userDetails.u_name",
          userEmail: "$userDetails.u_email",
          userMobile: "$userDetails.u_mobile",
          entries: {
            $map: {
              input: "$entries",
              as: "entry",
              in: {
                status: "$$entry.status",
                delivery_date: "$$entry.delivery_date",
                order_id: "$$entry.order_id",
                order_date: `$orderDetails.entries.order_date`,
                //   $cond: {
                //     if: {
                //       $ne: ["$orderDetails", null]  // Check if orderDetails is not null
                //     },
                //     then: "$orderDetails.entries.order_date",  // Use orderDetails.entries.order_date if available
                //     else: null  // Otherwise, set order_date to null
                //   }
                // }
              }
            }
          }
        }
      }
    ]);

    console.log(data);

    if (data.length > 0) {
      return {
        message: "Data retrieved successfully",
        data: data,
        admin_data:admin_data,
        success: true,
      };
    } else {
      return {
        message: "No data found",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    console.log(error + " Delivery Manager Error");
    return {
      message: "Internal server error",
      data: [],
      success: false,
    };
  }
};






