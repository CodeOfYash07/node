const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('./config/db.config');
require('./middleware/passport.local.middleware');

const app = express();

const PORT = process.env.PORT || 9070;

// ============================================================
// View Engine Setup
// ============================================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ============================================================
// Middleware Setup
// ============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================================================
// Session Configuration
// ============================================================
app.use(session({
    secret: process.env.SESSION_SECRET || 'Admin@123456789',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// ============================================================
// Passport Authentication Setup
// ============================================================
app.use(passport.initialize());
app.use(passport.session());

// ============================================================
// Flash Messages Setup
// ============================================================
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    res.locals.info = req.flash('info');
    res.locals.currentUser = req.user;
    next();
});

// ============================================================
// Routes
// ============================================================
app.use('/', require('./routes/'));

// ============================================================
// 404 Error Handler
// ============================================================
app.use((req, res) => {
    res.status(404).render('404');
});

// ============================================================
// Global Error Handler
// ============================================================
app.use((err, req, res, next) => {
    console.error('❌ Global Error:', err);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
    
    // Log to file in production
    if (process.env.NODE_ENV === 'production') {
        const fs = require('fs');
        fs.appendFile('server.log', `[${new Date().toISOString()}] ${message}\n`, () => {});
    }
    
    res.status(statusCode).render('500');
});

// ============================================================
// Server Startup
// ============================================================
app.listen(PORT, (err) => {
    if (err) {
        console.error("❌ Server failed to start:", err);
        process.exit(1);
    }
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// ============================================================
// Graceful Shutdown
// ============================================================
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});