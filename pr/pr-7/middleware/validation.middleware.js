/**
 * Input Validation Middleware
 * Provides validation utilities for forms
 */

// Email validation
const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

// Password validation (minimum 6 characters)
const isValidPassword = (password) => {
    return password && password.length >= 6;
};

// Strong password validation (at least 1 uppercase, 1 lowercase, 1 number)
const isStrongPassword = (password) => {
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongPattern.test(password);
};

// Phone number validation (Indian format)
const isValidPhone = (phone) => {
    const phonePattern = /^[6-9]\d{9}$/;
    return phonePattern.test(phone.replace(/\D/g, ''));
};

// Name validation
const isValidName = (name) => {
    return name && name.trim().length >= 2 && name.length <= 50;
};

// Sanitize input (remove dangerous characters)
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input
        .replace(/[<>]/g, '')
        .trim();
};

// Validate file upload
const validateFileUpload = (file, allowedMimes = ['image/jpeg', 'image/png'], maxSize = 5 * 1024 * 1024) => {
    const errors = [];
    
    if (!file) {
        errors.push('File is required');
        return errors;
    }

    if (!allowedMimes.includes(file.mimetype)) {
        errors.push('Invalid file type. Allowed: JPEG, PNG');
    }

    if (file.size > maxSize) {
        errors.push(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
    }

    return errors;
};

// Validate pagination
const validatePagination = (page = 1, limit = 10) => {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    
    return {
        page: Math.max(1, pageNum),
        limit: Math.min(Math.max(1, limitNum), 100)
    };
};

module.exports = {
    isValidEmail,
    isValidPassword,
    isStrongPassword,
    isValidPhone,
    isValidName,
    sanitizeInput,
    validateFileUpload,
    validatePagination
};
