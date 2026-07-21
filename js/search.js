const Search = {
    index: null,
    isOpen: false,

    async init() {
        this.index = await this.buildIndex();
        this.setupEventListeners();
    },

    async buildIndex() {
        const index = {
            laws: [],
            parts: [],
            articles: [],
            chapters: [],
            sections: [],
            schedules: [],
            amendments: []
        };

        // Index Constitution
        const constMeta = LAW_METADATA.constitution;
        index.laws.push({
            id: 'constitution',
            title: constMeta.titleAs,
            subtitle: constMeta.titleEn,
            route: '/constitution',
            type: 'law'
        });

        // Load parts
        const parts = await Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/parts/index.json`);
        if (parts) {
            parts.forEach(p => {
                index.parts.push({
                    id: p.id,
                    title: p.titleAs,
                    subtitle: p.titleEn,
                    route: `/constitution/part/${p.id}`,
                    type: 'part'
                });
            });
        }

        // Index laws
        Object.values(LAW_METADATA).forEach(law => {
            if (law.id !== 'constitution') {
                index.laws.push({
                    id: law.id,
                    title: law.titleAs,
                    subtitle: `${law.titleEn} (${law.acronym})`,
                    route: `/${law.id}`,
                    type: 'law'
                });
            }
        });

        return index;
    },

    setupEventListeners() {
        const searchBtn = document.getElementById('search-btn');
        const searchOverlay = document.getElementById('search-overlay');
        const searchCloseBtn = document.getElementById('search-close-btn');
        const searchInput = document.getElementById('search-input');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.open());
        }

        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', () => this.close());
        }

        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                this.performSearch(e.target.value);
            }, APP_CONFIG.searchDebounce));
        }

        // Nav search
        document.querySelectorAll('[data-route="/search"]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });
    },

    open() {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('search-input');
        if (overlay) {
            overlay.hidden = false;
            this.isOpen = true;
            setTimeout(() => input && input.focus(), 100);
        }
    },

    close() {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('search-input');
        if (overlay) {
            overlay.hidden = true;
            this.isOpen = false;
            if (input) input.value = '';
            const results = document.getElementById('search-results');
            if (results) results.innerHTML = '';
        }
    },

    performSearch(query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;

        if (!query || query.trim().length < 2) {
            resultsContainer.innerHTML = `
                <div class="search-empty">
                    <img src="/assets/icons/search.svg" alt="" class="search-empty-icon">
                    <p>কমেও ২টা আখৰ লিখক</p>
                </div>
            `;
            return;
        }

        const q = query.toLowerCase().trim();
        const results = this.searchIndex(q);
        this.renderResults(results, q, resultsContainer);

        Storage.addSearchQuery(query);
    },

    searchIndex(query) {
        const results = {
            laws: [],
            parts: [],
            articles: [],
            chapters: [],
            sections: [],
            schedules: [],
            amendments: []
        };

        if (!this.index) return results;

        const q = query.toLowerCase();

        // Search laws
        this.index.laws.forEach(item => {
            if (item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)) {
                results.laws.push(item);
            }
        });

        // Search parts
        this.index.parts.forEach(item => {
            if (item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)) {
                results.parts.push(item);
            }
        });

        return results;
    },

    renderResults(results, query, container) {
        let html = '';
        let hasResults = false;

        const groups = [
            { key: 'laws', title: 'আইন', items: results.laws },
            { key: 'parts', title: 'ভাগ', items: results.parts },
            { key: 'articles', title: 'অনুচ্ছেদ', items: results.articles },
            { key: 'chapters', title: 'অধ্যায়', items: results.chapters },
            { key: 'sections', title: 'ধাৰা', items: results.sections },
            { key: 'schedules', title: 'অনুসূচী', items: results.schedules },
            { key: 'amendments', title: 'সংশোধনী', items: results.amendments }
        ];

        groups.forEach(group => {
            if (group.items.length > 0) {
                hasResults = true;
                html += `
                    <div class="search-result-group">
                        <div class="search-result-group-title">${group.title} (${group.items.length})</div>
                        ${group.items.map(item => `
                            <div class="search-result-item" data-route="${Utils.escapeHtml(item.route)}">
                                <div class="search-result-title">${Utils.highlightText(item.title, query)}</div>
                                ${item.subtitle ? `<div class="search-result-context">${Utils.highlightText(item.subtitle, query)}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        });

        if (!hasResults) {
            html = `
                <div class="search-empty">
                    <img src="/assets/icons/search-empty.svg" alt="" class="search-empty-icon">
                    <p>"${Utils.escapeHtml(query)}"ৰ বাবে কোনো ফলাফল পোৱা নগ'ল</p>
                </div>
            `;
        }

        container.innerHTML = html;

        container.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const route = item.dataset.route;
                this.close();
                if (route) Router.navigate(route);
            });
        });
    }
};
