const Theme = {
    init() {
        const settings = Storage.getSettings();
        this.apply(settings.theme || APP_CONFIG.defaultTheme);
    },

    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        Storage.updateSettings({ theme });

        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.content = theme === 'dark' ? '#0f1520' : '#1a2332';
        }
    },

    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        this.apply(next);
        return next;
    },

    getCurrent() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
};
