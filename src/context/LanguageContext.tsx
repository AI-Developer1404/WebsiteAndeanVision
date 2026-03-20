import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Language } from '../data/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize language from localStorage or default to 'en'
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('preferred-language');
        if (savedLanguage === 'en' || savedLanguage === 'es') return savedLanguage;
        
        try {
            const browserLang = navigator.language.toLowerCase();
            return browserLang.startsWith('es') ? 'es' : 'en';
        } catch (e) {
            return 'en';
        }
    });

    // Persist language changes to localStorage
    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('preferred-language', lang);
    };

    const value = {
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
