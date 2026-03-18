"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Available languages
export type Language = "english" | "urdu" | "hindi" | "arabic";

// Translation structure
export type Translations = {
    // Navigation
    nav: {
        home: string;
        quran: string;
        prayer: string;
        qibla: string;
        ramadan: string;
        radio: string;
        hadith: string;
        duas: string;
        search: string;
        bookmarks: string;
        settings: string;
        help: string;
        scholars: string;
        quranPdf: string;
    };
    // Common
    common: {
        features: string;
        profile: string;
        loading: string;
        error: string;
        save: string;
        cancel: string;
        close: string;
        search: string;
        back: string;
        next: string;
        previous: string;
    };
    // Home page
    home: {
        welcome: string;
        tagline: string;
        prayerTimings: string;
        readAndReflect: string;
        trackJourney: string;
        direction: string;
        askInsight: string;
        supplications: string;
        live24_7: string;
        wisdom: string;
        saved: string;
        customize: string;
        guide: string;
        mushafMode: string;
        mushafDesc: string;
    };
    // Settings page
    settings: {
        title: string;
        subtitle: string;
        appearance: string;
        theme: string;
        themeDesc: string;
        light: string;
        dark: string;
        system: string;
        textSize: string;
        textSizeDesc: string;
        arabicFontSize: string;
        arabicFontSizeDesc: string;
        language: string;
        languageDesc: string;
        translationLang: string;
        translationLangDesc: string;
        location: string;
        locationDesc: string;
        prayerSettings: string;
        calcMethod: string;
        calcMethodDesc: string;
        madhab: string;
        madhabDesc: string;
        notifications: string;
        prayerReminders: string;
        prayerRemindersDesc: string;
        adhanSound: string;
        adhanSoundDesc: string;
        dailyVerse: string;
        dailyVerseDesc: string;
        ramadanReminders: string;
        ramadanRemindersDesc: string;
        audio: string;
        defaultReciter: string;
        defaultReciterDesc: string;
        autoPlayNext: string;
        autoPlayNextDesc: string;
        reading: string;
        showTranslation: string;
        showTranslationDesc: string;
        showTransliteration: string;
        showTransliterationDesc: string;
        tajweed: string;
        tajweedDesc: string;
        accessibility: string;
        highContrast: string;
        highContrastDesc: string;
        reducedMotion: string;
        reducedMotionDesc: string;
        data: string;
        downloadOffline: string;
        downloadOfflineDesc: string;
        clearCache: string;
        clearCacheDesc: string;
        download: string;
        version: string;
        madeWith: string;
    };
    // Prayer page
    prayer: {
        title: string;
        fajr: string;
        sunrise: string;
        dhuhr: string;
        asr: string;
        maghrib: string;
        isha: string;
        nextPrayer: string;
        timeRemaining: string;
    };
    // Ramadan
    ramadan: {
        title: string;
        day: string;
        suhoor: string;
        iftar: string;
        fastingHours: string;
        quranProgress: string;
        prayersCompleted: string;
        goodDeeds: string;
    };
};

// English translations
const en: Translations = {
    nav: {
        home: "Home",
        quran: "Quran",
        prayer: "Prayer",
        qibla: "Qibla",
        ramadan: "Ramadan",
        radio: "Radio",
        hadith: "Hadith",
        duas: "Duas",
        search: "AI Search",
        bookmarks: "Bookmarks",
        settings: "Settings",
        help: "Help",
        scholars: "Scholars",
        quranPdf: "Quran PDF",
    },
    common: {
        features: "Features",
        profile: "My Profile",
        loading: "Loading...",
        error: "Something went wrong",
        save: "Save",
        cancel: "Cancel",
        close: "Close",
        search: "Search",
        back: "Back",
        next: "Next",
        previous: "Previous",
    },
    home: {
        welcome: "Nur-e-Hidayah",
        tagline: "A gentle guide back to Allah",
        prayerTimings: "Timings",
        readAndReflect: "Read & Reflect",
        trackJourney: "Track Journey",
        direction: "Direction",
        askInsight: "Ask Insight",
        supplications: "Supplications",
        live24_7: "Live 24/7",
        wisdom: "Wisdom",
        saved: "Saved",
        customize: "Customize",
        guide: "Guide",
        mushafMode: "Quran Mushaf (Readable) Mode",
        mushafDesc: "Authentic Book Experience",
    },
    settings: {
        title: "Settings",
        subtitle: "Customize your spiritual journey",
        appearance: "Appearance",
        theme: "Theme",
        themeDesc: "Choose your preferred color scheme",
        light: "Light",
        dark: "Dark",
        system: "System",
        textSize: "Text Size",
        textSizeDesc: "Adjust the reading font size",
        arabicFontSize: "Arabic Font Size",
        arabicFontSizeDesc: "Size of Arabic text in Quran",
        language: "App Language",
        languageDesc: "Select your preferred language",
        translationLang: "Translation Language",
        translationLangDesc: "Quran translation language",
        location: "Location",
        locationDesc: "For accurate prayer times",
        prayerSettings: "Prayer Settings",
        calcMethod: "Calculation Method",
        calcMethodDesc: "Prayer time calculation method",
        madhab: "Madhab (Asr Calculation)",
        madhabDesc: "Juristic method for Asr timing",
        notifications: "Notifications",
        prayerReminders: "Prayer Time Reminders",
        prayerRemindersDesc: "Get notified before each prayer",
        adhanSound: "Adhan Sound",
        adhanSoundDesc: "Play Adhan at prayer times",
        dailyVerse: "Daily Verse",
        dailyVerseDesc: "Receive a verse each morning",
        ramadanReminders: "Ramadan Reminders",
        ramadanRemindersDesc: "Suhoor and Iftar notifications",
        audio: "Audio",
        defaultReciter: "Default Reciter",
        defaultReciterDesc: "Preferred Quran reciter",
        autoPlayNext: "Auto-play Next Surah",
        autoPlayNextDesc: "Continue to next surah automatically",
        reading: "Reading Preferences",
        showTranslation: "Show Translation",
        showTranslationDesc: "Display translation below Arabic",
        showTransliteration: "Show Transliteration",
        showTransliterationDesc: "Roman script pronunciation guide",
        tajweed: "Tajweed Highlighting",
        tajweedDesc: "Color-coded tajweed rules",
        accessibility: "Accessibility",
        highContrast: "High Contrast",
        highContrastDesc: "Increase text contrast for readability",
        reducedMotion: "Reduced Motion",
        reducedMotionDesc: "Minimize animations",
        data: "Data & Storage",
        downloadOffline: "Download Offline Data",
        downloadOfflineDesc: "Save Quran for offline reading",
        clearCache: "Clear Cache",
        clearCacheDesc: "Free up storage space",
        download: "Download",
        version: "Version",
        madeWith: "Made with ❤️ for the Ummah",
    },
    prayer: {
        title: "Prayer Times",
        fajr: "Fajr",
        sunrise: "Sunrise",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha",
        nextPrayer: "Next Prayer",
        timeRemaining: "Time Remaining",
    },
    ramadan: {
        title: "Ramadan",
        day: "Day",
        suhoor: "Suhoor",
        iftar: "Iftar",
        fastingHours: "Fasting Hours",
        quranProgress: "Quran Progress",
        prayersCompleted: "Prayers Completed",
        goodDeeds: "Good Deeds",
    },
};

// Urdu translations
const ur: Translations = {
    nav: {
        home: "ہوم",
        quran: "قرآن",
        prayer: "نماز",
        qibla: "قبلہ",
        ramadan: "رمضان",
        radio: "ریڈیو",
        hadith: "حدیث",
        duas: "دعائیں",
        search: "اے آئی تلاش",
        bookmarks: "بک مارکس",
        settings: "ترتیبات",
        help: "مدد",
        scholars: "علماء",
        quranPdf: "قرآن پی ڈی ایف",
    },
    common: {
        features: "خصوصیات",
        profile: "میری پروفائل",
        loading: "لوڈ ہو رہا ہے...",
        error: "کچھ غلط ہو گیا",
        save: "محفوظ کریں",
        cancel: "منسوخ",
        close: "بند کریں",
        search: "تلاش",
        back: "واپس",
        next: "اگلا",
        previous: "پچھلا",
    },
    home: {
        welcome: "نورِ ہدایت",
        tagline: "اللہ کی طرف واپسی کا نرم رہنما",
        prayerTimings: "اوقات",
        readAndReflect: "پڑھیں اور غور کریں",
        trackJourney: "سفر کا حساب",
        direction: "سمت",
        askInsight: "بصیرت طلب کریں",
        supplications: "دعائیں",
        live24_7: "24/7 لائیو",
        wisdom: "حکمت",
        saved: "محفوظ",
        customize: "ترتیب دیں",
        guide: "رہنما",
        mushafMode: "قرآن مصحف (پڑھنے کا انداز)",
        mushafDesc: "اصلی کتابی تجربہ",
    },
    settings: {
        title: "ترتیبات",
        subtitle: "اپنے روحانی سفر کو ترتیب دیں",
        appearance: "ظاہری شکل",
        theme: "تھیم",
        themeDesc: "اپنا پسندیدہ رنگ منتخب کریں",
        light: "روشن",
        dark: "تاریک",
        system: "سسٹم",
        textSize: "متن کا سائز",
        textSizeDesc: "پڑھنے کے فونٹ کا سائز",
        arabicFontSize: "عربی فونٹ سائز",
        arabicFontSizeDesc: "قرآن میں عربی متن کا سائز",
        language: "ایپ کی زبان",
        languageDesc: "اپنی پسندیدہ زبان منتخب کریں",
        translationLang: "ترجمہ کی زبان",
        translationLangDesc: "قرآن ترجمہ کی زبان",
        location: "مقام",
        locationDesc: "درست نماز کے اوقات کے لیے",
        prayerSettings: "نماز کی ترتیبات",
        calcMethod: "حساب کا طریقہ",
        calcMethodDesc: "نماز کے اوقات کا طریقہ کار",
        madhab: "مذہب (عصر کا حساب)",
        madhabDesc: "عصر کے لیے فقہی طریقہ",
        notifications: "اطلاعات",
        prayerReminders: "نماز کی یاد دہانی",
        prayerRemindersDesc: "ہر نماز سے پہلے اطلاع",
        adhanSound: "اذان کی آواز",
        adhanSoundDesc: "نماز کے وقت اذان",
        dailyVerse: "روزانہ آیت",
        dailyVerseDesc: "ہر صبح ایک آیت",
        ramadanReminders: "رمضان کی یاد دہانی",
        ramadanRemindersDesc: "سحری اور افطار کی اطلاع",
        audio: "آڈیو",
        defaultReciter: "پہلے سے طے شدہ قاری",
        defaultReciterDesc: "پسندیدہ قرآن قاری",
        autoPlayNext: "اگلی سورت خود چلائیں",
        autoPlayNextDesc: "اگلی سورت خود بخود شروع ہو",
        reading: "پڑھنے کی ترجیحات",
        showTranslation: "ترجمہ دکھائیں",
        showTranslationDesc: "عربی کے نیچے ترجمہ",
        showTransliteration: "تلفظ دکھائیں",
        showTransliterationDesc: "رومن اسکرپٹ گائیڈ",
        tajweed: "تجوید ہائی لائٹنگ",
        tajweedDesc: "رنگین تجوید قواعد",
        accessibility: "رسائی",
        highContrast: "زیادہ کنٹراسٹ",
        highContrastDesc: "پڑھنے کے لیے زیادہ کنٹراسٹ",
        reducedMotion: "کم حرکت",
        reducedMotionDesc: "اینیمیشن کم کریں",
        data: "ڈیٹا اور اسٹوریج",
        downloadOffline: "آف لائن ڈیٹا ڈاؤن لوڈ",
        downloadOfflineDesc: "آف لائن پڑھنے کے لیے",
        clearCache: "کیش صاف کریں",
        clearCacheDesc: "اسٹوریج خالی کریں",
        download: "ڈاؤن لوڈ",
        version: "ورژن",
        madeWith: "امت کے لیے ❤️ سے بنایا",
    },
    prayer: {
        title: "نماز کے اوقات",
        fajr: "فجر",
        sunrise: "طلوع آفتاب",
        dhuhr: "ظہر",
        asr: "عصر",
        maghrib: "مغرب",
        isha: "عشاء",
        nextPrayer: "اگلی نماز",
        timeRemaining: "باقی وقت",
    },
    ramadan: {
        title: "رمضان",
        day: "دن",
        suhoor: "سحری",
        iftar: "افطار",
        fastingHours: "روزے کے گھنٹے",
        quranProgress: "قرآن کی پیشرفت",
        prayersCompleted: "نمازیں مکمل",
        goodDeeds: "نیک اعمال",
    },
};

// Hindi translations
const hi: Translations = {
    nav: {
        home: "होम",
        quran: "कुरान",
        prayer: "नमाज़",
        qibla: "किबला",
        ramadan: "रमज़ान",
        radio: "रेडियो",
        hadith: "हदीस",
        duas: "दुआएं",
        search: "AI खोज",
        bookmarks: "बुकमार्क्स",
        settings: "सेटिंग्स",
        help: "मदद",
        scholars: "इस्लामिक विद्वान",
        quranPdf: "कुरान PDF",
    },
    common: {
        features: "विशेषताएं",
        profile: "मेरी प्रोफ़ाइल",
        loading: "लोड हो रहा है...",
        error: "कुछ गलत हो गया",
        save: "सहेजें",
        cancel: "रद्द करें",
        close: "बंद करें",
        search: "खोजें",
        back: "वापस",
        next: "अगला",
        previous: "पिछला",
    },
    home: {
        welcome: "नूर-ए-हिदायत",
        tagline: "अल्लाह की ओर वापसी का कोमल मार्गदर्शक",
        prayerTimings: "समय",
        readAndReflect: "पढ़ें और सोचें",
        trackJourney: "यात्रा ट्रैक",
        direction: "दिशा",
        askInsight: "अंतर्दृष्टि पूछें",
        supplications: "दुआएं",
        live24_7: "24/7 लाइव",
        wisdom: "ज्ञान",
        saved: "सहेजा गया",
        customize: "कस्टमाइज़",
        guide: "गाइड",
        mushafMode: "कुरान मुसहफ (पढ़ने का मोड)",
        mushafDesc: "प्रामाणिक पुस्तक अनुभव",
    },
    settings: {
        title: "सेटिंग्स",
        subtitle: "अपनी आध्यात्मिक यात्रा को अनुकूलित करें",
        appearance: "दिखावट",
        theme: "थीम",
        themeDesc: "अपनी पसंदीदा रंग योजना चुनें",
        light: "लाइट",
        dark: "डार्क",
        system: "सिस्टम",
        textSize: "टेक्स्ट साइज़",
        textSizeDesc: "पढ़ने का फ़ॉन्ट साइज़",
        arabicFontSize: "अरबी फ़ॉन्ट साइज़",
        arabicFontSizeDesc: "कुरान में अरबी टेक्स्ट का साइज़",
        language: "ऐप की भाषा",
        languageDesc: "अपनी पसंदीदा भाषा चुनें",
        translationLang: "अनुवाद भाषा",
        translationLangDesc: "कुरान अनुवाद की भाषा",
        location: "स्थान",
        locationDesc: "सटीक नमाज़ के समय के लिए",
        prayerSettings: "नमाज़ सेटिंग्स",
        calcMethod: "गणना विधि",
        calcMethodDesc: "नमाज़ समय गणना विधि",
        madhab: "मज़हब (अस्र गणना)",
        madhabDesc: "अस्र के लिए फ़िक़ही तरीका",
        notifications: "सूचनाएं",
        prayerReminders: "नमाज़ रिमाइंडर",
        prayerRemindersDesc: "हर नमाज़ से पहले सूचना",
        adhanSound: "अज़ान की आवाज़",
        adhanSoundDesc: "नमाज़ के वक्त अज़ान",
        dailyVerse: "रोज़ाना आयत",
        dailyVerseDesc: "हर सुबह एक आयत",
        ramadanReminders: "रमज़ान रिमाइंडर",
        ramadanRemindersDesc: "सहरी और इफ्तार सूचना",
        audio: "ऑडियो",
        defaultReciter: "डिफ़ॉल्ट क़ारी",
        defaultReciterDesc: "पसंदीदा कुरान क़ारी",
        autoPlayNext: "अगली सूरत ऑटो-प्ले",
        autoPlayNextDesc: "अगली सूरत अपने आप चले",
        reading: "पढ़ने की प्राथमिकताएं",
        showTranslation: "अनुवाद दिखाएं",
        showTranslationDesc: "अरबी के नीचे अनुवाद",
        showTransliteration: "उच्चारण दिखाएं",
        showTransliterationDesc: "रोमन स्क्रिप्ट गाइड",
        tajweed: "तजवीद हाइलाइटिंग",
        tajweedDesc: "रंगीन तजवीद नियम",
        accessibility: "एक्सेसिबिलिटी",
        highContrast: "हाई कंट्रास्ट",
        highContrastDesc: "पढ़ने के लिए ज़्यादा कंट्रास्ट",
        reducedMotion: "कम गति",
        reducedMotionDesc: "एनिमेशन कम करें",
        data: "डेटा और स्टोरेज",
        downloadOffline: "ऑफ़लाइन डेटा डाउनलोड",
        downloadOfflineDesc: "ऑफ़लाइन पढ़ने के लिए",
        clearCache: "कैश साफ़ करें",
        clearCacheDesc: "स्टोरेज खाली करें",
        download: "डाउनलोड",
        version: "वर्शन",
        madeWith: "उम्मत के लिए ❤️ से बनाया",
    },
    prayer: {
        title: "नमाज़ का समय",
        fajr: "फज्र",
        sunrise: "सूर्योदय",
        dhuhr: "ज़ुहर",
        asr: "अस्र",
        maghrib: "मग़रिब",
        isha: "इशा",
        nextPrayer: "अगली नमाज़",
        timeRemaining: "बाकी समय",
    },
    ramadan: {
        title: "रमज़ान",
        day: "दिन",
        suhoor: "सहरी",
        iftar: "इफ्तार",
        fastingHours: "रोज़े के घंटे",
        quranProgress: "कुरान प्रगति",
        prayersCompleted: "नमाज़ें पूरी",
        goodDeeds: "नेक काम",
    },
};

// Arabic translations
const ar: Translations = {
    nav: {
        home: "الرئيسية",
        quran: "القرآن",
        prayer: "الصلاة",
        qibla: "القبلة",
        ramadan: "رمضان",
        radio: "الراديو",
        hadith: "الحديث",
        duas: "الأدعية",
        search: "البحث الذكي",
        bookmarks: "المحفوظات",
        settings: "الإعدادات",
        help: "المساعدة",
        scholars: "العلماء",
        quranPdf: "القرآن PDF",
    },
    common: {
        features: "الميزات",
        profile: "ملفي الشخصي",
        loading: "جاري التحميل...",
        error: "حدث خطأ ما",
        save: "حفظ",
        cancel: "إلغاء",
        close: "إغلاق",
        search: "بحث",
        back: "رجوع",
        next: "التالي",
        previous: "السابق",
    },
    home: {
        welcome: "نور الهداية",
        tagline: "دليل لطيف للعودة إلى الله",
        prayerTimings: "المواقيت",
        readAndReflect: "اقرأ وتأمل",
        trackJourney: "تتبع الرحلة",
        direction: "الاتجاه",
        askInsight: "اسأل للفهم",
        supplications: "الأدعية",
        live24_7: "مباشر 24/7",
        wisdom: "الحكمة",
        saved: "المحفوظ",
        customize: "تخصيص",
        guide: "الدليل",
        mushafMode: "المصحف الشريف (وضع القراءة)",
        mushafDesc: "تجربة الكتاب الأصيلة",
    },
    settings: {
        title: "الإعدادات",
        subtitle: "خصص رحلتك الروحانية",
        appearance: "المظهر",
        theme: "السمة",
        themeDesc: "اختر نظام الألوان المفضل",
        light: "فاتح",
        dark: "داكن",
        system: "النظام",
        textSize: "حجم النص",
        textSizeDesc: "حجم خط القراءة",
        arabicFontSize: "حجم الخط العربي",
        arabicFontSizeDesc: "حجم النص العربي في القرآن",
        language: "لغة التطبيق",
        languageDesc: "اختر لغتك المفضلة",
        translationLang: "لغة الترجمة",
        translationLangDesc: "لغة ترجمة القرآن",
        location: "الموقع",
        locationDesc: "لأوقات صلاة دقيقة",
        prayerSettings: "إعدادات الصلاة",
        calcMethod: "طريقة الحساب",
        calcMethodDesc: "طريقة حساب أوقات الصلاة",
        madhab: "المذهب (حساب العصر)",
        madhabDesc: "الطريقة الفقهية لوقت العصر",
        notifications: "الإشعارات",
        prayerReminders: "تذكير الصلاة",
        prayerRemindersDesc: "إشعار قبل كل صلاة",
        adhanSound: "صوت الأذان",
        adhanSoundDesc: "تشغيل الأذان في أوقات الصلاة",
        dailyVerse: "آية اليوم",
        dailyVerseDesc: "استلم آية كل صباح",
        ramadanReminders: "تذكيرات رمضان",
        ramadanRemindersDesc: "إشعارات السحور والإفطار",
        audio: "الصوت",
        defaultReciter: "القارئ الافتراضي",
        defaultReciterDesc: "قارئ القرآن المفضل",
        autoPlayNext: "تشغيل السورة التالية تلقائياً",
        autoPlayNextDesc: "الانتقال للسورة التالية تلقائياً",
        reading: "تفضيلات القراءة",
        showTranslation: "عرض الترجمة",
        showTranslationDesc: "عرض الترجمة أسفل العربية",
        showTransliteration: "عرض التلفظ",
        showTransliterationDesc: "دليل النطق بالحروف اللاتينية",
        tajweed: "إبراز التجويد",
        tajweedDesc: "قواعد التجويد الملونة",
        accessibility: "إمكانية الوصول",
        highContrast: "تباين عالي",
        highContrastDesc: "زيادة تباين النص للقراءة",
        reducedMotion: "تقليل الحركة",
        reducedMotionDesc: "تقليل الرسوم المتحركة",
        data: "البيانات والتخزين",
        downloadOffline: "تحميل للقراءة بدون إنترنت",
        downloadOfflineDesc: "حفظ القرآن للقراءة بدون إنترنت",
        clearCache: "مسح الذاكرة المؤقتة",
        clearCacheDesc: "تحرير مساحة التخزين",
        download: "تحميل",
        version: "الإصدار",
        madeWith: "صنع بـ ❤️ للأمة",
    },
    prayer: {
        title: "أوقات الصلاة",
        fajr: "الفجر",
        sunrise: "الشروق",
        dhuhr: "الظهر",
        asr: "العصر",
        maghrib: "المغرب",
        isha: "العشاء",
        nextPrayer: "الصلاة القادمة",
        timeRemaining: "الوقت المتبقي",
    },
    ramadan: {
        title: "رمضان",
        day: "اليوم",
        suhoor: "السحور",
        iftar: "الإفطار",
        fastingHours: "ساعات الصيام",
        quranProgress: "تقدم القرآن",
        prayersCompleted: "الصلوات المكتملة",
        goodDeeds: "الحسنات",
    },
};

// All translations
const translations: Record<Language, Translations> = {
    english: en,
    urdu: ur,
    hindi: hi,
    arabic: ar,
};

// Context
interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
    dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider
export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("english");

    useEffect(() => {
        // Load saved language
        const savedLang = localStorage.getItem("nur-language") as Language;
        if (savedLang && translations[savedLang]) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("nur-language", lang);
        // Update document direction for RTL languages
        document.documentElement.dir = (lang === "urdu" || lang === "arabic") ? "rtl" : "ltr";
    };

    const dir = (language === "urdu" || language === "arabic") ? "rtl" : "ltr";

    return (
        <I18nContext.Provider value={{ language, setLanguage, t: translations[language], dir }}>
            {children}
        </I18nContext.Provider>
    );
}

// Hook
export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error("useI18n must be used within an I18nProvider");
    }
    return context;
}
