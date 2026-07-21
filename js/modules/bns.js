// Pattern repeated for each law module
const BNSModule = {
    async getMetadata() {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/bns/metadata.json`);
    },
    async getChaptersIndex() {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/bns/chapters/index.json`);
    },
    async getChapter(id) {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/bns/chapters/${id}.json`);
    },
    async getSection(id) {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/bns/sections/${id}.json`);
    }
};

// Similar for BNSSModule, IPCModule, CrPCModule, BSAModule
const BNSSModule = { ...BNSModule };
const IPCModule = { ...BNSModule };
const CrPCModule = { ...BNSModule };
const BSAModule = { ...BNSModule };
