import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
];

interface Particle {
    id: number;
    x: number;
    y: number;
    emoji: string;
    size: number;
    duration: number;
    delay: number;
}

const KonamiEasterEgg: React.FC = () => {
    const [activated, setActivated] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [inputIndex, setInputIndex] = useState(0);

    const triggerEasterEgg = useCallback(() => {
        setActivated(true);

        // Generate explosion particles
        const emojis = ['🚀', '⭐', '🌟', '💫', '✨', '🛸', '🪐', '☄️', '🌌', '👾', '🎮', '🏆'];
        const newParticles: Particle[] = [];

        for (let i = 0; i < 60; i++) {
            newParticles.push({
                id: i,
                x: 50 + (Math.random() - 0.5) * 80, // percent
                y: 50 + (Math.random() - 0.5) * 80,
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                size: 16 + Math.random() * 32,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 0.8,
            });
        }

        setParticles(newParticles);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            setActivated(false);
            setParticles([]);
        }, 5500);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const expected = KONAMI_CODE[inputIndex];

            if (e.key === expected || e.key.toLowerCase() === expected) {
                const nextIndex = inputIndex + 1;

                if (nextIndex === KONAMI_CODE.length) {
                    // Konami code complete!
                    setInputIndex(0);
                    triggerEasterEgg();
                } else {
                    setInputIndex(nextIndex);
                }
            } else {
                // Reset on wrong key
                setInputIndex(e.key === KONAMI_CODE[0] ? 1 : 0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputIndex, triggerEasterEgg]);

    return (
        <AnimatePresence>
            {activated && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
                >
                    {/* Dark overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black"
                    />

                    {/* Center message */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="relative z-10 text-center"
                    >
                        <motion.div
                            animate={{
                                textShadow: [
                                    '0 0 20px rgba(6,182,212,0.5)',
                                    '0 0 60px rgba(139,92,246,0.8)',
                                    '0 0 20px rgba(6,182,212,0.5)',
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl md:text-8xl font-black mb-4"
                            style={{
                                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899, #f59e0b)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            🎮 ACHIEVEMENT UNLOCKED!
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-2xl text-cyan-400 font-semibold"
                        >
                            You found the secret Konami code! 🕹️
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-lg text-gray-400 mt-2"
                        >
                            ↑ ↑ ↓ ↓ ← → ← → B A
                        </motion.p>
                    </motion.div>

                    {/* Emoji explosion */}
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            className="absolute"
                            style={{
                                left: '50%',
                                top: '50%',
                                fontSize: p.size,
                            }}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                            animate={{
                                x: (p.x - 50) * window.innerWidth / 100,
                                y: (p.y - 50) * window.innerHeight / 100,
                                scale: [0, 1.5, 1, 0],
                                opacity: [0, 1, 1, 0],
                                rotate: Math.random() * 720 - 360,
                            }}
                            transition={{
                                duration: p.duration,
                                delay: p.delay,
                                ease: 'easeOut',
                            }}
                        >
                            {p.emoji}
                        </motion.div>
                    ))}

                    {/* Screen flash */}
                    <motion.div
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-cyan-500"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default KonamiEasterEgg;
