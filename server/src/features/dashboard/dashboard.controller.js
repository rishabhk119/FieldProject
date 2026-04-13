const User = require("../auth/auth.model");
const Donation = require("../donation/donation.model");
const Activity = require("../activity/activity.model");

exports.getDashboardStats = async (req, res, next) => {
  try {
    // 1. Total volunteers
    const volunteerCount = await User.countDocuments({ role: "volunteer" });
    
    // 2. Total donations sum
    const donations = await Donation.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalDonations = donations.length > 0 ? donations[0].total : 0;
    
    // Send mostly real stats backed up with some active filler data 
    res.status(200).json({
      success: true,
      data: {
        totalDonations: totalDonations, 
        volunteers: volunteerCount,
        activeCampaigns: 2, // Hardcoded for now until campaign model exists
        goalsMet: 78 // Hardcoded %
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getRecentActivity = async (req, res, next) => {
  try {
    // Fetch last 5 activities
    let activities = await Activity.find().sort({ createdAt: -1 }).limit(5);
    
    // Dynamic Fallback state if database has no activity
    if (activities.length === 0) {
      return res.status(200).json({
        success: true,
        data: [
          { dot: '#f97316', text: 'Welcome to Sai Tapovan Ashram dashboard', time: 'Just now' },
          { dot: '#6366f1', text: 'Dashboard backend seamlessly connected to MongoDB Atlas', time: '1 min ago' },
          { dot: '#22c55e', text: 'System ready for team collaboration by all 4 peers', time: '2 mins ago' },
        ]
      })
    }

    const formatted = activities.map(a => ({
      dot: a.color,
      text: a.message,
      time: new Date(a.createdAt).toLocaleDateString()
    }));

    res.status(200).json({
      success: true,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};
