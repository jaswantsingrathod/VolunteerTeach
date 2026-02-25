import User from "../models/user-model.js";
import Volunteer from "../models/volunteer-model.js";
const volunteerController = {};

volunteerController.registerVolunteer = async (req, res) => {
  try {
    const body = req.body;

    // Ensure req.userId is provided
    if (!req.userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if volunteer profile already exists for this user
    const existing = await Volunteer.findOne({ user: req.userId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Volunteer profile already exists" });
    }

    // Create volunteer profile with user reference
    const volunteer = new Volunteer({ ...body, user: req.userId });
    await volunteer.save();

    // Update user role to volunteer
    await User.findByIdAndUpdate(req.userId, { role: "volunteer" });

    res
      .status(201)
      .json({ message: "Volunteer registered successfully", volunteer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

volunteerController.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });

    res.status(200).json({volunteers});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

volunteerController.getMyProfile = async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ user: req.userId });

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer profile not found" });
    }

    res.status(200).json({ volunteer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default volunteerController;
