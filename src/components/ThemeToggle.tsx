import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <div className="fixed bottom-24 right-8 z-[60]">
            <motion.button
                onClick={toggleTheme}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                style={{
                    cursor: 'pointer',
                    background: isDark
                        ? 'linear-gradient(135deg, #0D1B3E 0%, #1E3A5F 100%)'
                        : 'linear-gradient(135deg, #FFFFFF 0%, #E8EEFF 100%)',
                    border: `2px solid ${isDark ? '#4F46E5' : '#CBD5E1'}`,
                    boxShadow: isDark
                        ? '0 4px 20px rgba(79, 70, 229, 0.3), 0 2px 8px rgba(0, 0, 0, 0.3)'
                        : '0 4px 20px rgba(79, 70, 229, 0.15), 0 2px 8px rgba(0, 0, 0, 0.05)',
                }}
            >
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div
                            key="sun"
                            initial={{ rotate: -90, opacity: 0, scale: 0 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaSun className="w-6 h-6" style={{ color: '#FBBF24' }} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ rotate: 90, opacity: 0, scale: 0 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: -90, opacity: 0, scale: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaMoon className="w-6 h-6" style={{ color: '#4F46E5' }} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default ThemeToggle;
