"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Bookmark = {
    id: string; // surahId:verseId
    surahId: number;
    surahName: string;
    verseId: number;
    timestamp: number;
};

interface BookmarkContextType {
    bookmarks: Bookmark[];
    addBookmark: (b: Omit<Bookmark, 'timestamp'>) => void;
    removeBookmark: (id: string) => void;
    isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('nur_bookmarks');
        if (saved) {
            setBookmarks(JSON.parse(saved));
        }
    }, []);

    const addBookmark = (b: Omit<Bookmark, 'timestamp'>) => {
        const newBookmark = { ...b, timestamp: Date.now() };
        const updated = [...bookmarks, newBookmark];
        setBookmarks(updated);
        localStorage.setItem('nur_bookmarks', JSON.stringify(updated));
    };

    const removeBookmark = (id: string) => {
        const updated = bookmarks.filter(b => b.id !== id);
        setBookmarks(updated);
        localStorage.setItem('nur_bookmarks', JSON.stringify(updated));
    };

    const isBookmarked = (id: string) => bookmarks.some(b => b.id === id);

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
            {children}
        </BookmarkContext.Provider>
    );
}

export const useBookmarks = () => {
    const context = useContext(BookmarkContext);
    if (!context) throw new Error('useBookmarks must be used within BookmarkProvider');
    return context;
};
