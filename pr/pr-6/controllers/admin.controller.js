const Admin = require('../model/admin.model');
const nodemailer = require("nodemailer")
const fs = require('fs');

// Login Page
module.exports.loginPage = async (req, res) => {
    try {
        // If user is already logged in, redirect to dashboard
        if (req.isAuthenticated()) {
            return res.redirect('/dashboard');
        }

        return res.render('auth/login');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

//Logout
module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.redirect('/dashboard');
        }
        return res.redirect('/');
    });
}

// Dashboard Page
module.exports.dashboardPage = async (req, res) => {
    try {
        const admin = req.user;

        if (!admin) {
            return res.redirect('/');
        }
        return res.render('dashboard', { admin });
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/dashboard');
    }
}

// Add Admin Page
module.exports.addAdminPage = async (req, res) => {
    try {
        const admin = req.user;

        if (!admin) {
            return res.redirect('/');
        }
        return res.render('auth/addAdminPage', { admin });

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
};


// View Admin Page
module.exports.viewAdminPage = async (req, res) => {
    try {
        const admin = req.user;

        if (!admin) {
            return res.redirect('/');
        }

        let allAdmin = await Admin.find();

        // Logged-in admin ne remove karva mate
        allAdmin = allAdmin.filter((subadmin) =>
            subadmin._id.toString() !== admin._id.toString()
        );

        return res.render('viewAdminPage', {
            allAdmin,
            admin
        });

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}


// Add Admin
module.exports.addAdmin = async (req, res) => {
    try {

        console.log(req.file);

        req.body.profileimg = req.file.path;

        const addAdmin = await Admin.create(req.body);

        if (addAdmin) {
            console.log("Admin Inserted Successfully..");
        } else {
            console.log("Admin Insertion Failed..");
        }
        return res.redirect('/addAdminPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/addAdminPage');
    }
}

// CHANGE PASSWORD PAGE
module.exports.changePasswordPage = async (req, res) => {
    try {
        const admin = req.user;

        if (!admin) {
            return res.redirect('/');
        }

        return res.render('auth/changePasswordPage', { admin });
    } catch (err) {
        console.log("Change Password Page Error:", err);
        return res.redirect('/');
    }
};

// CHANGE PASSWORD LOGIC
module.exports.changePassword = async (req, res) => {
    try {
        const admin = req.user;

        if (!admin) {
            return res.redirect('/');
        }

        const { current_psw, new_psw, conform_psw } = req.body;

        if (current_psw !== admin.password) {
            console.log("Current password not matched...");
            return res.redirect('/changepasswordpage');
        }

        if (new_psw === admin.password) {
            console.log("New password same as old...");
            return res.redirect('/changepasswordpage');
        }

        if (new_psw !== conform_psw) {
            console.log("Confirm password not matched...");
            return res.redirect('/changepasswordpage');
        }

        const updated = await Admin.findByIdAndUpdate(
            admin._id,
            { password: new_psw },
            { new: true }
        );

        if (updated) {
            console.log("Password changed successfully...");
            req.logout(() => {
                return res.redirect('/');
            });
        }

        return res.redirect('/');
    } catch (err) {
        console.log("Change Password Error:", err);
        return res.redirect('/');
    }
};

// VERIFY EMAIL (SEND OTP)
module.exports.verifyEmail = async (req, res) => {
    try {
        const myAdmin = await Admin.findOne({ email: req.body.email });

        if (!myAdmin) {
            console.log("Admin not found...");
            return res.redirect('/');
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "yashkhunt128@gmail.com",
                pass: "tchtdvdwfiumfppr"
            }
        });

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();

        const info = await transporter.sendMail({
            from: '"Admin Panel" <yashkhunt128@gmail.com>',
            to: req.body.email,
            subject: "OTP Verification",
            html: `
        <h2>Forgot Password OTP</h2>
        <p>Your OTP is: <b>${OTP}</b></p>
      `
        });

        console.log("Mail sent:", info.messageId);

        // Store OTP and ID in session
        req.session.OTP = OTP;
        req.session.adminId = myAdmin._id;

        return res.redirect('/otp-page');
    } catch (err) {
        console.log("Verify Email Error:", err);
        return res.redirect('/');
    }
};

// OTP PAGE
module.exports.OTPPage = (req, res) => {
    try {
        return res.render('auth/OTPPage');
    } catch (err) {
        console.log("OTP Page Error:", err);
        return res.redirect('/');
    }
};

// OTP VERIFY
module.exports.OTPVerify = async (req, res) => {
    try {
        if (String(req.body.adminOTP) !== String(req.session.OTP)) {
            console.log("OTP not matched...");
            return res.redirect('/otp-page');
        }

        return res.redirect('/changeNewPassword');
    } catch (err) {
        console.log("OTP Verify Error:", err);
        return res.redirect('/');
    }
};

// NEW PASSWORD PAGE
module.exports.newPasswordPage = (req, res) => {
    try {
        delete req.session.OTP;
        return res.render('auth/newPasswordPage');
    } catch (err) {
        console.log("New Password Page Error:", err);
        return res.redirect('/');
    }
};

// CHANGE NEW PASSWORD
module.exports.changeNewPassword = async (req, res) => {
    try {
        if (req.body.new_password !== req.body.conform_password) {
            console.log("Passwords not matched...");
            return res.redirect('/changeNewPassword');
        }

        const updated = await Admin.findByIdAndUpdate(
            req.session.adminId,
            { password: req.body.new_password },
            { new: true }
        );

        delete req.session.adminId;

        if (updated) {
            console.log("Password updated...");
        }

        return res.redirect('/');
    } catch (err) {
        console.log("Change New Password Error:", err);
        return res.redirect('/');
    }
};

// PROFILE PAGE
// ----------------------------------
module.exports.profilePage = async (req, res) => {
    try {
        const admin = req.user;

        if (!admin) {
            return res.redirect('/');
        }

        return res.render('profile/profile', { admin });
    } catch (err) {
        console.log("Profile Error:", err);
        return res.redirect('/');
    }
};

// EDIT PROFILE PAGE
module.exports.editProfilePage = async (req, res) => {
    try {
        const admin = req.user;

        if (!admin) {
            return res.redirect('/');
        }

        return res.render('profile/editProfile', { admin });
    } catch (err) {
        console.log("Edit Profile Error:", err);
        return res.redirect('/profile');
    }
};

// UPDATE PROFILE
module.exports.updateProfilePage = async (req, res) => {
    try {
        const admin = req.user;

        if (!admin) {
            return res.redirect('/');
        }

        console.log("Update body:", req.body);
        console.log("Update file:", req.file);

        let updateData = { ...req.body };

        // Handle hobby array - it comes as an array from checkboxes
        if (updateData.hobby) {
            // If it's already an array (from multiple checkboxes), keep it
            if (!Array.isArray(updateData.hobby)) {
                // If it's a single value, convert to array
                updateData.hobby = [updateData.hobby];
            }
        } else {
            // If no hobby selected, set empty array
            updateData.hobby = [];
        }

        if (req.file) {
            updateData.profileimg = req.file.path;

            const oldData = await Admin.findById(admin._id);
            if (oldData && oldData.profileimg) {
                fs.unlink(oldData.profileimg, (err) => {
                    if (err) console.log("Error deleting old image:", err);
                });
            }
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(admin._id, updateData, { new: true });

        if (updatedAdmin) {
            console.log("Profile Updated Successfully...");
            // Update the session user with latest data
            req.user = updatedAdmin;
            return res.redirect('/profile');
        } else {
            console.log("Profile Update Failed...");
            return res.redirect('/editProfile');
        }
    } catch (err) {
        console.log("Update Profile Error:", err);
        return res.redirect('/editProfile');
    }
};

// Delete Admin
module.exports.deleteAdmin = async (req, res) => {
    try {
        const admin = req.user;

        if (!admin) {
            return res.redirect('/');
        }
        const deletedUser = await Admin.findByIdAndDelete(req.params.Id);

        console.log(deletedUser);

        if (deletedUser) {
            fs.unlink(deletedUser.profileimg, () => { });
            console.log("Admin deleted successfully...");
        } else {
            console.log("Admin deletion failed...");
        }

        return res.redirect('/viewAdminPage');

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/viewAdminPage');
    }
}

// Edit Admin Page
module.exports.editAdminPage = async (req, res) => {
    try {
        const admin = req.user;

        if (!admin) {
            return res.redirect('/');
        }
        console.log(req.params);
        const singleAdmin = await Admin.findById(req.params.Id);


        return res.render('auth/editAdminPage', { singleAdmin, admin });

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/editAdminPage');
    }
}

// Update Admin
module.exports.updateAdmin = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        console.log(req.file);

        if (req.file) {

            req.body.profileimg = req.file.path;

            const updatedData = await Admin.findByIdAndUpdate(req.params.Id, req.body);

            if (updatedData) {
                fs.unlink(updatedData.profileimg, () => { });
                console.log("Admin Updated Successfully...");
            } else {
                console.log("Admin Updation Failed...");
            }
        } else {
            const updatedData = await Admin.findByIdAndUpdate(req.params.Id, req.body, { new: true });

            if (updatedData) {
                console.log("Admin Updated Successfully...");
            } else {
                console.log("Admin Updation Failed...");
            }
        }

        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/viewAdminPage');
    }
}
