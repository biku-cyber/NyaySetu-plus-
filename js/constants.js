const APP_CONFIG = {
    name: 'ন্যায়সেতু',
    nameEn: 'NyaySetu',
    version: '1.0.0',
    defaultLang: 'as',
    defaultTheme: 'light',
    contentMaxWidth: 720,
    searchDebounce: 300,
    maxRecentItems: 20,
    maxBookmarks: 500,
    fontSizeMin: 14,
    fontSizeMax: 24,
    fontSizeDefault: 17,
    dataPath: '/data',
    assetsPath: '/assets'
};

const ROUTES = {
    HOME: '/',
    SEARCH: '/search',
    BOOKMARKS: '/bookmarks',
    SETTINGS: '/settings',
    ABOUT: '/about',
    DISCLAIMER: '/disclaimer',
    RECENT: '/recent',
    CONSTITUTION: '/constitution',
    CONSTITUTION_PARTS: '/constitution/parts',
    CONSTITUTION_PART: '/constitution/part/:id',
    CONSTITUTION_ARTICLES: '/constitution/part/:id/articles',
    CONSTITUTION_ARTICLE: '/constitution/article/:id',
    CONSTITUTION_SCHEDULES: '/constitution/schedules',
    CONSTITUTION_SCHEDULE: '/constitution/schedule/:id',
    CONSTITUTION_AMENDMENTS: '/constitution/amendments',
    CONSTITUTION_AMENDMENT: '/constitution/amendment/:id',
    CONSTITUTION_PREAMBLE: '/constitution/preamble',
    BNS: '/bns',
    BNS_CHAPTERS: '/bns/chapters',
    BNS_CHAPTER: '/bns/chapter/:id',
    BNS_SECTION: '/bns/section/:id',
    BNSS: '/bnss',
    BNSS_CHAPTERS: '/bnss/chapters',
    BNSS_CHAPTER: '/bnss/chapter/:id',
    BNSS_SECTION: '/bnss/section/:id',
    BSA: '/bsa',
    BSA_CHAPTERS: '/bsa/chapters',
    BSA_CHAPTER: '/bsa/chapter/:id',
    BSA_SECTION: '/bsa/section/:id',
    IPC: '/ipc',
    IPC_CHAPTERS: '/ipc/chapters',
    IPC_CHAPTER: '/ipc/chapter/:id',
    IPC_SECTION: '/ipc/section/:id',
    CRPC: '/crpc',
    CRPC_CHAPTERS: '/crpc/chapters',
    CRPC_CHAPTER: '/crpc/chapter/:id',
    CRPC_SECTION: '/crpc/section/:id'
};

const LAW_METADATA = {
    constitution: {
        id: 'constitution',
        titleAs: 'ভাৰতৰ সংবিধান',
        titleEn: 'Constitution of India',
        year: '১৯৫০',
        icon: '/assets/icons/constitution.svg',
        description: 'ভাৰত গণৰাজ্যৰ সৰ্বোচ্চ আইন',
        totalParts: 25,
        totalArticles: 470,
        totalSchedules: 12,
        totalAmendments: 106
    },
    bns: {
        id: 'bns',
        titleAs: 'ভাৰতীয় ন্যায় সংহিতা',
        titleEn: 'Bharatiya Nyaya Sanhita',
        acronym: 'BNS',
        year: '২০২৩',
        icon: '/assets/icons/law.svg',
        description: 'ফৌজদাৰী দণ্ডবিধি আইন',
        totalChapters: 20,
        totalSections: 358
    },
    bnss: {
        id: 'bnss',
        titleAs: 'ভাৰতীয় নাগৰিক সুৰক্ষা সংহিতা',
        titleEn: 'Bharatiya Nagarik Suraksha Sanhita',
        acronym: 'BNSS',
        year: '০২৩',
        icon: '/assets/icons/law.svg',
        description: 'ফৌজদাৰী কাৰ্যবিধি আইন',
        totalChapters: 31,
        totalSections: 531
    },
    bsa: {
        id: 'bsa',
        titleAs: 'ভাৰতীয় সাক্ষ্য অধিনিয়ম',
        titleEn: 'Bharatiya Sakshya Adhiniyam',
        acronym: 'BSA',
        year: '০২৩',
        icon: '/assets/icons/law.svg',
        description: 'সাক্ষ্য আইন',
        totalChapters: 23,
        totalSections: 170
    },
    ipc: {
        id: 'ipc',
        titleAs: 'ভাৰতীয় দণ্ডবিধি',
        titleEn: 'Indian Penal Code',
        acronym: 'IPC',
        year: '১৮৬০',
        icon: '/assets/icons/law.svg',
        description: 'পুৰণি ফৌজদাৰী দণ্ডবিধি',
        totalChapters: 23,
        totalSections: 511
    },
    crpc: {
        id: 'crpc',
        titleAs: 'ফৌজদাৰী কাৰ্যবিধি সংহিতা',
        titleEn: 'Code of Criminal Procedure',
        acronym: 'CrPC',
        year: '১৯৭৩',
        icon: '/assets/icons/law.svg',
        description: 'পুৰণি ফৌজদাৰী কাৰ্যবিধি',
        totalChapters: 37,
        totalSections: 484
    }
};

const QUICK_ACTIONS = [
    {
        id: 'preamble',
        label: 'প্ৰস্তাৱনা',
        labelEn: 'Preamble',
        icon: '/assets/icons/preamble.svg',
        route: '/constitution/preamble'
    },
    {
        id: 'parts',
        label: 'ভাগ',
        labelEn: 'Parts',
        icon: '/assets/icons/parts.svg',
        route: '/constitution/parts'
    },
    {
        id: 'index',
        label: 'সূচী',
        labelEn: 'Index',
        icon: '/assets/icons/index.svg',
        route: '/constitution'
    },
    {
        id: 'glossary',
        label: 'সংশোধনী',
        labelEn: 'Amendments',
        icon: '/assets/icons/amendments.svg',
        route: '/constitution/amendments'
    },
    {
        id: 'cache',
        label: 'কেচ ষ্টোৰি',
        labelEn: 'Case Study',
        icon: '/assets/icons/case.svg',
        route: '/search'
    },
    {
        id: 'bookmarks',
        label: 'বুকমাৰ্ক',
        labelEn: 'Bookmarks',
        icon: '/assets/icons/bookmark.svg',
        route: '/bookmarks'
    }
];
