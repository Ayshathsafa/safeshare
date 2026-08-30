import User from "../models/User.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const {
      role,
      name,
      email,
      password,
      phone,
      city,
      organization,
      registrationId,
      hospitalName,
      notes,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      role,
      name,
      email,
      password,
      phone,
      city,
      organization,
      registrationId,
      hospitalName,
      notes,
    });

    res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    res.json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};