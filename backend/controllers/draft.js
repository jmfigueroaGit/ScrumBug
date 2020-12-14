import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        if (user.isActive) {
            if (await user.matchPassword(password)) {
                res.json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id),
                });
            } else {
                res.status(401);
                throw new Error('Invalid email or password');
            }
        } else {
            res.status(401);
            throw new Error('User account is inactive');
        }
    } else {
        res.status(401);
        throw new Error(`User account doesn't exist`);
    }
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email, password, question, answer } = req.body;
    const user = await User.findOne({ email });
    answer = answer.toLowerCase();
    if (user) {
        res.json({
            user: updatedUser.fullName,
        });
    }
    if (
        user &&
        user.question == question &&
        (await user.compareAnswer(answer))
    ) {
        if (password) {
            user.password = password;
        }
        const updatedUser = await user.update();
        res.json({
            answer: updatedUser.answer,
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

const compareData = asyncHandler(async (req, res) => {
    const { email, question, answer } = req.body;
    const user = await User.findOne({ email });
    answer = answer.toLowerCase();
    if (
        user &&
        user.question == question &&
        (await user.compareAnswer(answer))
    ) {
        res.json({
            answer: user.answer,
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc    Check user email if exist
// @route   POST /api/check
// @access  Public
const checkUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    } else {
        res.status(200);
        res.json('Hello');
    }
});

// @desc   Find user email if exist
// @route   POST /api/check
// @access  Public
const findUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const userFind = await User.findOne({ email });

    if (userFind) {
        res.status(200);
        res.json('Hello');
    } else {
        res.status(400);
        throw new Error(`User doesn't exists`);
    }
});
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, question, answer } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        fullName,
        email,
        password,
        question,
        answer,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            question: user.question,
            answer: user.answer,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            question: user.question,
            answer: user.answer,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.fullName = req.body.fullName || user.fullName;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            question: user.question,
            answer: user.answer,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.fullName = req.body.fullName || user.fullName;
        user.email = req.body.email || user.email;
        user.isActive = req.body.isActive;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            isActive: updatedUser.isActive,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const compareDataList = asyncHandler(async (req, res) => {
    let { email, question, answer } = req.body;
    const user = await User.findOne({ email });
    answer = answer.toLowerCase();
    if (
        user &&
        user.question == question &&
        (await user.compareAnswer(answer))
    ) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            securityQuestion: user.securityQuestion,
            answer: user.answer,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid Credentials');
    }
});

const forgetPasswordData = asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        if (password) {
            user.password = password;
        }
        const updatedUser = await user.save();
        res.json({
            answer: updatedUser.answer,
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid Credentials');
    }
});

export {
    authUser,
    registerUser,
    checkUser,
    findUser,
    compareData,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    compareDataList,
    forgotPassword,
    forgetPasswordData,
};
