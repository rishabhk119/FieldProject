const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["donation", "signup", "event", "system"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#f97316", // fallback dot color for UI
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
