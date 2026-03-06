/**
 * Global UI Utilities
 * Common frontend functions for better UX
 */

// ============================================================
// Notification Handler
// ============================================================
const showNotification = (message, type = 'success', duration = 3000) => {
    const toast = document.createElement('div');
    const bgColor = {
        'success': 'linear-gradient(135deg, #11998e, #38ef7d)',
        'error': 'linear-gradient(135deg, #f93b1d, #ea1e63)',
        'warning': 'linear-gradient(135deg, #f57c00, #ff9800)',
        'info': 'linear-gradient(135deg, #667eea, #764ba2)'
    };

    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor[type] || bgColor.info};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    toast.innerText = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
};

// ============================================================
// Modal Handler
// ============================================================
const Modal = {
    open: (title, content, buttons = []) => {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        
        let buttonHTML = '';
        buttons.forEach(btn => {
            buttonHTML += `<button class="btn btn-${btn.class || 'primary'}" onclick="${btn.onClick || ''}">${btn.text}</button>`;
        });

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${title}</h2>
                    <button class="close-btn" onclick="Modal.close()">&times;</button>
                </div>
                <div class="modal-body">${content}</div>
                <div class="modal-footer" style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                    ${buttonHTML}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.id = 'activeModal';
    },

    close: () => {
        const modal = document.getElementById('activeModal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    }
};

// ============================================================
// Form Validation
// ============================================================
const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''));
};

const validateForm = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return false;

    let isValid = true;
    const inputs = form.querySelectorAll('[required]');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            showNotification(`${input.placeholder || 'Field'} is required`, 'error');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
};

// ============================================================
// Loader Handler
// ============================================================
const Loader = {
    show: (message = 'Loading...') => {
        const loader = document.createElement('div');
        loader.id = 'globalLoader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        loader.innerHTML = `
            <div style="text-align: center; color: white;">
                <div class="spinner" style="margin-bottom: 20px;"></div>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(loader);
    },

    hide: () => {
        const loader = document.getElementById('globalLoader');
        if (loader) loader.remove();
    }
};

// ============================================================
// Confirm Dialog
// ============================================================
const confirmAction = (message, onConfirm, onCancel = null) => {
    Modal.open('Confirm', message, [
        {
            text: 'Cancel',
            class: 'secondary',
            onClick: `Modal.close(); ${onCancel ? onCancel : ''}`
        },
        {
            text: 'Confirm',
            class: 'danger',
            onClick: onConfirm
        }
    ]);
};

// ============================================================
// Copy to Clipboard
// ============================================================
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
};

// ============================================================
// Format Numbers
// ============================================================
const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
};

// ============================================================
// Debounce Function
// ============================================================
const debounce = (func, delay = 300) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// ============================================================
// Enable/Disable Button
// ============================================================
const disableButton = (selector) => {
    const btn = document.querySelector(selector);
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    }
};

const enableButton = (selector) => {
    const btn = document.querySelector(selector);
    if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
    }
};

// ============================================================
// URL Query Parameters
// ============================================================
const getQueryParam = (param) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
};

const setQueryParam = (param, value) => {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
};

// ============================================================
// Storage Helper
// ============================================================
const Storage = {
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    get: (key) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    
    remove: (key) => {
        localStorage.removeItem(key);
    },
    
    clear: () => {
        localStorage.clear();
    }
};

// ============================================================
// Add styles for animations
// ============================================================
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
