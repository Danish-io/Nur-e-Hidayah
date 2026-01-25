export interface Hadith {
    id: number;
    source: string;
    chapter: string;
    narrator: string;
    text: string;
    grade?: string;
}

export const hadithCollections: Record<string, Hadith[]> = {
    // Sahih al-Bukhari
    bukhari: [
        {
            id: 1,
            source: "Sahih al-Bukhari 1",
            chapter: "Revelation",
            narrator: "Umar bin Al-Khattab",
            text: "I heard Allah's Messenger (ﷺ) saying, \"The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for.\"",
            grade: "Sahih"
        },
        {
            id: 2,
            source: "Sahih al-Bukhari 2",
            chapter: "Belief",
            narrator: "Abu Huraira",
            text: "The Prophet (ﷺ) said, \"Faith (Belief) consists of more than sixty branches (i.e. parts). And Haya (self respect, modesty) is a part of faith.\"",
            grade: "Sahih"
        },
        {
            id: 3,
            source: "Sahih al-Bukhari 13",
            chapter: "Belief",
            narrator: "Anas",
            text: "The Prophet (ﷺ) said, \"None of you will have faith till he wishes for his (Muslim) brother what he likes for himself.\"",
            grade: "Sahih"
        },
        {
            id: 4,
            source: "Sahih al-Bukhari 6011",
            chapter: "Good Manners",
            narrator: "Abdullah bin Amr",
            text: "The Prophet (ﷺ) was never obscene or coercive. He used to say, \"The best amongst you are those who have the best manners and character.\"",
            grade: "Sahih"
        },
        {
            id: 5,
            source: "Sahih al-Bukhari 6412",
            chapter: "Softening the Heart",
            narrator: "Abu Huraira",
            text: "The Prophet (ﷺ) said, \"Richness is not having many possessions, but richness is being content with oneself.\"",
            grade: "Sahih"
        }
    ],
    // Sahih Muslim
    muslim: [
        {
            id: 1,
            source: "Sahih Muslim 8",
            chapter: "Faith",
            narrator: "Abdullah bin Umar",
            text: "The Messenger of Allah (ﷺ) said: \"Islam is based on five (principles): To testify that none has the right to be worshipped but Allah and Muhammad is Allah's Apostle; to offer prayers; to pay Zakat; to perform Hajj; and to observe fast during Ramadan.\"",
            grade: "Sahih"
        },
        {
            id: 2,
            source: "Sahih Muslim 2699",
            chapter: "Knowledge",
            narrator: "Abu Huraira",
            text: "The Messenger of Allah (ﷺ) said: \"He who takes a path in search of knowledge, Allah makes the path to Paradise easy for him.\"",
            grade: "Sahih"
        },
        {
            id: 3,
            source: "Sahih Muslim 2586",
            chapter: "Virtue of Good Deeds",
            narrator: "Abu Huraira",
            text: "The Messenger of Allah (ﷺ) said: \"Charity does not decrease wealth, no one forgives another except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah raises his status.\"",
            grade: "Sahih"
        }
    ],
    // Sunan Abu Dawud
    abudawud: [
        {
            id: 1,
            source: "Sunan Abu Dawud 4941",
            chapter: "General Behavior",
            narrator: "Abu Hurairah",
            text: "The Prophet (ﷺ) said: \"The believer who mixes with people and bears their annoyance with patience will have a greater reward than the believer who does not mix with people and does not bear their annoyance.\"",
            grade: "Sahih"
        },
        {
            id: 2,
            source: "Sunan Abu Dawud 4800",
            chapter: "General Behavior",
            narrator: "Abu Hurairah",
            text: "The Messenger of Allah (ﷺ) said: \"The most perfect believer in respect of faith is he who is best of them in manners.\"",
            grade: "Sahih"
        },
        {
            id: 3,
            source: "Sunan Abu Dawud 1479",
            chapter: "Witr Prayer",
            narrator: "Abu Hurairah",
            text: "The Messenger of Allah (ﷺ) said: \"The most excellent prayer after that which is obligatory is the night prayer (Tahajjud).\"",
            grade: "Sahih"
        }
    ],
    // Jami' At-Tirmidhi
    tirmidhi: [
        {
            id: 1,
            source: "Jami' at-Tirmidhi 1987",
            chapter: "Righteousness",
            narrator: "Abdullah bin Mas'ud",
            text: "The Messenger of Allah (ﷺ) said: \"Truth leads to piety and piety leads to Paradise. A man persists in speaking the truth till he is enrolled with Allah as a truthful.\"",
            grade: "Sahih"
        },
        {
            id: 2,
            source: "Jami' at-Tirmidhi 1956",
            chapter: "Righteousness",
            narrator: "Abu Dharr",
            text: "The Messenger of Allah (ﷺ) said to me: \"Fear Allah wherever you are, do good deeds after doing bad ones, the former will wipe out the latter, and behave decently towards people.\"",
            grade: "Hasan"
        },
        {
            id: 3,
            source: "Jami' at-Tirmidhi 1954",
            chapter: "Righteousness",
            narrator: "Abu Dharr",
            text: "The Messenger of Allah (ﷺ) said: \"Your smiling in the face of your brother is charity, commanding good and forbidding evil is charity, your giving directions to a man lost in the land is charity for you.\"",
            grade: "Sahih"
        }
    ],
    // Sunan An-Nasa'i
    nasai: [
        {
            id: 1,
            source: "Sunan an-Nasa'i 5028",
            chapter: "Faith",
            narrator: "Anas bin Malik",
            text: "The Messenger of Allah (ﷺ) said: \"None of you believes until I am dearer to him than his family, his wealth and all the people.\"",
            grade: "Sahih"
        },
        {
            id: 2,
            source: "Sunan an-Nasa'i 4165",
            chapter: "Sales",
            narrator: "Abu Huraira",
            text: "The Messenger of Allah (ﷺ) forbade selling by throwing stones (hazard) and uncertainty (Gharar).\"",
            grade: "Sahih"
        },
        {
            id: 3,
            source: "Sunan an-Nasa'i 3104",
            chapter: "Jihad",
            narrator: "Mu'awiyah",
            text: "I went to the Messenger of Allah (ﷺ) and said: 'I intended to join the expedition and I seek your counsel.' He said: 'Do you have a mother?' I said: 'Yes.' He said: 'Then stay with her, for Paradise is beneath her feet.'\"",
            grade: "Hasan Sahih"
        }
    ],
    // Sunan Ibn Majah
    ibnmajah: [
        {
            id: 1,
            source: "Sunan Ibn Majah 224",
            chapter: "The Book of the Sunnah",
            narrator: "Anas bin Malik",
            text: "The Messenger of Allah (ﷺ) said: \"Seeking knowledge is a duty upon every Muslim.\"",
            grade: "Hasan"
        },
        {
            id: 2,
            source: "Sunan Ibn Majah 4250",
            chapter: "Asceticism",
            narrator: "Sahl bin Sa'd",
            text: "A man came to the Prophet (ﷺ) and said: 'O Messenger of Allah, direct me to a deed which, if I do it, Allah will love me and the people will love me.' He said: 'Renounce the world and Allah will love you, and renounce what the people possess and the people will love you.'\"",
            grade: "Sahih"
        },
        {
            id: 3,
            source: "Sunan Ibn Majah 4119",
            chapter: "Tribulations",
            narrator: "Abu Huraira",
            text: "The Messenger of Allah (ﷺ) said: \"Worship during the time of tribulations/confusion is like emigrating to me.\"",
            grade: "Sahih"
        }
    ]
};
