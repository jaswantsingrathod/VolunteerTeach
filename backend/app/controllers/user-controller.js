import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserController = {};

UserController.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if email exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Check if this is the first user
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "user";

    // create user with appropriate role
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registred successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

UserController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check if password is correct
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // create token
    const tokenData = { userId: user._id, role: user.role };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.status(200).json({ message: "Login successful", token, user: { _id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

UserController.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export default UserController;
