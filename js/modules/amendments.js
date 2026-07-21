const AmendmentsModule = {
    async getIndex() {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/amendments/index.json`);
    },
    async getAmendment(id) {
        return Utils.loadJSON(`${APP_CONFIG.dataPath}/constitution/amendments/${id}.json`);
    },
    getFullTitle(number, year) {
        const ordinals = {
            1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', 5: 'Fifth',
            6: 'Sixth', 7: 'Seventh', 8: 'Eighth', 9: 'Ninth', 10: 'Tenth'
        };
        const ordinal = ordinals[number] || `${number}th`;
        return `The Constitution (${ordinal} Amendment) Act, ${year}`;
    }
};
