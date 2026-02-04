const express = require('express');
const multer = require('multer');
const passport = require('passport');

const { dashboardPage, addAdminPage, viewAdminPage, newPasswordPage, changeNewPassword, verifyEmail, OTPPage, OTPVerify, profilePage, addAdmin, deleteAdmin, editAdminPage, updateAdmin, loginPage, logout, changePassword, changePasswordPage, editProfilePage, updateProfilePage } = require('../controllers/admin.controller');

const route = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: myStorage });

//login
route.get('/', loginPage);
route.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureMessage: true
}));

//logout
route.get('/logout', logout);

// Forgot Password (OTP Flow)
route.post('/verify-email', verifyEmail);
route.get('/otp-page', OTPPage);
route.post('/otp-verify', OTPVerify);

//Change-Password
route.get('/changepasswordpage', changePasswordPage);
route.post('/changepassword', changePassword);
route.get('/changeNewPassword', newPasswordPage);
route.post('/changeNewPassword', changeNewPassword);

//Dashbord Page
route.get('/dashboard', isAuthenticated, dashboardPage);

//AddAdmin Page
route.get('/addAdminPage', isAuthenticated, addAdminPage);

                        //ViewAdmin Page
route.get('/viewAdminPage', isAuthenticated, viewAdminPage);

//profile page
route.get('/profile', isAuthenticated, profilePage);

//Edit Profile Page
route.get('/editProfile', isAuthenticated, editProfilePage);
route.post('/updateProfile', isAuthenticated, upload.single('profileimg'), updateProfilePage);

// Insert Admin
route.post('/addAdmin', isAuthenticated, upload.single('profileimg'), addAdmin);

// Delete Admin
route.get('/deleteAdmin/:Id', isAuthenticated, deleteAdmin);

// Edit Admin
route.get('/editAdmin/:Id', isAuthenticated, editAdminPage);
route.post('/editAdmin/:Id', isAuthenticated, upload.single('profileimg'), updateAdmin);

module.exports = route;