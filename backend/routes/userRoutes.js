import express from 'express';
import {
    registerUser,
    loginUser,
    forgotPassword,
    getUsers,
    getUserById,
    updateUser,
} from '../controllers/userController.js';
import {
    findUser,
    auth1,
    auth2,
    auth3,
    checkUser,
    registerAuth1,
    registerAuth2,
    registerAuth3,
} from '../controllers/authController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express();

//from User Controller
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
//from Authentication Controller
//@desc this is for register section of website
router.route('/auth').post(checkUser);
router.route('/auth/v1').post(registerAuth1);
router.route('/auth/v2').post(registerAuth2);
router.route('/auth/v3').post(registerAuth3);
//@desc this is for forgot password section of website
router.route('/forgotPassword/auth').post(findUser);
router.route('/forgotPassword/auth/v1').post(auth1);
router.route('/forgotPassword/auth/v2').post(auth2);
router.route('/forgotPassword/auth/v3').post(auth3);
router.route('/forgotPassword/resetPassword').put(forgotPassword);

//Protected route for admin only
router.route('/admin').get(protect, admin, getUsers);
router.route('/:id').get(protect, admin, getUserById).put(protect, updateUser);

export default router;
