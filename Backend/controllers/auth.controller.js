const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });
    const token = generateToken(user._id);

    await user.save();

    res.status(201).json({
      id: user._id,
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering User", error: err.message });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email ||!password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    user.lastLogin = Date.now();
    const token = generateToken(user._id);
    await user.save();
    res.status(200).json({ id: user._id, user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in User", error: err.message });
  }
};
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select(
            "-password"
        );
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({user});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting User info", error: err.message });
    }
};
