import express from 'express';
import {
    authUser,
    registerUser,
    checkUser,
    findUser,
    getUserProfile,
    getUsers,
    compareDataList,
    forgetPasswordData,
    updateUserProfile,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
const router = express();
router.route('/check').post(checkUser);
router.route('/find').post(findUser);
router.route('/compare').put(compareDataList);
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/ForgetPassword').put(forgetPasswordData);
router.route('/login').post(authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;
