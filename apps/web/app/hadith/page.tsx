import { Book, Info } from "lucide-react";
import Link from "next/link";

const hadithBooks = [
    {
        title: "Sahih al-Bukhari",
        description: "Considered the most authentic collection.",
        slug: "bukhari",
        color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
    },
    {
        title: "Sahih Muslim",
        description: "Also highly authentic and widely respected.",
        slug: "muslim",
        color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
        title: "Sunan Abu Dawud",
        description: "Focuses on practical rulings.",
        slug: "abudawud",
        color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
    },
    {
        title: "Jami' al-Tirmidhi",
        description: "Known for its classifications and commentary.",
        slug: "tirmidhi",
        color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
    },
    {
        title: "Sunan al-Nasa'i",
        description: "Emphasizes legal rulings and practices.",
        slug: "nasai",
        color: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
    },
    {
        title: "Sunan Ibn Majah",
        description: "Completes the six canonical works.",
        slug: "ibnmajah",
        color: "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400"
    }
];

export default function Hadith() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Book className="w-8 h-8 text-emerald-600" />
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Al-Kutub Al-Sittah</h1>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    The six major Hadith collections (Al-Sihah Al-Sittah) considered most authentic in Sunni Islam.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hadithBooks.map((book) => (
                    <Link
                        key={book.slug}
                        href={`/hadith/${book.slug}`}
                        className="group flex flex-col p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-emerald-500/50 hover:shadow-lg dark:hover:bg-zinc-800/50 transition-all duration-300"
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${book.color} transition-colors`}>
                            <Book className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {book.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {book.description}
                        </p>
                        <div className="mt-auto pt-4 flex items-center text-sm font-medium text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            <span>Read Collection</span>
                            <Info className="w-4 h-4 ml-2" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
