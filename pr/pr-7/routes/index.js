const express = require('express');
const multer = require('multer');
const passport = require('passport');

const { dashborad, addAdminPage, viewadmin, verifyEmail, otpPage, VerifyOtp, profile, addAdmin, deleteAdmin, editAdmin, updateAdmin, loginPage, logout, changePassword, changePasswordPage } = require('../controllers/admin.controller');

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
    failureRedirect: '/',
    successRedirect: '/dashboard',
    failureFlash: true
}));

//logout
route.get('/logout', logout);

// Forgot Password (OTP Flow)
route.post('/verify-email', verifyEmail);
route.get('/otp-page', otpPage);
route.post('/otp-verify', VerifyOtp);

//Change-Password
route.get('/changepasswordpage', changePasswordPage);
route.post('/changepassword', changePassword);

//Dashbord Page
route.get('/dashboard', isAuthenticated, dashborad);

//AddAdmin Page
route.get('/addAdminPage', isAuthenticated, addAdminPage);

//ViewAdmin Page
route.get('/viewAdminPage', isAuthenticated, viewadmin);

//profile page
route.get('/profile', isAuthenticated, profile);

// Insert Admin
route.post('/addAdmin', isAuthenticated, upload.single('profileimg'), addAdmin);

// Delete Admin
route.get('/deleteAdmin/:Id', isAuthenticated, deleteAdmin);

// Edit Admin
route.get('/editAdmin/:Id', isAuthenticated, editAdmin);
route.post('/editAdmin/:Id', isAuthenticated, upload.single('profileimg'), updateAdmin);

module.exports = route;