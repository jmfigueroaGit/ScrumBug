import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc login user
// @route POST api/user/login
// @access PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc register user
// @route POST api/user/
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  const userExist = await User.findOne({ email, username });

  if (userExist) {
    res.status(400);
    throw new Error('Username/Email is already exist');
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  if (user) {
    res.status(2201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Get user profile
// @route GET api/users/profile
// @access PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Invalid Email or Password');
  }
});

export { authUser, registerUser, getUserProfile };
