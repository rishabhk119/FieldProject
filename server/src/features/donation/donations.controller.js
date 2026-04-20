const Razorpay = require("razorpay");
const crypto = require("crypto");
const env = require("../../config/env");
const Donation = require("./donation.model");

// Initialize lazily to ensure ENV is loaded correctly
let razorpay;
const getRazorpay = () => {
  if (!razorpay) {
    if (!env.razorpayKeyId || env.razorpayKeyId.includes("placeholder")) {
      console.error("⚠️  WARNING: Razorpay Key ID is missing or using placeholder.");
    }
    razorpay = new Razorpay({
      key_id: env.razorpayKeyId,
      key_secret: env.razorpayKeySecret,
    });
  }
  return razorpay;
};

exports.createOrder = async (req, res, next) => {
  try {
    const { amount, currency = "INR" } = req.body;

    const options = {
      amount: amount * 100, // razorpay expects paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const rzp = getRazorpay();
    const order = await rzp.orders.create(options).catch(err => {
      console.error("❌ RAZORPAY API ERROR:", err);
      throw err;
    });

    // Track the pending donation in our DB
    await Donation.create({
      donor: req.user ? req.user._id : null,
      amount: amount,
      orderId: order.id,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", env.razorpayKeySecret)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment verified - update record
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { 
          status: "completed", 
          paymentId: razorpay_payment_id 
        }
      );

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature sent!",
      });
    }
  } catch (error) {
    next(error);
  }
};
