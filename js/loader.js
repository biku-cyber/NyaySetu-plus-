const Loader = {
    show() {
        const el = document.getElementById('loading-screen');
        if (el) el.classList.remove('hidden');
    },

    hide() {
        const el = document.getElementById('loading-screen');
        if (el) {
            el.classList.add('hidden');
            setTimeout(() => el.remove(), 400);
        }
    },

    showPageLoading() {
        const main = document.getElementById('main-content');
        if (main) main.classList.add('loading');
    },

    hidePageLoading() {
        const main = document.getElementById('main-content');
        if (main) main.classList.remove('loading');
    },

    createSkeleton(count = 3) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="skeleton-card"></div>
                <div class="skeleton-text long"></div>
                <div class="skeleton-text medium"></div>
            `;
        }
        return html;
    }
};
