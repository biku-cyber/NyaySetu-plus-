const Pages = {
    async home() {
        Navigation.updateHeader('ভাৰতৰ সংবিধান', 'Constitution of India', false);

        const main = document.getElementById('main-content');
        main.innerHTML = `
            <div class="page">
                <div class="home-hero">
                    <img src="/assets/emblems/ashoka-emblem.svg" alt="" class="home-hero-emblem" width="48" height="48">
                    <h1 class="home-hero-title">ন্যায়সেতু</h1>
                    <p class="home-hero-subtitle">ভাৰতৰ সংবিধান আৰু প্ৰধান আইনসমূহৰ অসমীয়া ডিজিটেল গ্ৰন্থাগাৰ</p>
                </div>

                <div class="content-section">
                    <div class="section-header">
                        <h2 class="heading-sm">দ্ৰুত অভিগম</h2>
                    </div>
                    <div class="quick-actions">
                        ${QUICK_ACTIONS.map(action => `
                            <div class="quick-action" data-route="${action.route}">
                                <div class="quick-action-icon">
                                    <img src="${action.icon}" alt="">
                                </div>
                                <span class="quick-action-label">${action.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="content-section">
                    <div class="section-header">
                        <h2 class="heading-sm">আইনসমূহ</h2>
                    </div>
                    <div class="grid-2">
                        ${Object.values(LAW_METADATA).map(law => `
                            <div class="law-card" data-route="/${law.id}">
                                <div class="law-card-icon">
                                    <img src="${law.icon}" alt="">
                                </div>
                                <div class="law-card-title">${law.titleAs}</div>
                                <div class="law-card-subtitle">${law.titleEn}${law.acronym ? ' (' + law.acronym + ')' : ''}</div>
                                <div class="law-card-meta">
                                    <span class="law-card-meta-item">📅 ${law.year}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="content-section">
                    <div class="section-header">
                        <h2 class="heading-sm">শেহতীয়া</h2>
                        <a href="#/recent" class="see-all">সকলো চাওক</a>
                    </div>
                    <div id="recent-list"></div>
                </div>

                <footer class="app-footer">
                    <p class="app-footer-text">
                        <span class="app-footer-brand">ন্যায়সেতু</span> v${APP_CONFIG.version}<br>
                        ভাৰতৰ সংবিধান আৰু আইনসমূহৰ অসমীয়া ডিজিটেল সংস্কৰণ
                    </p>
                </footer>
            </div>
        `;

        // Quick action clicks
        main.querySelectorAll('.quick-action').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.route));
        });

        // Law card clicks
        main.querySelectorAll('.law-card').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.route));
        });

        // Recent items
        const recentList = document.getElementById('recent-list');
        const recent = Storage.getRecent().slice(0, 3);
        if (recent.length === 0) {
            recentList.innerHTML = '<p class="body-sm" style="color: var(--text-tertiary); padding: 1rem 0;">শেহতীয়া ইতিহাস খালী</p>';
        } else {
            recentList.innerHTML = recent.map(r => `
                <div class="bookmark-card" data-route="${Utils.escapeHtml(r.route)}">
                    <div class="bookmark-icon">
                        <img src="/assets/icons/clock.svg" alt="">
                    </div>
                    <div class="bookmark-info">
                        <div class="bookmark-title">${Utils.escapeHtml(r.title)}</div>
                        <div class="bookmark-source">${Utils.escapeHtml(r.source)}</div>
                    </div>
                </div>
            `).join('');
            recentList.querySelectorAll('.bookmark-card').forEach(card => {
                card.addEventListener('click', () => Router.navigate(card.dataset.route));
            });
        }
    },

    async search() {
        Navigation.updateHeader('সন্ধান', 'Search', true);
        Search.open();
    },

    async bookmarks() {
        Navigation.updateHeader('বুকমাৰ্ক', 'Bookmarks', true);
        const main = document.getElementById('main-content');
        main.innerHTML = `
            <div class="page">
                <div class="content-section">
                    <div id="bookmarks-list"></div>
                </div>
            </div>
        `;
        Bookmarks.renderList(document.getElementById('bookmarks-list'));
    },

    async settings() {
        Navigation.updateHeader('ছেটিংছ', 'Settings', true);
        const settings = Storage.getSettings();
        const main = document.getElementById('main-content');

        main.innerHTML = `
            <div class="page">
                <div class="settings-group">
                    <div class="settings-group-title">ৰূপ</div>
                    <div class="settings-item" data-setting="theme">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">
                                <img src="/assets/icons/theme.svg" alt="">
                            </div>
                            <div>
                                <div class="settings-item-label">থিম</div>
                                <div class="settings-item-desc">${settings.theme === 'dark' ? 'ডাৰ্ক' : 'লাইট'} থিম সক্ৰিয়</div>
                            </div>
                        </div>
                        <div class="toggle ${settings.theme === 'dark' ? 'active' : ''}" id="theme-toggle"></div>
                    </div>
                </div>

                <div class="settings-group">
                    <div class="settings-group-title">পঢ়া অভিজ্ঞতা</div>
                    <div class="settings-item">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">
                                <img src="/assets/icons/font.svg" alt="">
                            </div>
                            <div>
                                <div class="settings-item-label">ফন্ট আকাৰ</div>
                                <div class="settings-item-desc">${settings.fontSize}px</div>
                            </div>
                        </div>
                        <div class="font-size-controls">
                            <button class="font-size-btn decrease">−</button>
                            <span class="font-size-label">${settings.fontSize}</span>
                            <button class="font-size-btn increase">+</button>
                        </div>
                    </div>

                    <div class="settings-item" data-setting="fontFamily">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">
                                <img src="/assets/icons/font-family.svg" alt="">
                            </div>
                            <div>
                                <div class="settings-item-label">ফন্ট পৰিয়াল</div>
                                <div class="settings-item-desc">${settings.fontFamily === 'sans' ? 'ছেৰিফবিহীন' : 'ছেৰিফ'}</div>
                            </div>
                        </div>
                        <div class="toggle ${settings.fontFamily === 'sans' ? '' : 'active'}" id="font-family-toggle"></div>
                    </div>

                    <div class="settings-item" data-setting="showProgress">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">
                                <img src="/assets/icons/progress.svg" alt="">
                            </div>
                            <div>
                                <div class="settings-item-label">প্ৰগতি দেখুৱাওক</div>
                                <div class="settings-item-desc">পঢ়াৰ অগ্ৰগতি পট্টি</div>
                            </div>
                        </div>
                        <div class="toggle ${settings.showProgress !== false ? 'active' : ''}" id="progress-toggle"></div>
                    </div>
                </div>

                <div class="settings-group">
                    <div class="settings-group-title">তথ্য</div>
                    <div class="settings-item" data-action="clear-recent">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">
                                <img src="/assets/icons/clock.svg" alt="">
                            </div>
                            <div>
                                <div class="settings-item-label">শেহতীয়া ইতিহাস মচক</div>
                            </div>
                        </div>
                    </div>
                    <div class="settings-item" data-action="clear-bookmarks">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">
                                <img src="/assets/icons/bookmark.svg" alt="">
                            </div>
                            <div>
                                <div class="settings-item-label">সকলো বুকমাৰ্ক মচক</div>
                            </div>
                        </div>
                    </div>
                    <div class="settings-item" data-action="about">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">
                                <img src="/assets/icons/info.svg" alt="">
                            </div>
                            <div>
                                <div class="settings-item-label">বিষয়ে</div>
                                <div class="settings-item-desc">ন্যায়সেতু v${APP_CONFIG.version}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', function() {
            const newTheme = Theme.toggle();
            this.classList.toggle('active', newTheme === 'dark');
            this.parentElement.querySelector('.settings-item-desc').textContent = `${newTheme === 'dark' ? 'ডাৰ্ক' : 'লাইট'} থিম সক্ৰিয়`;
        });

        // Font family toggle
        document.getElementById('font-family-toggle')?.addEventListener('click', function() {
            const current = Storage.getSettings().fontFamily;
            const next = current === 'sans' ? 'serif' : 'sans';
            Storage.updateSettings({ fontFamily: next });
            this.classList.toggle('active', next === 'serif');
            this.parentElement.querySelector('.settings-item-desc').textContent = next === 'sans' ? 'ছেৰিফবিহীন' : 'ছেৰিফ';
            Utils.showToast('ফন্ট সলনি কৰা হ\'ল', 'success');
        });

        // Progress toggle
        document.getElementById('progress-toggle')?.addEventListener('click', function() {
            const current = Storage.getSettings().showProgress;
            const next = current === false ? true : false;
            Storage.updateSettings({ showProgress: next });
            this.classList.toggle('active', next);
            Utils.showToast(next ? 'প্ৰগতি দেখুওৱা হ\'ব' : 'প্ৰগতি লুকুওৱা হ\'ব', 'info');
        });

        // Font size
        main.querySelectorAll('.font-size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const delta = btn.classList.contains('increase') ? 1 : -1;
                Reader.changeFontSize(delta);
                const label = main.querySelector('.font-size-label');
                const desc = btn.closest('.settings-item').querySelector('.settings-item-desc');
                if (label) label.textContent = Reader.currentFontSize;
                if (desc) desc.textContent = `${Reader.currentFontSize}px`;
            });
        });

        // Actions
        main.querySelectorAll('[data-action]').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action === 'clear-recent') {
                    if (confirm('শেহতীয়া ইতিহাস মচিব বিচাৰে?')) {
                        Storage.clearRecent();
                        Utils.showToast('ইতিহাস মচা হ\'ল', 'success');
                    }
                } else if (action === 'clear-bookmarks') {
                    if (confirm('সকলো বুকমাৰ্ক মচিব বিচাৰে?')) {
                        Storage.set('bookmarks', []);
                        Utils.showToast('বুকমাৰ্ক মচা হ\'ল', 'success');
                    }
                } else if (action === 'about') {
                    Router.navigate('/about');
                }
            });
        });
    },

    async about() {
        Navigation.updateHeader('বিষয়ে', 'About', true);
        const main = document.getElementById('main-content');
        main.innerHTML = `
            <div class="page">
                <div style="text-align: center; padding: 2rem 0;">
                    <img src="/assets/emblems/ashoka-emblem.svg" alt="" style="width: 80px; height: 80px; margin: 0 auto 1rem; opacity: 0.8;">
                    <h1 class="heading-xl">ন্যায়সেতু</h1>
                    <p class="body-sm" style="font-family: 'Inter', sans-serif; letter-spacing: 0.1em; text-transform: uppercase;">NyaySetu</p>
                    <p class="body-sm" style="margin-top: 0.5rem;">সংস্কৰণ ${APP_CONFIG.version}</p>
                </div>

                <div class="info-box">
                    <img src="/assets/icons/info.svg" alt="" class="info-box-icon">
                    <div class="info-box-content">
                        <div class="info-box-title">এই এপ্লিকেচনৰ বিষয়ে</div>
                        <div class="info-box-text">ন্যায়সেতু হৈছে ভাৰতৰ সংবিধান আৰু প্ৰধান আইনসমূহৰ এক অসমীয়া ডিজিটেল গ্ৰন্থাগাৰ। ই ছাত্ৰ-ছাত্ৰী, প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰাৰ্থী, শিক্ষক, আইনজীৱী আৰু গৱেষকসকলৰ বাবে ডিজাইন কৰা হৈছে।</div>
                    </div>
                </div>

                <div class="content-section" style="margin-top: 2rem;">
                    <h3 class="heading-sm mb-md">উপলব্ধ আইনসমূহ</h3>
                    <ul style="list-style: none;">
                        ${Object.values(LAW_METADATA).map(law => `
                            <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--border-subtle);">
                                <div style="font-weight: 600;">${law.titleAs}</div>
                                <div class="body-xs">${law.titleEn} (${law.year})</div>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="app-footer">
                    <p class="app-footer-text">
                        © ২০২৬ ন্যায়সেতু<br>
                        সকলো অধিকাৰ সংৰক্ষিত
                    </p>
                </div>
            </div>
        `;
    },

    async disclaimer() {
        Navigation.updateHeader('দায়বদ্ধতা অস্বীকাৰ', 'Disclaimer', true);
        const main = document.getElementById('main-content');
        main.innerHTML = `
            <div class="page">
                <div class="reading-content">
                    <h2 class="heading-lg mb-lg">দায়বদ্ধতা অস্বীকাৰ</h2>
                    <p>ন্যায়সেতুত উপলব্ধ তথ্যসমূহ কেৱল শিক্ষামূলক আৰু তথ্যমূলক উদ্দেশ্যে প্ৰদান কৰা হৈছে। এই তথ্যসমূহ আইনী পৰামৰ্শৰ বিকল্প নহয়।</p>
                    <p>আমি তথ্যৰ শুদ্ধতা নিশ্চিত কৰিবলৈ যথাসাধ্য চেষ্টা কৰোঁ, কিন্তু কোনো নিশ্চয়তা প্ৰদান নকৰোঁ। আইনী বিষয়ত সদায় যোগ্য আইনজীৱীৰ পৰামৰ্শ লওক।</p>
                    <p>ভাৰতৰ সংবিধান আৰু আইনসমূহৰ চূড়ান্ত আৰু প্ৰামাণিক সংস্কৰণৰ বাবে ভাৰত চৰকাৰৰ আনুষ্ঠানিক প্ৰকাশন চাওক।</p>
                </div>
            </div>
        `;
    },

    async recent() {
        Navigation.updateHeader('শেহতীয়া', 'Recent', true);
        const main = document.getElementById('main-content');
        const recent = Storage.getRecent();

        if (recent.length === 0) {
            main.innerHTML = `
                <div class="page">
                    <div class="empty-state">
                        <img src="/assets/icons/clock.svg" alt="" class="empty-state-icon">
                        <h3 class="empty-state-title">কোনো শেহতীয়া ইতিহাস নাই</h3>
                        <p class="empty-state-text">আপুনি পঢ়া আইন আৰু ধাৰাসমূহ ইয়াত দেখা যাব।</p>
                    </div>
                </div>
            `;
            return;
        }

        main.innerHTML = `
            <div class="page">
                <div class="content-section">
                    ${recent.map(r => `
                        <div class="bookmark-card" data-route="${Utils.escapeHtml(r.route)}">
                            <div class="bookmark-icon">
                                <img src="/assets/icons/clock.svg" alt="">
                            </div>
                            <div class="bookmark-info">
                                <div class="bookmark-title">${Utils.escapeHtml(r.title)}</div>
                                <div class="bookmark-source">${Utils.escapeHtml(r.source)}</div>
                                <div class="bookmark-date">${Utils.formatDate(r.viewedAt)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        main.querySelectorAll('.bookmark-card').forEach(card => {
            card.addEventListener('click', () => Router.navigate(card.dataset.route));
        });
    },

    // Constitution pages
    async constitution() {
        Navigation.updateHeader('ভাৰতৰ সংবিধান', 'Constitution of India', true);
        const meta = LAW_METADATA.constitution;
        const main = document.getElementById('main-content');

        main.innerHTML = `
            <div class="page">
                <div class="law-list-page">
                    <div class="law-list-header">
                        <h1 class="law-list-title">${meta.titleAs}</h1>
                        <p class="law-list-subtitle">${meta.titleEn} • ${meta.year} চনৰ পৰা কাৰ্যকৰ</p>
                        <div class="law-list-stats">
                            <div class="law-stat">
                                <div class="law-stat-value">${Utils.toAssameseNumber(meta.totalParts)}</div>
                                <div class="law-stat-label">ভাগ</div>
                            </div>
                            <div class="law-stat">
                                <div class="law-stat-value">${Utils.toAssameseNumber(meta.totalArticles)}</div>
                                <div class="law-stat-label">অনুচ্ছেদ</div>
                            </div>
                            <div class="law-stat">
                                <div class="law-stat-value">${Utils.toAssameseNumber(meta.totalSchedules)}</div>
                                <div class="law-stat-label">অনুসূচী</div>
                            </div>
                            <div class="law-stat">
                                <div class="law-stat-value">${Utils.toAssameseNumber(meta.totalAmendments)}</div>
                                <div class="law-stat-label">সংশোধনী</div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-2" style="margin-top: 1.5rem;">
                        <div class="law-card" data-route="/constitution/preamble">
                            <div class="law-card-icon">
                                <img src="/assets/icons/preamble.svg" alt="">
                            </div>
                            <div class="law-card-title">প্ৰস্তাৱনা</div>
                            <div class="law-card-subtitle">Preamble</div>
                        </div>
                        <div class="law-card" data-route="/constitution/parts">
                            <div class="law-card-icon">
                                <img src="/assets/icons/parts.svg" alt="">
                            </div>
                            <div class="law-card-title">ভাগসমূহ</div>
                            <div class="law-card-subtitle">Parts</div>
                        </div>
                        <div class="law-card" data-route="/constitution/schedules">
                            <div class="law-card-icon">
                                <img src="/assets/icons/schedules.svg" alt="">
                            </div>
                            <div class="law-card-title">অনুসূচীসমূহ</div>
                            <div class="law-card-subtitle">Schedules</div>
                        </div>
                        <div class="law-card" data-route="/constitution/amendments">
                            <div class="law-card-icon">
                                <img src="/assets/icons/amendments.svg" alt="">
                            </div>
                            <div class="law-card-title">সংশোধনীসমূহ</div>
                            <div class="law-card-subtitle">Amendments</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        main.querySelectorAll('.law-card').forEach(card => {
            card.addEventListener('click', () => Router.navigate(card.dataset.route));
        });
    },

    async preamble() {
        Navigation.updateHeader('প্ৰস্তাৱনা', 'Preamble', true);
        const main = document.getElementById('main-content');

        const data = await Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/preamble.json`);

        main.innerHTML = `
            <div class="page">
                <div class="reading-page">
                    <div class="article-header">
                        <div class="article-number-display">প্ৰস্তাৱনা</div>
                        <h1 class="article-title-display">ভাৰতৰ সংবিধানৰ প্ৰস্তানা</h1>
                        <p class="article-subtitle">The Preamble to the Constitution of India</p>
                    </div>
                    <div class="reading-content">
                        ${data ? `<p>${data.textAs}</p>` : '<p>আমি, ভাৰতৰ জনতা, ভাৰতক এখন সার্বভৌম সমাজতান্ত্ৰিক ধৰ্মনিৰপেক্ষ গণতান্ত্ৰিক সাধাৰণতন্ত্ৰ ৰূপে গঠন কৰিবলৈ আৰু ইয়াৰ নাগৰিকসকলক...</p>'}
                    </div>
                    <div class="reading-toolbar" style="margin-top: 2rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                        <button class="bookmark-btn" data-item-id="preamble" data-item-title="প্ৰস্তাৱনা" data-item-source="সংবিধান" data-item-type="article">
                            <img src="/assets/icons/bookmark.svg" alt="">
                            <span>বুকমাৰ্ক</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        Storage.addRecent({
            id: 'preamble',
            title: 'প্ৰস্তাৱনা',
            source: 'সংবিধান',
            route: '/constitution/preamble'
        });
    },

    async parts() {
        Navigation.updateHeader('ভাগসমূহ', 'Parts', true);
        const main = document.getElementById('main-content');

        const parts = await Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/parts/index.json`);

        main.innerHTML = `
            <div class="page">
                <div class="law-list-header">
                    <h1 class="law-list-title">সংবিধানৰ ভাগসমূহ</h1>
                    <p class="law-list-subtitle">Parts of the Constitution</p>
                </div>
                <div class="content-section" style="margin-top: 1rem;">
                    ${(parts || []).map(part => `
                        <div class="part-card" data-route="/constitution/part/${part.id}" style="margin-bottom: 0.5rem;">
                            <div class="part-number">${Utils.toAssameseNumber(part.number)}</div>
                            <div class="part-info">
                                <div class="part-title">${part.titleAs}</div>
                                <div class="part-meta">${part.titleEn} • ${Utils.toAssameseNumber(part.articleCount || 0)} টা অনুচ্ছেদ</div>
                            </div>
                            <img src="/assets/icons/chevron-right.svg" alt="" class="part-arrow" width="16" height="16">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        main.querySelectorAll('.part-card').forEach(card => {
            card.addEventListener('click', () => Router.navigate(card.dataset.route));
        });
    },

    async part(params) {
        const part = await Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/parts/${params.id}.json`);
        if (!part) return this.show404();

        Navigation.updateHeader(part.titleAs, part.titleEn, true);
        const main = document.getElementById('main-content');

        main.innerHTML = `
            <div class="page">
                <div class="breadcrumb">
                    <span class="breadcrumb-item" data-route="/constitution">সংবিধান</span>
                    <span class="breadcrumb-separator">›</span>
                    <span class="breadcrumb-item" data-route="/constitution/parts">ভাগসমূহ</span>
                    <span class="breadcrumb-separator">›</span>
                    <span class="breadcrumb-item active">${part.titleAs}</span>
                </div>

                <div class="law-list-header" style="border: none; padding: 1rem 0;">
                    <div class="label label-gold mb-sm">ভাগ ${Utils.toAssameseNumber(part.number)}</div>
                    <h1 class="law-list-title">${part.titleAs}</h1>
                    <p class="law-list-subtitle">${part.titleEn}</p>
                    ${part.descriptionAs ? `<p class="body-md mt-md">${part.descriptionAs}</p>` : ''}
                </div>

                <div class="content-section">
                    <div class="section-header">
                        <h2 class="heading-sm">অনুচ্ছেদসমূহ</h2>
                        <span class="body-xs">${Utils.toAssameseNumber(part.articles?.length || 0)} টা</span>
                    </div>
                    ${(part.articles || []).map(article => `
                        <div class="article-card" data-route="/constitution/article/${article.id}" style="margin-bottom: 0.5rem;">
                            <div class="article-number">অনুচ্ছেদ ${Utils.toAssameseNumber(article.number)}</div>
                            <div class="article-title">${article.titleAs}</div>
                            ${article.summaryAs ? `<div class="article-summary">${article.summaryAs}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        main.querySelectorAll('.breadcrumb-item[data-route]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.route));
        });
        main.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', () => Router.navigate(card.dataset.route));
        });

        Storage.addRecent({
            id: `part-${params.id}`,
            title: part.titleAs,
            source: 'সংবিধান',
            route: `/constitution/part/${params.id}`
        });
    },

    async articles(params) {
        return this.part(params);
    },

    async article(params) {
        const article = await Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/articles/${params.id}.json`);
        if (!article) return this.show404();

        Navigation.updateHeader(`অনুচ্ছেদ ${article.number}`, article.titleAs, true);
        const main = document.getElementById('main-content');
        const isBookmarked = Storage.isBookmarked(`article-${params.id}`);

        main.innerHTML = `
            <div class="page">
                <div class="reading-page">
                    <div class="article-header">
                        <div class="article-number-display">অনুচ্ছেদ ${Utils.toAssameseNumber(article.number)}</div>
                        <h1 class="article-title-display">${article.titleAs}</h1>
                        <p class="article-subtitle">${article.titleEn || ''}</p>
                    </div>
                    <div class="reading-content">
                        ${article.contentAs || '<p>তথ্য উপলব্ধ নহয়।</p>'}
                    </div>
                    ${article.explanationAs ? `<div class="reading-content"><div class="explanation-block"><strong>ব্যাখ্যা:</strong> ${article.explanationAs}</div></div>` : ''}
                    <div class="reading-toolbar" style="margin-top: 2rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                        <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-item-id="article-${params.id}" data-item-title="অনুচ্ছেদ ${article.number}" data-item-source="সংবিধান" data-item-type="article">
                            <img src="/assets/icons/bookmark.svg" alt="">
                            <span>${isBookmarked ? 'বুকমাৰ্ক কৰা হৈছে' : 'বুকমাৰ্ক'}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        Storage.addRecent({
            id: `article-${params.id}`,
            title: `অনুচ্ছেদ ${article.number}`,
            source: 'সংবিধান',
            route: `/constitution/article/${params.id}`
        });
    },

    async schedules() {
        Navigation.updateHeader('অনুসূচীসমূহ', 'Schedules', true);
        const main = document.getElementById('main-content');

        const schedules = await Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/schedules/index.json`);

        main.innerHTML = `
            <div class="page">
                <div class="law-list-header">
                    <h1 class="law-list-title">সংবিধানৰ অনুসূচীসমূহ</h1>
                    <p class="law-list-subtitle">Schedules of the Constitution</p>
                </div>
                <div class="content-section" style="margin-top: 1rem;">
                    ${(schedules || []).map(s => `
                        <div class="schedule-card" data-route="/constitution/schedule/${s.id}" style="margin-bottom: 0.5rem;">
                            <div class="schedule-number">${Utils.toAssameseNumber(s.number)}</div>
                            <div class="schedule-info">
                                <div class="schedule-title">${s.titleAs}</div>
                                <div class="schedule-desc">${s.titleEn}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        main.querySelectorAll('.schedule-card').forEach(card => {
            card.addEventListener('click', () => Router.navigate(card.dataset.route));
        });
    },

    async schedule(params) {
        const schedule = await Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/schedules/${params.id}.json`);
        if (!schedule) return this.show404();

        Navigation.updateHeader(`অনুসূচী ${schedule.number}`, schedule.titleAs, true);
        const main = document.getElementById('main-content');

        main.innerHTML = `
            <div class="page">
                <div class="breadcrumb">
                    <span class="breadcrumb-item" data-route="/constitution">সংবিধান</span>
                    <span class="breadcrumb-separator">›</span>
                    <span class="breadcrumb-item" data-route="/constitution/schedules">অনুসূচী</span>
                    <span class="breadcrumb-separator">›</span>
                    <span class="breadcrumb-item active">${schedule.titleAs}</span>
                </div>
                <div class="reading-page">
                    <div class="article-header">
                        <div class="article-number-display">অনুসূচী ${Utils.toAssameseNumber(schedule.number)}</div>
                        <h1 class="article-title-display">${schedule.titleAs}</h1>
                        <p class="article-subtitle">${schedule.titleEn}</p>
                    </div>
                    <div class="reading-content">
                        ${schedule.contentAs || '<p>তথ্য উপলব্ধ নহয়।</p>'}
                    </div>
                </div>
            </div>
        `;

        main.querySelectorAll('.breadcrumb-item[data-route]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.route));
        });
    },

    async amendments() {
        Navigation.updateHeader('সংশোধনীসমূহ', 'Amendments', true);
        const main = document.getElementById('main-content');

        const amendments = await Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/amendments/index.json`);

        main.innerHTML = `
            <div class="page">
                <div class="law-list-header">
                    <h1 class="law-list-title">সাংবিধানিক সংশোধনীসমূহ</h1>
                    <p class="law-list-subtitle">Constitutional Amendments</p>
                </div>
                <div class="content-section" style="margin-top: 1rem;">
                    ${(amendments || []).map(a => `
                        <div class="amendment-card" data-route="/constitution/amendment/${a.id}" style="margin-bottom: 0.5rem;">
                            <div class="amendment-number">${a.fullName}</div>
                            <div class="amendment-title">${a.titleAs}</div>
                            <div class="amendment-year">${a.year} • ${a.subjectAs || ''}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        main.querySelectorAll('.amendment-card').forEach(card => {
            card.addEventListener('click', () => Router.navigate(card.dataset.route));
        });
    },

    async amendment(params) {
        const amendment = await Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/amendments/${params.id}.json`);
        if (!amendment) return this.show404();

        Navigation.updateHeader(amendment.fullName, amendment.titleAs, true);
        const main = document.getElementById('main-content');

        main.innerHTML = `
            <div class="page">
                <div class="reading-page">
                    <div class="article-header">
                        <div class="article-number-display">${amendment.fullName}</div>
                        <h1 class="article-title-display">${amendment.titleAs}</h1>
                        <p class="article-subtitle">${amendment.titleEn}</p>
                    </div>

                    ${amendment.overviewAs ? `
                        <div class="amendment-section">
                            <h3 class="amendment-section-title">সাৰাংশ</h3>
                            <div class="amendment-section-content"><p>${amendment.overviewAs}</p></div>
                        </div>
                    ` : ''}

                    ${amendment.backgroundAs ? `
                        <div class="amendment-section">
                            <h3 class="amendment-section-title">ঐতিহাসিক পটভূমি</h3>
                            <div class="amendment-section-content"><p>${amendment.backgroundAs}</p></div>
                        </div>
                    ` : ''}

                    ${amendment.objectsAs ? `
                        <div class="amendment-section">
                            <h3 class="amendment-section-title">উদ্দেশ্য আৰু কাৰণ</h3>
                            <div class="amendment-section-content"><p>${amendment.objectsAs}</p></div>
                        </div>
                    ` : ''}

                    ${amendment.changesAs ? `
                        <div class="amendment-section">
                            <h3 class="amendment-section-title">প্ৰৱৰ্তন কৰা পৰিবৰ্তনসমূহ</h3>
                            <div class="amendment-section-content"><p>${amendment.changesAs}</p></div>
                        </div>
                    ` : ''}

                    ${amendment.impactAs ? `
                        <div class="amendment-section">
                            <h3 class="amendment-section-title">প্ৰভাৱ</h3>
                            <div class="amendment-section-content"><p>${amendment.impactAs}</p></div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    // Generic law page builders
    async _lawPage(lawId) {
        const meta = LAW_METADATA[lawId];
        if (!meta) return this.show404();

        Navigation.updateHeader(meta.titleAs, `${meta.titleEn} (${meta.acronym})`, true);
        const main = document.getElementById('main-content');

        const lawData = await Utils.loadJSON(`${APP_CONFIG.dataPath}/${lawId}/metadata.json`);

        main.innerHTML = `
            <div class="page">
                <div class="law-list-page">
                    <div class="law-list-header">
                        <h1 class="law-list-title">${meta.titleAs}</h1>
                        <p class="law-list-subtitle">${meta.titleEn} (${meta.acronym}), ${meta.year}</p>
                        ${meta.description ? `<p class="body-md mt-md">${meta.description}</p>` : ''}
                        <div class="law-list-stats">
                            <div class="law-stat">
                                <div class="law-stat-value">${Utils.toAssameseNumber(meta.totalChapters)}</div>
                                <div class="law-stat-label">অধ্যায়</div>
                            </div>
                            <div class="law-stat">
                                <div class="law-stat-value">${Utils.toAssameseNumber(meta.totalSections)}</div>
                                <div class="law-stat-label">ধাৰা</div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 1.5rem;">
                        <a href="#/${lawId}/chapters" class="law-card" style="display: block; text-decoration: none;">
                            <div class="flex-row">
                                <div class="law-card-icon">
                                    <img src="/assets/icons/parts.svg" alt="">
                                </div>
                                <div>
                                    <div class="law-card-title">অধ্যায়সমূহ চাওক</div>
                                    <div class="law-card-subtitle">Browse all chapters</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `;
    },

    async _chaptersPage(lawId) {
        const meta = LAW_METADATA[lawId];
        Navigation.updateHeader(`${meta.titleAs} - অধ্যায়`, 'Chapters', true);
        const main = document.getElementById('main-content');

        const chapters = await Utils.loadJSON(`${APP_CONFIG.dataPath}/${lawId}/chapters/index.json`);

        main.innerHTML = `
            <div class="page">
                <div class="breadcrumb">
                    <span class="breadcrumb-item" data-route="/${lawId}">${meta.titleAs}</span>
                    <span class="breadcrumb-separator">›</span>
                    <span class="breadcrumb-item active">অধ্যায়সমূহ</span>
                </div>
                <div class="law-list-header" style="border: none; padding: 1rem 0;">
                    <h1 class="law-list-title">অধ্যায়সমূহ</h1>
                    <p class="law-list-subtitle">Chapters</p>
                </div>
                <div class="content-section" style="margin-top: 1rem;">
                    ${(chapters || []).map(ch => `
                        <div class="chapter-card" data-route="/${lawId}/chapter/${ch.id}" style="margin-bottom: 0.5rem;">
                            <div class="chapter-number">${Utils.toAssameseNumber(ch.number)}</div>
                            <div class="chapter-info">
                                <div class="chapter-title">${ch.titleAs}</div>
                                <div class="chapter-meta">${ch.titleEn} • ${Utils.toAssameseNumber(ch.sectionCount || 0)} টা ধাৰা</div>
                            </div>
                            <img src="/assets/icons/chevron-right.svg" alt="" class="chapter-arrow" width="16" height="16">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        main.querySelectorAll('.breadcrumb-item[data-route]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.route));
        });
        main.querySelectorAll('.chapter-card').forEach(card => {
            card.addEventListener('click', () => Router.navigate(card.dataset.route));
        });
    },

    async _chapterPage(lawId, params) {
        const meta = LAW_METADATA[lawId];
        const chapter = await Utils.loadJSON(`${APP_CONFIG.dataPath}/${lawId}/chapters/${params.id}.json`);
        if (!chapter) return this.show404();

        Navigation.updateHeader(`অধ্যায় ${chapter.number}`, chapter.titleAs, true);
        const main = document.getElementById('main-content');

        main.innerHTML = `
            <div class="page">
                <div class="breadcrumb">
                    <span class="breadcrumb-item" data-route="/${lawId}">${meta.titleAs}</span>
                    <span class="breadcrumb-separator">›</span>
                    <span class="breadcrumb-item" data-route="/${lawId}/chapters">অধ্যায়</span>
                    <span class="breadcrumb-separator">›</span>
                    <span class="breadcrumb-item active">${chapter.titleAs}</span>
                </div>

                <div class="law-list-header" style="border: none; padding: 1rem 0;">
                    <div class="label label-gold mb-sm">অধ্যায় ${Utils.toAssameseNumber(chapter.number)}</div>
                    <h1 class="law-list-title">${chapter.titleAs}</h1>
                    <p class="law-list-subtitle">${chapter.titleEn}</p>
                </div>

                ${chapter.overviewAs ? `
                    <div class="chapter-overview">
                        <div class="chapter-overview-title">সাৰাংশ</div>
                        <div class="chapter-overview-text">${chapter.overviewAs}</div>
                    </div>
                ` : ''}

                <div class="content-section">
                    <div class="section-header">
                        <h2 class="heading-sm">ধাৰাসমূহ</h2>
                        <span class="body-xs">${Utils.toAssameseNumber(chapter.sections?.length || 0)} টা</span>
                    </div>
                    ${(chapter.sections || []).map(section => `
                        <div class="section-card" data-route="/${lawId}/section/${section.id}" style="margin-bottom: 0.5rem;">
                            <div class="section-number">ধাৰা ${Utils.toAssameseNumber(section.number)}</div>
                            <div class="section-title">${section.titleAs}</div>
                            ${section.summaryAs ? `<div class="section-summary">${section.summaryAs}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        main.querySelectorAll('.breadcrumb-item[data-route]').forEach(el => {
            el.addEventListener('click', () => Router.navigate(el.dataset.route));
        });
        main.querySelectorAll('.section-card').forEach(card => {
            card.addEventListener('click', () => Router.navigate(card.dataset.route));
        });

        Storage.addRecent({
            id: `${lawId}-chapter-${params.id}`,
            title: `অধ্যায় ${chapter.number}`,
            source: meta.titleAs,
            route: `/${lawId}/chapter/${params.id}`
        });
    },

    async _sectionPage(lawId, params) {
        const meta = LAW_METADATA[lawId];
        const section = await Utils.loadJSON(`${APP_CONFIG.dataPath}/${lawId}/sections/${params.id}.json`);
        if (!section) return this.show404();

        Navigation.updateHeader(`ধাৰা ${section.number}`, section.titleAs, true);
        const main = document.getElementById('main-content');
        const isBookmarked = Storage.isBookmarked(`${lawId}-section-${params.id}`);

        main.innerHTML = `
            <div class="page">
                <div class="reading-page">
                    <div class="section-header-reading">
                        <div class="section-number-display">ধাৰা ${Utils.toAssameseNumber(section.number)}</div>
                        <h1 class="section-title-display">${section.titleAs}</h1>
                        <p class="section-subtitle">${section.titleEn || ''}</p>
                    </div>
                    <div class="reading-content">
                        ${section.contentAs || '<p>তথ্য উপলব্ধ নহয়।</p>'}
                    </div>
                    ${section.explanationAs ? `<div class="reading-content"><div class="explanation-block"><strong>ব্যাখ্যা:</strong> ${section.explanationAs}</div></div>` : ''}
                    ${section.illustrationAs ? `<div class="reading-content"><div class="illustration-block"><strong>উদাহৰণ:</strong> ${section.illustrationAs}</div></div>` : ''}
                    <div class="reading-toolbar" style="margin-top: 2rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                        <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-item-id="${lawId}-section-${params.id}" data-item-title="ধাৰা ${section.number}" data-item-source="${meta.titleAs}" data-item-type="section">
                            <img src="/assets/icons/bookmark.svg" alt="">
                            <span>${isBookmarked ? 'বুকমাৰ্ক কৰা হৈছে' : 'বুকমাৰ্ক'}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        Storage.addRecent({
            id: `${lawId}-section-${params.id}`,
            title: `ধাৰা ${section.number}`,
            source: meta.titleAs,
            route: `/${lawId}/section/${params.id}`
        });
    },

    // Law-specific handlers
    async bns() { return this._lawPage('bns'); },
    async bnsChapters() { return this._chaptersPage('bns'); },
    async bnsChapter(params) { return this._chapterPage('bns', params); },
    async bnsSection(params) { return this._sectionPage('bns', params); },

    async bnss() { return this._lawPage('bnss'); },
    async bnssChapters() { return this._chaptersPage('bnss'); },
    async bnssChapter(params) { return this._chapterPage('bnss', params); },
    async bnssSection(params) { return this._sectionPage('bnss', params); },

    async bsa() { return this._lawPage('bsa'); },
    async bsaChapters() { return this._chaptersPage('bsa'); },
    async bsaChapter(params) { return this._chapterPage('bsa', params); },
    async bsaSection(params) { return this._sectionPage('bsa', params); },

    async ipc() { return this._lawPage('ipc'); },
    async ipcChapters() { return this._chaptersPage('ipc'); },
    async ipcChapter(params) { return this._chapterPage('ipc', params); },
    async ipcSection(params) { return this._sectionPage('ipc', params); },

    async crpc() { return this._lawPage('crpc'); },
    async crpcChapters() { return this._chaptersPage('crpc'); },
    async crpcChapter(params) { return this._chapterPage('crpc', params); },
    async crpcSection(params) { return this._sectionPage('crpc', params); },

    show404() {
        Router.show404();
    }
};
