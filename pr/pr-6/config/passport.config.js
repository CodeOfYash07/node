const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/admin.model');

// Configure Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const admin = await Admin.findOne({ email: email });

        if (!admin) {
            return done(null, false, { message: 'Admin not found' });
        }

        if (admin.password !== password) {
            return done(null, false, { message: 'Incorrect this password' });
        }

        return done(null, admin);
    } catch (err) {
        return done(err);
    }
}));

// Serialize user to store in session
passport.serializeUser((admin, done) => {
    done(null, admin._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const admin = await Admin.findById(id);
        done(null, admin);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
