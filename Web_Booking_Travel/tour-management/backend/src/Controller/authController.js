import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
export const Register = async (req, res) => {
  try {
    const { username, email, password, accountType, cccd, phoneNumber } = req.body;

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const hashcccd = await bcrypt.hash(cccd, salt);
    // Create new user instance
    const newUser = new User({
      username,
      email,
      password: hashPass,
      accountType,
      cccd: hashcccd,
      phoneNumber: accountType === 'sale' ? phoneNumber : undefined,
    });

    // Save user to the database
    await newUser.save();

    res.status(200).json({ success: true, message: "Register user success", data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Register failed", error: err.message });
  }
};
// Login User
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Email not found" });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
    }

    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });

    // Send the token as a cookie
    res.cookie('accessToken', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    }).status(200).json({ success: true, message: "Login success", token, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
};
