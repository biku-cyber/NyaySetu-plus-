const Reader = {
    currentFontSize: APP_CONFIG.fontSizeDefault,

    init() {
        const settings = Storage.getSettings();
        this.currentFontSize = settings.fontSize || APP_CONFIG.fontSizeDefault;
        this.applySettings();
        this.setupToolbar();
        this.setupProgress();
    },

    applySettings() {
        const settings = Storage.getSettings();
        const readingContent = document.querySelector('.reading-content, .legal-text');
        if (readingContent) {
            readingContent.style.fontSize = `${settings.fontSize || this.currentFontSize}px`;
            readingContent.style.lineHeight = settings.lineHeight || 1.9;
            readingContent.style.textAlign = settings.justifyText !== false ? 'justify' : 'left';
            readingContent.style.fontFamily = settings.fontFamily === 'sans' ? 'var(--font-sans)' : 'var(--font-serif)';
        }
    },

    setupToolbar() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.font-size-btn.increase')) {
                this.changeFontSize(1);
            } else if (e.target.closest('.font-size-btn.decrease')) {
                this.changeFontSize(-1);
            } else if (e.target.closest('.bookmark-btn')) {
                this.toggleBookmark();
            }
        });
    },

    changeFontSize(delta) {
        const newsize = this.currentFontSize + delta;
        if (newsize < APP_CONFIG.fontSizeMin || newsize > APP_CONFIG.fontSizeMax) return;

        this.currentFontSize = newsize;
        Storage.updateSettings({ fontSize: newsize });
        this.applySettings();

        const label = document.querySelector('.font-size-label');
        if (label) label.textContent = newsize;
    },

    toggleBookmark() {
        const btn = document.querySelector('.bookmark-btn');
        if (!btn) return;

        const id = btn.dataset.itemId;
        const title = btn.dataset.itemTitle;
        const source = btn.dataset.itemSource;
        const route = window.location.hash.replace('#', '') || '/';

        const isBookmarked = Bookmarks.toggle({
            id, title, source, route,
            type: btn.dataset.itemType || 'article'
        });

        btn.classList.toggle('active', isBookmarked);
    },

    setupProgress() {
        const settings = Storage.getSettings();
        if (settings.showProgress === false) return;

        let progressBar = document.querySelector('.reading-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
            document.body.appendChild(progressBar);
        }

        window.addEventListener('scroll', Utils.throttle(() => {
            const percent = Utils.getScrollPercent();
            const fill = progressBar.querySelector('.reading-progress-fill');
            if (fill) fill.style.width = `${Math.min(percent, 100)}%`;
        }, 50));
    },

    setupBackToTop() {
        let btn = document.querySelector('.back-to-top');
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'back-to-top';
            btn.innerHTML = '<img src="/assets/icons/arrow-up.svg" alt="" width="20" height="20">';
            btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
            document.body.appendChild(btn);
        }

        window.addEventListener('scroll', Utils.throttle(() => {
            btn.classList.toggle('visible', window.scrollY > 400);
        }, 100));
    }
};
