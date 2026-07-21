// Constitution module - data loading helpers
const ConstitutionModule = {
    async loadPart(id) {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/parts/${id}.json`);
    },
    async loadArticle(id) {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/articles/${id}.json`);
    },
    async loadSchedule(id) {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/schedules/${id}.json`);
    },
    async loadAmendment(id) {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/amendments/${id}.json`);
    },
    async loadPreamble() {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/preamble.json`);
    }
};
