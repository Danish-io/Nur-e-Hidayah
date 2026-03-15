type StarterPrompt = string;

export type IntentId = "ease" | "thanks" | "forgiveness" | "guidance" | "protection";

export interface Intent {
  id: IntentId;
  label: string;
  description: string;
  prompts: StarterPrompt[];
}

export const intents: Intent[] = [
  {
    id: "ease",
    label: "Need Ease",
    description: "Relief, provision, hardship, or a pressing need.",
    prompts: [
      "I am overwhelmed by financial pressure and need halal relief.",
      "I need patience and ease while caring for my family.",
      "I feel exhausted and I need Allah to open a better path for me."
    ]
  },
  {
    id: "thanks",
    label: "Give Thanks",
    description: "Express gratitude for blessings, health, or a recent success.",
    prompts: [
      "I want to thank Allah for the recent blessing in my life.",
      "I am grateful for my health and the safety of my family.",
      "Thank you Ya Allah for guiding me through a difficult time."
    ]
  },
  {
    id: "forgiveness",
    label: "Seek Forgiveness",
    description: "Repentance from minor or major sins, or seeking a clean slate.",
    prompts: [
      "I have slipped back into a bad habit and need Allah's forgiveness.",
      "I want to sincerely repent for my past mistakes and start fresh.",
      "Ya Allah, forgive my shortcomings in worship and daily life."
    ]
  },
  {
    id: "guidance",
    label: "Ask For Guidance",
    description: "Seeking direction for a decision, career, marriage, or faith.",
    prompts: [
      "I am confused about a major life decision and need clarity.",
      "Please guide my heart toward what is best for my Deen and Dunya.",
      "Ya Allah, guide me and my loved ones to the straight path."
    ]
  },
  {
    id: "protection",
    label: "Ask For Protection",
    description: "Safety from harm, evil eye, anxiety, or bad company.",
    prompts: [
      "I feel anxious and need protection from negative thoughts.",
      "Protect my family from all harm, illness, and the evil eye.",
      "Keep me safe from bad influences and protect my heart."
    ]
  }
];

export interface NameOfAllah {
  arabic: string;
  transliteration: string;
  translation: string;
  reason: string;
  surah?: string;
}

export interface AuthenticDua {
  title: string;
  source: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reason: string;
}

export interface GeneratedData {
  guidedDua: string;
  namesOfAllah: NameOfAllah[];
  authenticDuas: AuthenticDua[];
  comfort: string;
}

export const dataLookup: Record<IntentId, GeneratedData> = {
  ease: {
    guidedDua: "O Allah, Ar-Rahman, the Most Gracious, I turn to You in my time of distress. You see the weight of financial pressure upon my heart, and I seek Your mercy, Ar-Raheem, the Most Merciful. Please provide me with halal relief and open the doors of provision that are good and pure. Grant me peace of heart, Al-Basit, as I navigate these challenges. Help me to trust in Your plan and find solace in Your guidance. Fill my life with barakah and let my sustenance be a source of gratitude. O Allah, I place my trust in You, knowing that You are the Bestower of all good things. May peace and blessings be upon our beloved Prophet Muhammad ﷺ.",
    namesOfAllah: [
      {
        arabic: "ٱلْرَّحْمَـانُ",
        transliteration: "Ar-Rahman",
        translation: "The Most Gracious",
        reason: "Ar-Rahman fits because it points to Allah's mercy.",
        surah: "Surah Al-Fatihah 1:3"
      },
      {
        arabic: "ٱلْرَّحِيْمُ",
        transliteration: "Ar-Raheem",
        translation: "The Most Merciful",
        reason: "Ar-Raheem fits because it points to Allah's mercy.",
        surah: "Surah Al-Fatihah 1:3"
      },
      {
        arabic: "الْبَاسِطُ",
        transliteration: "Al-Basit",
        translation: "The Expander, The Reliever",
        reason: "Al-Basit fits because it points to Allah's peace of heart.",
        surah: "Surah Ash-Sharh 94:1"
      }
    ],
    authenticDuas: [
      {
        title: "Dua for Relief from Distress",
        source: "Ahmad",
        arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ، وَابْنُ عَبْدِكَ، وَابْنُ أَمَتِكَ... أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي",
        transliteration: "Allahumma inni 'abduk, ibnu 'abdik, ibnu amatik... an taj'alal-Qur'ana rabee'a qalbi, wa noora sadri, wa jalaa'a huzni, wa thahaba hammi",
        translation: "O Allah, I am Your slave, the son of Your slave... make the Quran the spring of my heart, the light of my chest, the remover of my sadness, and the reliever of my distress.",
        reason: "This dua is a heartfelt plea for relief from sadness and distress, directly addressing the overwhelming financial pressure you are feeling. It emphasizes seeking solace in the Quran, which is a source of comfort and guidance."
      },
      {
        title: "Dua for Good Provision",
        source: "Ibn Majah",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        transliteration: "Allahumma inni as'aluka 'ilman naafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
        translation: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
        reason: "This dua specifically requests good provision, which aligns perfectly with your need for halal relief from financial pressure. It emphasizes the importance of beneficial knowledge and deeds, reminding us to seek sustenance that is pleasing to Allah."
      }
    ],
    comfort: "Remember, dear one, that Allah's mercy is vast and His provisions are abundant. His promise in the Quran: 'And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect' (Surah At-Talaq 65:2-3). Have faith that your hardships will be alleviated, and your perseverance will be rewarded. You are not alone; Allah sees your struggles and is always near to those who call upon Him."
  },
  thanks: {
    guidedDua: "O Allah, Al-Wahhab, the Bestower, I turn to You with a heart full of profound gratitude. Thank You, Ash-Shakur, for the blessings You have recently poured into my life. I recognize that every success and moment of joy comes solely from You. Please help me to use these blessings to draw closer to You and to benefit others. Grant me the humility to always remember Your favors and never take them for granted. Let my gratitude be shown not just in my words, but in my actions.",
    namesOfAllah: [
      {
        arabic: "الْوَهَّابُ",
        transliteration: "Al-Wahhab",
        translation: "The Bestower",
        reason: "Al-Wahhab fits because He is the source of all gifts and blessings."
      },
      {
        arabic: "الشَّكُورُ",
        transliteration: "Ash-Shakur",
        translation: "The Most Appreciative",
        reason: "Ash-Shakur fits as we express our gratitude to the One who appreciates even our smallest deeds."
      }
    ],
    authenticDuas: [
      {
        title: "Dua of Prophet Sulaiman (AS) for Gratitude",
        source: "Quran 27:19",
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ",
        transliteration: "Rabbi awzi'nee an ashkura ni'mataka allatee an'amta 'alayya wa'alaa waalidayya waan a'mala saalihan tardahu",
        translation: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve.",
        reason: "A beautiful Quranic dua specifically asking Allah for the ability to remain grateful for His countless blessings."
      }
    ],
    comfort: "Gratitude (Shukr) is a powerful act of worship. Allah guarantees in the Quran: 'If you are grateful, I will surely increase you [in favor]' (Surah Ibrahim 14:7). May your gratitude be the key to even greater barakah in your life."
  },
  forgiveness: {
    guidedDua: "O Allah, Al-Ghaffar, the Oft-Forgiving, I come before You acknowledging my flaws and mistakes. I have wronged myself, and I seek Your utter forgiveness, Al-'Afuw, the Pardoner. Please wipe away my sins, both the ones I know and the ones I do not know. Purify my heart and strengthen my resolve so that I do not return to those habits. Grant me the sweetness of sincere repentance (Tawbah Nassuha) and accept my apologies. You are the Most Merciful, and there is no one who can forgive sins except You.",
    namesOfAllah: [
      {
        arabic: "الْغَفَّارُ",
        transliteration: "Al-Ghaffar",
        translation: "The Oft-Forgiving",
        reason: "Because He continuously forgives our repeated mistakes."
      },
      {
        arabic: "الْعَفُوُّ",
        transliteration: "Al-Afuw",
        translation: "The Pardoner",
        reason: "He doesn't just forgive; He completely erases the sin as if it never happened."
      }
    ],
    authenticDuas: [
      {
        title: "Sayyid al-Istighfar (The Best Manner of Seeking Forgiveness)",
        source: "Bukhari",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        transliteration: "Allahumma anta Rabbee la ilaha illa anta, khalaqtanee wa-ana 'abduka, wa-ana 'alaa 'ahdika wawa'dika masta-ta'tu. A'oothu bika min sharri ma sana'tu, aboo-u laka bini'matika 'alayya, wa-aboo-u bithanbee, faghfir lee fa-innahu la yaghfiruth-thunooba illa anta.",
        translation: "O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your slave. I keep Your covenant, and my pledge to You so far as I am able. I seek refuge in You from the evil of what I have done. I admit to Your blessings upon me, and I admit to my misdeeds. Forgive me, for there is none who may forgive sins but You.",
        reason: "This is known as the Master of Forgiveness. The Prophet ﷺ said whoever recites this with certainty and dies that day/night will enter Paradise."
      }
    ],
    comfort: "Never despair of Allah's mercy. He says in the Quran: 'Say, O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.' (Surah Az-Zumar 39:53). A sincere repentance wipes the slate clean."
  },
  guidance: {
    guidedDua: "O Allah, Al-Haadi, the Ultimate Guide, I am feeling lost and uncertain about my next steps. I ask You to illuminate my path with Your divine light, An-Nur. Please grant me clarity of mind and the wisdom to make decisions that please You and bring me peace. If what I am considering is good for my Deen, my worldly life, and my Hereafter, then make it easy for me. If it is bad for me, then turn it away from me and turn me away from it, and guide me to what is truly better. I place my reliance entirely on You.",
    namesOfAllah: [
      {
        arabic: "الْهَادِي",
        transliteration: "Al-Haadi",
        translation: "The Guide",
        reason: "He is the One who guides hearts to the truth and guides us through the confusions of life."
      },
      {
        arabic: "النُّورُ",
        transliteration: "An-Nur",
        translation: "The Light",
        reason: "His light dispels the darkness of ignorance and indecision."
      }
    ],
    authenticDuas: [
      {
        title: "Dua for Guidance and Piety",
        source: "Muslim",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
        translation: "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.",
        reason: "A comprehensive dua asking for proper direction in all affairs of life."
      }
    ],
    comfort: "When you feel lost, remember that Allah is Al-Haadi (The Guide). He says: 'And whoever relies upon Allah - then He is sufficient for him.' (Surah At-Talaq 65:3). Trust the process of Istikhara; whatever happens after seeking His guidance is the best outcome, even if it differs from what you originally wanted."
  },
  protection: {
    guidedDua: "O Allah, Al-Hafiz, the Protector, I seek refuge in You from all that brings harm or anxiety to my heart. Wrap me and my loved ones in Your divine protection, Al-Muhaimin, the Guardian. Shield us from the evils of what You have created, from illnesses, from the evil eye, and from the whispers of Shaitan. I place myself in Your care, trusting that no harm can reach me without Your permission, and no one can protect me except You. Bring peace to my anxious heart and grant me the safety of Your shade.",
    namesOfAllah: [
      {
        arabic: "الْحَفِيظُ",
        transliteration: "Al-Hafiz",
        translation: "The Protector",
        reason: "He preserves and protects everything He has created from harm."
      },
      {
        arabic: "الْمُهَيْمِنُ",
        transliteration: "Al-Muhaimin",
        translation: "The Guardian",
        reason: "He is the Guardian over all things, observing and protecting His servants."
      }
    ],
    authenticDuas: [
      {
        title: "Dua for Protection in the Morning and Evening",
        source: "Abu Dawud",
        arabic: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَىْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        transliteration: "Bismillahil-lathi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
        translation: "In the Name of Allah with Whose Name there is protection against every kind of harm in the earth or in the heaven, and He is the All-Hearing and All-Knowing.",
        reason: "Reciting this three times morning and evening guarantees protection from sudden afflictions."
      }
    ],
    comfort: "Anxiety and fear are human, but our refuge is divine. The Prophet ﷺ taught us the incredible protective power of the Mu'awwidhatayn (Surahs Al-Falaq and An-Nas) and Ayatul Kursi. Recite them with conviction. Rest assured that the protection of Allah is stronger than any harm."
  }
};
