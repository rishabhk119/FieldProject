const User = require("../auth/auth.model");
const Donation = require("../donation/donation.model");
const Contact = require("../contact/contact.model");
const Activity = require("../activity/activity.model");

// GET /admin/users — List all users with search, filter, pagination
exports.getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const role = req.query.role;
    const search = req.query.search;

    const filter = {};
    if (role && role !== "all") filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /admin/users/:id/role — Change user role
exports.changeUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "donor", "volunteer"].includes(role)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role" });
    }

    // Prevent admin from demoting themselves
    if (req.user._id.toString() === id) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot change your own role" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Log activity
    await Activity.create({
      type: "system",
      userId: req.user._id,
      message: `Admin changed ${user.name}'s role to ${role}`,
      color: "#6366f1",
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// DELETE /admin/users/:id — Delete a user
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() === id) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot delete your own account" });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await Activity.create({
      type: "system",
      userId: req.user._id,
      message: `Admin removed user: ${user.name}`,
      color: "#ef4444",
    });

    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

// GET /admin/donations — All donations with filters
exports.getAllDonations = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;

    const filter = {};
    if (status && status !== "all") filter.status = status;

    const total = await Donation.countDocuments(filter);
    const donations = await Donation.find(filter)
      .populate("donor", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: donations,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

// GET /admin/analytics — Deep analytics for admin overview
exports.getAnalytics = async (req, res, next) => {
  try {
    // User counts by role
    const usersByRole = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);
    const totalUsers = usersByRole.reduce((s, r) => s + r.count, 0);

    // Donation stats
    const donationStats = await Donation.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Monthly donation trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyDonations = await Donation.aggregate([
      { $match: { status: "completed", createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Recent signups (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentSignups = await User.countDocuments({
      createdAt: { $gte: weekAgo },
    });

    // Contact stats
    const contactStats = await Contact.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Donation type breakdown
    const donationTypes = await Donation.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        users: { total: totalUsers, byRole: usersByRole, recentSignups },
        donations: {
          byStatus: donationStats,
          monthlyTrends: monthlyDonations,
          byType: donationTypes,
        },
        contacts: contactStats,
      },
    });
  } catch (error) {
    next(error);
  }
};
