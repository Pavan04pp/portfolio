/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Force dark-only theme for the whole site
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        // Always enforce dark theme
        try {
            localStorage.setItem('portfolio-theme', 'dark');
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }

        // Remove any light-theme class and add dark classes used by the stylesheet
        document.documentElement.classList.remove('theme-light');
        document.documentElement.classList.add('theme-dark');
        // Also add Tailwind's `dark` class so `dark:` utilities work
        document.documentElement.classList.add('dark');
    }, []);

    // We keep setTheme available in case some component expects it, but it won't switch
    const safeSetTheme = (t: Theme) => {
        // no-op to prevent switching away from dark
        if (t === 'dark') setTheme('dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: safeSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
