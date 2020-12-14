//Authentication Part of user controller

import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

//FORGOT PASSWORD CONTROLLER PART

// @desc   Find user email if exist before security question authentication
// @route   POST /api/users/forgotPassword/auth/
// @access  Public
const findUser = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const userFind = await User.findOne({ email });

    if (userFind) {
        res.status(200);
        res.json({
            success: true,
            email: userFind.email,
            question1: userFind.question1,
            question2: userFind.question2,
            question3: userFind.question3,
        });
    } else {
        return next(new ErrorResponse('User is already exist', 400));
    }
});

// @desc   Validate security question1 and answer1
// @route   POST /api/users/forgotPassword/auth/v1
// @access  Public
const auth1 = asyncHandler(async (req, res, next) => {
    const { email, answer } = req.body;

    const user = await User.findOne({ email: email });

    if (await user.compareAnswer1(answer)) {
        res.status(200).json({
            success: true,
            data: user.email,
            question: user.question1,
        });
    } else {
        return next(new ErrorResponse(`Invalid input credentials`, 401));
    }
});

// @desc   Validate security question2 and answer2
// @route   POST /api/users/forgotPassword/auth/v2
// @access  Public
const auth2 = asyncHandler(async (req, res, next) => {
    const { email, answer } = req.body;

    const user = await User.findOne({ email: email });

    if (await user.compareAnswer2(answer)) {
        res.status(200).json({
            success: true,
            data: user.email,
            question: user.question2,
        });
    } else {
        return next(new ErrorResponse(`Invalid input credentials1`, 401));
    }
});

// @desc   Validate security question3 and answer3
// @route   POST /api/users/forgotPassword/auth/v3
// @access  Public
const auth3 = asyncHandler(async (req, res, next) => {
    const { email, answer } = req.body;

    const user = await User.findOne({ email: email });

    if (await user.compareAnswer3(answer)) {
        res.status(200).json({
            success: true,
            data: user.email,
            question: user.question3,
        });
    } else {
        return next(new ErrorResponse(`Invalid input credentials1`, 401));
    }
});

//REGISTER CONTROLLER PART

//REGISTER

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

export { findUser, auth1, auth2, auth3, checkUser };
