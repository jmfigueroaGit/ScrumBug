import express from 'express';
import {
    registerUser,
    loginUser,
    forgotPassword,
    getUsers,
    getUser,
} from '../controllers/userController.js';
import {
    findUser,
    auth1,
    auth2,
    auth3,
    checkUser,
} from '../controllers/authController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express();

    //from User Controller
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/forgotPassword').put(forgotPassword);
router.route('/profile').get(getUser);

//Protected route for admin only
router.route('/admin').get(protect, admin, getUsers);

    //from Authentication Controller
//@desc this is for register section of website
router.route('/register/auth').post(checkUser);
//@desc this is for forgot password section of website
router.route('/forgotPassword/auth').post(findUser);
router.route('/forgotPassword/auth/v1').post(auth1);
router.route('/forgotPassword/auth/v2').post(auth2);
router.route('/forgotPassword/auth/v3').post(auth3);

export default router;
