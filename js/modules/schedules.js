const SchedulesModule = {
    async getIndex() {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/schedules/index.json`);
    },
    async getSchedule(id) {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/schedules/${id}.json`);
    }
};
