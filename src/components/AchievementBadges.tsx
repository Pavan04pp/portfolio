import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaCode, FaProjectDiagram, FaTrophy, FaFire, FaLayerGroup } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

interface Achievement {
    icon: React.ReactNode;
    value: number;
    suffix: string;
    label: string;
    color: string;
}

const AchievementBadges: React.FC = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const achievements: Achievement[] = [
        { icon: <FaCode className="w-8 h-8" />, value: 500, suffix: '+', label: 'LeetCode Problems', color: 'from-yellow-500 to-orange-500' },
        { icon: <FaProjectDiagram className="w-8 h-8" />, value: 15, suffix: '+', label: 'Projects Built', color: 'from-blue-500 to-cyan-500' },
        { icon: <FaGithub className="w-8 h-8" />, value: 1200, suffix: '+', label: 'GitHub Contributions', color: 'from-purple-500 to-pink-500' },
        { icon: <FaFire className="w-8 h-8" />, value: 100, suffix: '+', label: 'Day Streak', color: 'from-red-500 to-orange-500' },
        { icon: <FaLayerGroup className="w-8 h-8" />, value: 20, suffix: '+', label: 'Tech Stack', color: 'from-green-500 to-teal-500' },
        { icon: <FaTrophy className="w-8 h-8" />, value: 3, suffix: '', label: 'Years Experience', color: 'from-yellow-400 to-yellow-600' },
    ];

    return (
        <section className="py-16" ref={ref}>
            <div className="container mx-auto px-4">
                <motion.h2 initial={{ opacity: 0, y: -20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-4xl font-bold text-center mb-12 premium-text">
                    Achievements & Stats
                </motion.h2>
                <motion.div
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                    initial="hidden" animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {achievements.map((achievement, index) => (
                        <motion.div key={index}
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                            whileHover={{ scale: 1.05, y: -5 }} className="relative group">
                            <div className={`p-6 rounded-2xl transition-all duration-300 ${isLight
                                ? 'bg-white border border-[#CBD5E1] shadow-[0_4px_24px_rgba(79,70,229,0.08)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.12)] hover:border-[#4F46E5]/20'
                                : 'glass-effect bg-black/40 border border-gray-800/50 hover:border-red-500/30'}`}>
                                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${achievement.color} mb-4`}>
                                    <div style={{ color: '#FFFFFF' }}>{achievement.icon}</div>
                                </div>
                                <div className={`text-3xl font-bold mb-2 ${isLight ? 'text-[#0D1B3E]' : 'text-white'}`}>
                                    {inView ? <CountUp end={achievement.value} duration={2} suffix={achievement.suffix} separator="," /> : <span>0</span>}
                                </div>
                                <p className={`text-sm ${isLight ? 'text-[#64748B]' : 'text-gray-400'}`}>{achievement.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AchievementBadges;
