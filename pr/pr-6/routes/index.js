const express = require('express');
const multer = require('multer');
const passport = require('passport');

const {
    dashboardPage,
    addAdminPage,
    viewAdminPage,
    newPasswordPage,
    changeNewPassword,
    verifyEmail,
    OTPPage,
    OTPVerify,
    profilePage,
    addAdmin,
    deleteAdmin,
    editAdminPage,
    updateAdmin,
    loginPage,
    logout,
    changePassword,
    changePasswordPage,
    editProfilePage,
    updateProfilePage
} = require('../controllers/admin.controller');

// category / subcategory / extra / product controllers
const {
    addCategoryPage,
    addCategory,
    viewCategoryPage,
    editCategoryPage,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller');

const {
    addSubCategoryPage,
    addSubCategory,
    viewSubCategoryPage,
    editSubCategoryPage,
    updateSubCategory,
    deleteSubCategory
} = require('../controllers/subcategory.controller');

const {
    addExtraCategoryPage,
    addExtraCategory,
    viewExtraCategoryPage,
    editExtraCategoryPage,
    updateExtraCategory,
    deleteExtraCategory
} = require('../controllers/extracategory.controller');

const {
    addProductPage,
    addProduct,
    viewProductPage,
    editProductPage,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');


const route = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};

// admin profile storage
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: myStorage });

// product images storage (kept separate folder)
const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/products/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const uploadProduct = multer({ storage: productStorage });

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
route.post('/verify-email', OTPVerify);

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
// ------------------------------------------------------------------
// category
route.get('/addCategoryPage', isAuthenticated, addCategoryPage);
route.post('/addCategory', isAuthenticated, addCategory);
route.get('/viewCategories', isAuthenticated, viewCategoryPage);
route.get('/editCategory/:id', isAuthenticated, editCategoryPage);
route.post('/editCategory/:id', isAuthenticated, updateCategory);
route.get('/deleteCategory/:id', isAuthenticated, deleteCategory);

// subcategory
route.get('/addSubCategoryPage', isAuthenticated, addSubCategoryPage);
route.post('/addSubCategory', isAuthenticated, addSubCategory);
route.get('/viewSubCategories', isAuthenticated, viewSubCategoryPage);
route.get('/editSubCategory/:id', isAuthenticated, editSubCategoryPage);
route.post('/editSubCategory/:id', isAuthenticated, updateSubCategory);
route.get('/deleteSubCategory/:id', isAuthenticated, deleteSubCategory);

// extra category
route.get('/addExtraCategoryPage', isAuthenticated, addExtraCategoryPage);
route.post('/addExtraCategory', isAuthenticated, addExtraCategory);
route.get('/viewExtraCategories', isAuthenticated, viewExtraCategoryPage);
route.get('/editExtraCategory/:id', isAuthenticated, editExtraCategoryPage);
route.post('/editExtraCategory/:id', isAuthenticated, updateExtraCategory);
route.get('/deleteExtraCategory/:id', isAuthenticated, deleteExtraCategory);

// products
route.get('/addProductPage', isAuthenticated, addProductPage);
route.post('/addProduct', isAuthenticated, uploadProduct.array('images', 5), addProduct);
route.get('/viewProducts', isAuthenticated, viewProductPage);
route.get('/editProduct/:id', isAuthenticated, editProductPage);
route.post('/editProduct/:id', isAuthenticated, uploadProduct.array('images', 5), updateProduct);
route.get('/deleteProduct/:id', isAuthenticated, deleteProduct);

// ------------------------------------------------------------------
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