const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    goal: {
      type: Number,
      required: true,
    },
    raised: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "var(--saffron-500)",
    },
    iconName: {
      type: String,
      default: "Sprout", // Lucide icon name
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
