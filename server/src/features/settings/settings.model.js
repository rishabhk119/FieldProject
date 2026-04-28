const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    donationsPaused: {
      type: Boolean,
      default: false,
    },
    singletonId: {
      type: String,
      default: "GLOBAL_SETTINGS",
      unique: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
