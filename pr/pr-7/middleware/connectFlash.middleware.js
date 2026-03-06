/**
 * Flash Message Middleware
 * Makes flash messages available in all views
 * Usage: Flash messages are available as success, error, warning, info arrays
 */

module.exports.setFlash = function (req, res, next) {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error'),
        'warning': req.flash('warning'),
        'info': req.flash('info'),
    };

    // Add helper function to check if there are any messages
    res.locals.hasFlash = () => {
        const { success, error, warning, info } = res.locals.flash;
        return (success && success.length > 0) ||
            (error && error.length > 0) ||
            (warning && warning.length > 0) ||
            (info && info.length > 0);
    };

    next();
};