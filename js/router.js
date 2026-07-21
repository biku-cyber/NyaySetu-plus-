const Router = {
    routes: [],
    currentRoute: null,

    init() {
        this.registerRoutes();
        window.addEventListener('hashchange', () => this.resolve());
        this.resolve();
    },

    registerRoutes() {
        this.routes = [
            { path: '/', handler: Pages.home },
            { path: '/search', handler: Pages.search },
            { path: '/bookmarks', handler: Pages.bookmarks },
            { path: '/settings', handler: Pages.settings },
            { path: '/about', handler: Pages.about },
            { path: '/disclaimer', handler: Pages.disclaimer },
            { path: '/recent', handler: Pages.recent },
            { path: '/constitution', handler: Pages.constitution },
            { path: '/constitution/preamble', handler: Pages.preamble },
            { path: '/constitution/parts', handler: Pages.parts },
            { path: '/constitution/part/:id', handler: Pages.part },
            { path: '/constitution/part/:id/articles', handler: Pages.articles },
            { path: '/constitution/article/:id', handler: Pages.article },
            { path: '/constitution/schedules', handler: Pages.schedules },
            { path: '/constitution/schedule/:id', handler: Pages.schedule },
            { path: '/constitution/amendments', handler: Pages.amendments },
            { path: '/constitution/amendment/:id', handler: Pages.amendment },
            { path: '/bns', handler: Pages.bns },
            { path: '/bns/chapters', handler: Pages.bnsChapters },
            { path: '/bns/chapter/:id', handler: Pages.bnsChapter },
            { path: '/bns/section/:id', handler: Pages.bnsSection },
            { path: '/bnss', handler: Pages.bnss },
            { path: '/bnss/chapters', handler: Pages.bnssChapters },
            { path: '/bnss/chapter/:id', handler: Pages.bnssChapter },
            { path: '/bnss/section/:id', handler: Pages.bnssSection },
            { path: '/bsa', handler: Pages.bsa },
            { path: '/bsa/chapters', handler: Pages.bsaChapters },
            { path: '/bsa/chapter/:id', handler: Pages.bsaChapter },
            { path: '/bsa/section/:id', handler: Pages.bsaSection },
            { path: '/ipc', handler: Pages.ipc },
            { path: '/ipc/chapters', handler: Pages.ipcChapters },
            { path: '/ipc/chapter/:id', handler: Pages.ipcChapter },
            { path: '/ipc/section/:id', handler: Pages.ipcSection },
            { path: '/crpc', handler: Pages.crpc },
            { path: '/crpc/chapters', handler: Pages.crpcChapters },
            { path: '/crpc/chapter/:id', handler: Pages.crpcChapter },
            { path: '/crpc/section/:id', handler: Pages.crpcSection }
        ];
    },

    resolve() {
        const hash = window.location.hash.replace('#', '') || '/';
        const path = hash.split('?')[0];

        for (const route of this.routes) {
            const params = Utils.matchRoute(route.path, path);
            if (params !== null) {
                this.currentRoute = route;
                Navigation.addToHistory(path);
                Loader.showPageLoading();

                route.handler(params).then(() => {
                    Loader.hidePageLoading();
                    Navigation.updateActiveNav(this.getBaseRoute(path));
                    window.scrollTo(0, 0);
                }).catch(err => {
                    console.error('Route error:', err);
                    Loader.hidePageLoading();
                    this.show404();
                });
                return;
            }
        }

        this.show404();
    },

    navigate(path) {
        window.location.hash = path;
    },

    getBaseRoute(path) {
        if (path === '/' || path === '') return '/';
        if (path.startsWith('/constitution')) return '/';
        if (path.startsWith('/bns')) return '/';
        if (path.startsWith('/bnss')) return '/';
        if (path.startsWith('/bsa')) return '/';
        if (path.startsWith('/ipc')) return '/';
        if (path.startsWith('/crpc')) return '/';
        if (path === '/search') return '/search';
        if (path === '/bookmarks') return '/bookmarks';
        if (path === '/settings') return '/settings';
        return '/';
    },

    show404() {
        const main = document.getElementById('main-content');
        if (main) {
            main.innerHTML = `
                <div class="page">
                    <div class="empty-state">
                        <div style="font-family: var(--font-display); font-size: 4rem; color: var(--brand-gold); margin-bottom: 1rem;">৪০৪</div>
                        <h3 class="empty-state-title">পৃষ্ঠা পোৱা নগ'ল</h3>
                        <p class="empty-state-text">আপুনি বিচৰা পৃষ্ঠাটো পোৱা নগ'ল।</p>
                        <button onclick="Router.navigate('/')" style="margin-top: 1.5rem; background: var(--brand-navy); color: white; padding: 0.75rem 1.5rem; border-radius: 8px; border: none; cursor: pointer; font-family: inherit;">ঘৰলৈ যাওক</button>
                    </div>
                </div>
            `;
        }
        Navigation.updateHeader('পোৱা নগ\'ল', '', false);
    }
};
