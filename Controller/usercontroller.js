const User = require("../Models/userModel");

exports.vote = async (req, res) => {
  try {
    const { candidate, villageName, mobileNumber } = req.body;

    // Validate required fields
    if (!candidate || !villageName || !mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "सभी फ़ील्ड आवश्यक हैं।",
      });
    }

    // Check if user has already voted
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "आप पहले ही मतदान कर चुके हैं। एक मोबाइल नंबर से केवल एक वोट मान्य है।",
      });
    }

    // Save new vote
    const newVote = new User({
      candidate,
      villageName,
      mobileNumber,
    });

    await newVote.save();

    res.status(201).json({
      success: true,
      message: "वोट सफलतापूर्वक दर्ज किया गया।",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "वोट प्रक्रिया में त्रुटि हुई।",
      error: error.message,
    });
  }
};

exports.votecount = async (req, res) => {
  try {
    const voteCount = await User.aggregate([
      {
        $group: {
          _id: "$candidate",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: voteCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "मतगणना प्राप्त करने में समस्या हुई।",
      error: error.message,
    });
  }
};
