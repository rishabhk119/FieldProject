const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["general", "meal_sponsorship"],
      default: "general",
    },
    metadata: {
      type: Map,
      of: String,
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
