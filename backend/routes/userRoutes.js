import express from 'express';
import {
    authUser,
    registerUser,
    getUserProfile,
    forgotPassword,
    updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express();
router.route('/').post(registerUser);
router.post('/login', authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.put('/ForgetPassword', forgotPassword);
export default router;
