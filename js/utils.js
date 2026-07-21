const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    highlightText(text, query) {
        if (!query) return Utils.escapeHtml(text);
        const escaped = Utils.escapeHtml(text);
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return escaped.replace(regex, '<mark>$1</mark>');
    },

    formatNumber(num) {
        if (typeof num !== 'number') return num;
        return num.toLocaleString('en-IN');
    },

    toAssameseNumber(num) {
        const assameseDigits = ['', '১', '২', '', '৪', '৫', '', '৭', '৮', ''];
        return String(num).replace(/[0-9]/g, d => assameseDigits[d]);
    },

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    },

    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('as-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    truncate(str, length = 100) {
        if (!str) return '';
        if (str.length <= length) return str;
        return str.substring(0, length).trim() + '...';
    },

    slugify(str) {
        return str.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    },

    parseRouteParams(template, path) {
        const templateParts = template.split('/');
        const pathParts = path.split('/');
        const params = {};

        for (let i = 0; i < templateParts.length; i++) {
            if (templateParts[i].startsWith(':')) {
                params[templateParts[i].substring(1)] = pathParts[i];
            }
        }
        return params;
    },

    matchRoute(route, path) {
        const routeParts = route.split('/');
        const pathParts = path.split('/');

        if (routeParts.length !== pathParts.length) return null;

        const params = {};
        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
                params[routeParts[i].substring(1)] = pathParts[i];
            } else if (routeParts[i] !== pathParts[i]) {
                return null;
            }
        }
        return params;
    },

    async loadJSON(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Failed to load ${path}:`, error);
            return null;
        }
    },

    showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastOut 250ms ease forwards';
            setTimeout(() => toast.remove(), 250);
        }, duration);
    },

    createElement(tag, attrs = {}, children = []) {
        const el = document.createElement(tag);
        Object.entries(attrs).forEach(([key, value]) => {
            if (key === 'className') el.className = value;
            else if (key === 'textContent') el.textContent = value;
            else if (key === 'innerHTML') el.innerHTML = value;
            else if (key.startsWith('on')) {
                el.addEventListener(key.substring(2).toLowerCase(), value);
            }
            else if (key === 'dataset') {
                Object.entries(value).forEach(([dk, dv]) => el.dataset[dk] = dv);
            }
            else el.setAttribute(key, value);
        });
        children.forEach(child => {
            if (typeof child === 'string') el.appendChild(document.createTextNode(child));
            else if (child) el.appendChild(child);
        });
        return el;
    },

    getScrollPercent() {
        const h = document.documentElement;
        const b = document.body;
        const st = h.scrollTop || b.scrollTop;
        const sh = h.scrollHeight || b.scrollHeight;
        const ch = h.clientHeight;
        return (st / (sh - ch)) * 100;
    }
};
