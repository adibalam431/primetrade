const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

const refreshAccessToken = async (refreshTokenFromCookie) => {
  if (!refreshTokenFromCookie) {
    throw new Error("No refresh token provided");
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshTokenFromCookie);
  } catch {
    throw new Error("Invalid refresh token");
  }

  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== refreshTokenFromCookie) {
    throw new Error("Refresh token mismatch");
  }

  const newAccessToken = generateAccessToken(user._id);

  return {
    accessToken: newAccessToken,
  };
};

const logoutUser = async (refreshTokenFromCookie) => {
  if (!refreshTokenFromCookie) {
    return;
  }

  const user = await User.findOne({ refreshToken: refreshTokenFromCookie });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  return;
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};