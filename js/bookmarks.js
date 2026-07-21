const Bookmarks = {
    toggle(item) {
        const isBookmarked = Storage.isBookmarked(item.id);

        if (isBookmarked) {
            Storage.removeBookmark(item.id);
            Utils.showToast('বুকমাৰ্ক আঁতৰোৱা হ\'ল', 'info');
            return false;
        } else {
            const success = Storage.addBookmark({
                id: item.id,
                title: item.title,
                subtitle: item.subtitle || '',
                source: item.source,
                route: item.route,
                type: item.type || 'article'
            });

            if (success) {
                Utils.showToast('বুকমাৰ্ক যোগ কৰা হ\'ল', 'success');
            }
            return true;
        }
    },

    getAll() {
        return Storage.getBookmarks();
    },

    renderList(container) {
        const bookmarks = this.getAll();

        if (bookmarks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <img src="/assets/icons/bookmark-empty.svg" alt="" class="empty-state-icon">
                    <h3 class="empty-state-title">কোনো বুকমাৰ্ক নাই</h3>
                    <p class="empty-state-text">আপুনি পঢ়ি থকা অৱস্থাত যিকোনো ধাৰা বা অনুচ্ছেদ বুকমাৰ্ক কৰিব পাৰে।</p>
                </div>
            `;
            return;
        }

        container.innerHTML = bookmarks.map(b => `
            <div class="bookmark-card" data-route="${Utils.escapeHtml(b.route)}">
                <div class="bookmark-icon">
                    <img src="/assets/icons/${b.type === 'article' ? 'article' : 'section'}.svg" alt="">
                </div>
                <div class="bookmark-info">
                    <div class="bookmark-title">${Utils.escapeHtml(b.title)}</div>
                    <div class="bookmark-source">${Utils.escapeHtml(b.source)}</div>
                    <div class="bookmark-date">${Utils.formatDate(b.createdAt)}</div>
                </div>
                <button class="bookmark-remove" data-bookmark-id="${Utils.escapeHtml(b.id)}" aria-label="আঁতৰাওক">
                    <img src="/assets/icons/close.svg" alt="" width="16" height="16">
                </button>
            </div>
        `).join('');

        container.querySelectorAll('.bookmark-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.bookmark-remove')) return;
                const route = card.dataset.route;
                if (route) Router.navigate(route);
            });
        });

        container.querySelectorAll('.bookmark-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.bookmarkId;
                Storage.removeBookmark(id);
                Utils.showToast('বুকমাৰ্ক আঁতৰোৱা হ\'ল', 'info');
                this.renderList(container);
            });
        });
    }
};
