const Navigation = {
    history: [],

    init() {
        this.setupHeader();
        this.setupMenu();
        this.setupBottomNav();
    },

    setupHeader() {
        const backBtn = document.getElementById('header-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.goBack());
        }
    },

    setupMenu() {
        const menuBtn = document.getElementById('menu-btn');
        const menuDrawer = document.getElementById('menu-drawer');
        const menuOverlay = document.getElementById('menu-drawer-overlay');
        const menuCloseBtn = document.getElementById('menu-close-btn');

        if (menuBtn && menuDrawer) {
            menuBtn.addEventListener('click', () => {
                menuDrawer.hidden = false;
            });
        }

        if (menuOverlay && menuDrawer) {
            menuOverlay.addEventListener('click', () => {
                menuDrawer.hidden = true;
            });
        }

        if (menuCloseBtn && menuDrawer) {
            menuCloseBtn.addEventListener('click', () => {
                menuDrawer.hidden = true;
            });
        }
    },

    setupBottomNav() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const route = item.dataset.route;
                if (route) Router.navigate(route);
            });
        });
    },

    updateActiveNav(route) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.route === route);
        });
    },

    updateHeader(title, subtitle, showBack = true) {
        const titleEl = document.getElementById('header-title');
        const subtitleEl = document.getElementById('header-subtitle');
        const backBtn = document.getElementById('header-back-btn');

        if (titleEl) titleEl.textContent = title;
        if (subtitleEl) subtitleEl.textContent = subtitle || '';
        if (backBtn) backBtn.classList.toggle('hidden', !showBack);
    },

    goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            Router.navigate('/');
        }
    },

    addToHistory(route) {
        this.history.push(route);
        if (this.history.length > 50) this.history.shift();
    }
};
