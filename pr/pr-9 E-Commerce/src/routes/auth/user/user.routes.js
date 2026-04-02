const express = require('express');
const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword, fetchAllUser, deleteUser, updateUser, isActive, profile, changePassword } = require('../../../controller/auth/user/user.controller');
const { authMiddleware } = require('../../../middleware/auth.middleware');
const userRouter = express.Router();


userRouter.post('/registerUser', registerUser);
userRouter.post('/loginUser', loginUser);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.post('/verifyOTP', verifyOtp);
userRouter.post('/resetPassword', resetPassword);

userRouter.get('/', fetchAllUser);
userRouter.delete('/', deleteUser);
userRouter.patch('/', updateUser);
userRouter.put('/', isActive);

userRouter.get('/profile', profile);

userRouter.post('/change_password', authMiddleware, changePassword)


module.exports = userRouter;