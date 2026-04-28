const Campaign = require("../campaign/campaign.model");
const Settings = require("../settings/settings.model");

// GET /admin/campaigns
exports.getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: campaigns });
  } catch (error) {
    next(error);
  }
};

// POST /admin/campaigns
exports.createCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json({ success: true, data: campaign });
  } catch (error) {
    next(error);
  }
};

// PATCH /admin/campaigns/:id
exports.updateCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!campaign) return res.status(404).json({ success: false, message: "Campaign not found" });
    res.status(200).json({ success: true, data: campaign });
  } catch (error) {
    next(error);
  }
};

// DELETE /admin/campaigns/:id
exports.deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).json({ success: false, message: "Campaign not found" });
    res.status(200).json({ success: true, message: "Campaign deleted" });
  } catch (error) {
    next(error);
  }
};

// --- SYSTEM OVERRIDES --- //

// PATCH /admin/donations/:id/override
exports.overrideDonationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const donation = await require("../donation/donation.model").findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!donation) return res.status(404).json({ success: false, message: "Donation not found" });
    res.status(200).json({ success: true, data: donation });
  } catch (error) {
    next(error);
  }
};

// POST /admin/impersonate/:id
exports.impersonateUser = async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    const user = await require("../auth/auth.model").findById(targetUserId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Generate token for the target user using the existing auth service logic
    const jwt = require("jsonwebtoken");
    const env = require("../../config/env");
    const token = jwt.sign({ id: user._id }, env.jwtSecret, { expiresIn: "1h" });

    const options = {
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour for impersonation
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      message: `Impersonating ${user.name}`,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// POST /admin/broadcast
exports.broadcastActivity = async (req, res, next) => {
  try {
    const { message, color } = req.body;
    const activity = await require("../activity/activity.model").create({
      type: "system",
      message,
      color: color || "#f97316",
    });
    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};

// GET /admin/settings
exports.getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne({ singletonId: "GLOBAL_SETTINGS" });
    if (!settings) settings = await Settings.create({});
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

// PATCH /admin/settings
exports.updateSettings = async (req, res, next) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { singletonId: "GLOBAL_SETTINGS" },
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};
