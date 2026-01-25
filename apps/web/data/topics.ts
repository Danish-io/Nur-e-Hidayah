export interface Topic {
    id: string;
    title: string;
    description: string;
    count: number;
    verses: number[]; // Store verse IDs or references
}

export const topicsData: Topic[] = [
    { id: "mercy", title: "Mercy (Rahmah)", description: "Verses regarding Allah's infinite mercy and compassion.", count: 124, verses: [1, 3] },
    { id: "patience", title: "Patience (Sabr)", description: "Guidance on remaining patient during hardships.", count: 85, verses: [2] },
    { id: "prayer", title: "Prayer (Salah)", description: "The importance and method of establishing prayer.", count: 90, verses: [4] },
    { id: "charity", title: "Charity (Sadaqah)", description: "The virtues of giving and helping the needy.", count: 45, verses: [] },
    { id: "justice", title: "Justice (Adl)", description: "Standing firm for justice and fairness.", count: 32, verses: [] },
    { id: "forgiveness", title: "Forgiveness (Maghfirah)", description: "Seeking forgiveness from Allah.", count: 67, verses: [] },
];
