// const express = require('express');
// const bodyParser = require('body-parser');
let dotenv = require("dotenv");
dotenv.config();
const Razorpay = require('razorpay');

// Initialize Razorpay with your test key ID and secret
const razorpay = new Razorpay({
    key_id: process.env.razorPay_key_id,
    key_secret: process.env.razorPay_key_secret,
});


// Create a Razorpay order

exports.payment = async (req) => {
    const amount = req.body.amount;
    const options = {
        amount: amount,
        currency: 'INR',
        receipt: 'order_rcptid_11',
        payment_capture: 1
    };
    console.log(options);

    if(options){
    return{
        success: true,
        data: options,
    }
}

    try {
        const response = await razorpay.orders.create(options);
        console.log(options);
        console.log(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
