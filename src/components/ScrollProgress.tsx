import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollProgress: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;
            setScrollProgress(scrolled);
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress();
        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const circumference = 2 * Math.PI * 20;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
            className="fixed bottom-8 left-8 z-40">
            <button onClick={scrollToTop} className="relative group" aria-label="Scroll to top" style={{ cursor: 'pointer' }}>
                <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20"
                        fill="#111113"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="3" />
                    <defs>
                        <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#e2b96f" />
                            <stop offset="100%" stopColor="#c084fc" />
                        </linearGradient>
                    </defs>
                    <motion.circle cx="24" cy="24" r="20" fill="none" stroke="url(#progressGrad)" strokeWidth="3" strokeLinecap="round"
                        style={{ strokeDasharray: circumference, strokeDashoffset }} transition={{ duration: 0.1 }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <FaArrowUp className="w-5 h-5 transition-colors duration-300"
                        style={{ color: '#e2b96f' }} />
                </div>
            </button>
        </motion.div>
    );
};

export default ScrollProgress;
