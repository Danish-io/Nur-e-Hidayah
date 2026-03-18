import { Scholar } from '../types/scholar';

export const scholars: Scholar[] = [
    {
        id: "abu-hanifah",
        name: {
            en: "Imam Abu Hanifah",
            ar: "الإمام أبو حنيفة"
        },
        school: "Hanafi",
        era: "8th Century",
        region: "Kufa (Iraq)",
        bio: {
            kids: {
                en: "Imam Abu Hanifah was a very smart and kind teacher who loved learning. He was one of the first great scholars of Islam. He taught people to think carefully and use their minds to understand what is right. He was also a merchant who sold silk and was very honest.",
                ar: "كان الإمام أبو حنيفة معلماً ذكياً ومحباً للعلم. علم الناس التفكير واستخدام عقولهم لفهم الصواب. كان تاجراً أميناً يبيع الحرير."
            },
            madrasah: {
                en: "Known as 'Al-Imam Al-A'zam' (The Great Imam), Abu Hanifah founded the Hanafi school of Fiqh. He emphasized the use of 'Qiyas' (analogical reason) alongside the Quran and Sunnah to solving new problems. He refused to work for corrupt rulers and stood firm for justice.",
                ar: "عُرف بـ 'الإمام الأعظم'، وأسس المذهب الحنفي. ركز على استخدام القياس بجانب القرآن والسنة لحل المسائل الجديدة. رفض العمل مع الحكام الظالمين وثبت على الحق."
            },
            university: {
                en: "Nu'man ibn Thabit, widely known as Abu Hanifah, was a pioneer in codifying Islamic jurisprudence. His methodology (Usul al-Fiqh) integrated textual evidence with 'Ra'y' (sound opinion) and 'Istihsan' (juristic preference). His legal school played a foundational role in the Abbasid and Ottoman legal systems.",
                ar: "النعمان بن ثابت، المعروف بأبي حنيفة، كان رائداً في تدوين الفقه الإسلامي. جمع منهجه (أصول الفقه) بين الأدلة النصية و'الرأي' و'الاستحسان'. لعب مذهبه دوراً تأسيسياً في الأنظمة القانونية العباسية والعثمانية."
            }
        }
    },
    {
        id: "maliki",
        name: {
            en: "Imam Malik",
            ar: "الإمام مالك"
        },
        school: "Maliki",
        era: "8th Century",
        region: "Madinah",
        bio: {
            kids: {
                en: "Imam Malik lived in Madinah, the city of Prophet Muhammad (PBUH). He loved the Prophet so much that he wouldn't ride a horse in the city out of respect. He wrote the first big book of Hadith called 'Al-Muwatta'.",
                ar: "عاش الإمام مالك في مدينة النبي محمد (صلى الله عليه وسلم). من شدة حبه للنبي، كان لا يركب دابة في المدينة احتراماً له. كتب أول كتاب كبير في الحديث يسمى 'الموطأ'."
            },
            madrasah: {
                en: "Imam Malik ibn Anas was the Imam of 'Dar al-Hijrah' (Madinah). He relied heavily on the practice of the people of Madinah ('Amal Ahl al-Madinah') as a primary source of law, considering their actions a living transmission of the Prophet’s Sunnah.",
                ar: "الإمام مالك بن أنس كان إمام دار الهجرة (المدينة). اعتمد بشكل كبير على 'عمل أهل المدينة' كمصدر أساسي للتشريع، معتبراً أفعالهم نقلاً حياً لسنة النبي."
            },
            university: {
                en: "Author of 'Al-Muwatta', one of the earliest collections of Hadith and Fiqh. Imam Malik's jurisprudence is characterized by a strong emphasis on the customary practice of the Medinan community as a normative legal authority, distinct from the text-centric approach of other schools.",
                ar: "مؤلف 'الموطأ'، أحد أقدم مجموعات الحديث والفقه. يتميز فقه الإمام مالك بالتركيز القوي على العرف العملي لمجتمع المدينة كسلطة تشريعية معيارية، متميزاً عن النهج النصي للمذاهب الأخرى."
            }
        }
    },
    {
        id: "shafi",
        name: {
            en: "Imam Al-Shafi'i",
            ar: "الإمام الشافعي"
        },
        school: "Shafi'i",
        era: "9th Century",
        region: "Makkah / Egypt",
        bio: {
            kids: {
                en: "Imam Al-Shafi'i was a brilliant student who memorized the Quran at age seven! He traveled all over the world to learn from the best teachers. He was very good at explaining things clearly and wrote poems too.",
                ar: "كان الإمام الشافعي طالباً لامعاً حفظ القرآن في سن السابعة! سافر حول العالم ليتعلم من أفضل المعلمين. كان بارعاً في الشرح وكتب الشعر أيضاً."
            },
            madrasah: {
                en: "Imam Al-Shafi'i is often called the 'Architect of Usul al-Fiqh'. He studied under Imam Malik and the students of Abu Hanifah, bridging the gap between the school of Hadith and the school of Opinion. His famous book is 'Al-Risalah'.",
                ar: "يُلقب الإمام الشافعي بـ 'مهندس أصول الفقه'. درس على يد الإمام مالك وتلامذة أبي حنيفة، وجسر الفجوة بين مدرسة الحديث ومدرسة الرأي. كتابه الشهير هو 'الرسالة'."
            },
            university: {
                en: "Muhammad ibn Idris al-Shafi'i systematized the principles of Islamic jurisprudence in his seminal work 'Al-Risalah'. He established the hierarchy of legal sources: Quran, Sunnah, Ijma (Consensus), and Qiyas (Analogy), significantly influencing all subsequent legal thought.",
                ar: "محمد بن إدريس الشافعي قعّد أصول الفقه الإسلامي في كتابه الأساسي 'الرسالة'. وضع تسلسل المصادر الشرعية: القرآن، السنة، الإجماع، والقياس، مما أثر بشكل كبير على الفكر القانوني اللاحق."
            }
        }
    },
    {
        id: "ahmad",
        name: {
            en: "Imam Ahmad ibn Hanbal",
            ar: "الإمام أحمد بن حنبل"
        },
        school: "Hanbali",
        era: "9th Century",
        region: "Baghdad (Iraq)",
        bio: {
            kids: {
                en: "Imam Ahmad was extremely brave. He memorized thousands of sayings of the Prophet. Even when people were mean to him, he never stopped telling the truth. He is famous for collecting a huge book of Hadiths.",
                ar: "كان الإمام أحمد شجاعاً جداً. حفظ آلاف الأحاديث للنبي. حتى عندما كان الناس لؤماء معه، لم يتوقف عن قول الحقيقة. اشتهر بجمع كتاب ضخم للأحاديث."
            },
            madrasah: {
                en: "Imam Ahmad is known for the 'Musnad', a massive collection of Hadith. He is celebrated for his patience during the 'Mihnah' (Inquisition), where he championed the orthodox belief against the Mu'tazila. He prioritized Hadith text over personal opinion.",
                ar: "يُعرف الإمام أحمد بـ 'المسند'، وهي مجموعة ضخمة من الأحاديث. يُحتفى بصبره خلال 'المحنة'، حيث دافع عن المعتقد الصحيح ضد المعتزلة. غلّب نص الحديث على الرأي الشخصي."
            },
            university: {
                en: "Ahmad ibn Hanbal represents the traditionalist approach in Islamic theology and law. His resistance during the Mihnah solidified the authority of the Ulema against state-imposed dogma. His legal school is characterized by strict adherence to the Text and caution in using analogical reasoning.",
                ar: "يمثل أحمد بن حنبل النهج الأثري في العقيدة والقانون الإسلامي. مقاومته خلال المحنة رسخت سلطة العلماء ضد العقيدة التي تفرضها الدولة. يتميز مذهبه بالتمسك الصارم بالنص والحذر في استخدام القياس."
            }
        }
    }
];
