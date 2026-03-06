/**
 * Utility Helpers
 * Common functions used across the application
 */

// Format date to readable format
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Format date and time
const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

// Format file size to human readable
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Truncate text
const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// Capitalize first letter
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Check if value is empty
const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && Object.keys(value).length === 0)
    );
};

// Merge objects
const mergeObjects = (obj1, obj2) => {
    return Object.assign({}, obj1, obj2);
};

// Deep clone object
const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Group array by property
const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
};

// Sort array of objects
const sortBy = (array, key, order = 'asc') => {
    return [...array].sort((a, b) => {
        if (order === 'desc') {
            return b[key] > a[key] ? 1 : -1;
        }
        return a[key] > b[key] ? 1 : -1;
    });
};

// Filter array by multiple conditions
const filterBy = (array, conditions) => {
    return array.filter(item => {
        return Object.keys(conditions).every(key => {
            return item[key] === conditions[key];
        });
    });
};

// Calculate pagination values
const getPaginationValues = (currentPage, limit, totalItems) => {
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (currentPage - 1) * limit;
    
    return {
        currentPage: Math.max(1, currentPage),
        limit,
        totalItems,
        totalPages,
        skip,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        nextPage: currentPage + 1,
        prevPage: currentPage - 1
    };
};

// Delay execution (for testing)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Retry async function
const retry = async (fn, maxRetries = 3, delay = 1000) => {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
};

module.exports = {
    formatDate,
    formatDateTime,
    formatFileSize,
    truncateText,
    capitalize,
    generateId,
    isEmpty,
    mergeObjects,
    deepClone,
    groupBy,
    sortBy,
    filterBy,
    getPaginationValues,
    delay,
    retry
};
