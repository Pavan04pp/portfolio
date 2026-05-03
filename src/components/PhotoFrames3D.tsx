import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

interface FrameProps {
    imageSrc: string;
    title: string;
    subtitle: string;
    delay?: number;
}

const Photo3DFrame: React.FC<FrameProps> = ({ imageSrc, title, subtitle, delay = 0 }) => {
    const frameRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glareX, setGlareX] = useState(50);
    const [glareY, setGlareY] = useState(50);
    const [isHovered, setIsHovered] = useState(false);
    const isInView = useInView(frameRef, { once: false, amount: 0.3 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!frameRef.current) return;
        const rect = frameRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotX = ((y - centerY) / centerY) * -15;
        const rotY = ((x - centerX) / centerX) * 15;

        setRotateX(rotX);
        setRotateY(rotY);
        setGlareX((x / rect.width) * 100);
        setGlareY((y / rect.height) * 100);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setRotateX(0);
        setRotateY(0);
        setGlareX(50);
        setGlareY(50);
        setIsHovered(false);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    return (
        <motion.div
            ref={frameRef}
            initial={{ opacity: 0, y: 60, rotateX: 25 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: 25 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
            }}
            className="relative cursor-pointer group"
        >
            {/* The 3D tilting card */}
            <div
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.05 : 1})`,
                    transformStyle: 'preserve-3d',
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                }}
                className="relative rounded-2xl overflow-hidden"
            >
                {/* Outer glow on hover */}
                <div
                    style={{
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        boxShadow: '0 0 40px rgba(6, 182, 212, 0.3), 0 0 80px rgba(139, 92, 246, 0.2)',
                    }}
                    className="absolute -inset-1 rounded-2xl z-0"
                />

                {/* Animated border gradient */}
                <div
                    className="absolute -inset-[2px] rounded-2xl z-10"
                    style={{
                        background: isHovered
                            ? 'linear-gradient(135deg, #06b6d4, #8b5cf6, #6366f1, #06b6d4)'
                            : 'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(139,92,246,0.3), rgba(99,102,241,0.3))',
                        backgroundSize: '300% 300%',
                        animation: isHovered ? 'borderGlow 3s ease infinite' : 'none',
                        transition: 'background 0.3s ease',
                    }}
                />

                {/* Card inner */}
                <div className="relative z-20 m-[2px] rounded-2xl overflow-hidden bg-gray-950">
                    {/* Image container */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-full h-full object-cover"
                            style={{
                                transform: `scale(${isHovered ? 1.1 : 1})`,
                                transition: 'transform 0.5s ease-out',
                            }}
                        />

                        {/* Reflection/glare effect */}
                        <div
                            className="absolute inset-0 pointer-events-none z-30"
                            style={{
                                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${isHovered ? 0.15 : 0}) 0%, transparent 60%)`,
                                transition: isHovered ? 'none' : 'background 0.5s ease',
                            }}
                        />

                        {/* Bottom gradient overlay */}
                        <div
                            className="absolute inset-0 z-20"
                            style={{
                                background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)`,
                            }}
                        />

                        {/* Floating particles effect on hover */}
                        {isHovered && (
                            <>
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
                                        initial={{
                                            x: Math.random() * 280,
                                            y: 350,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            y: [350, Math.random() * 100],
                                            opacity: [0, 1, 0],
                                            scale: [0, 1.5, 0],
                                        }}
                                        transition={{
                                            duration: 2 + Math.random() * 1.5,
                                            repeat: Infinity,
                                            delay: Math.random() * 1,
                                            ease: 'easeOut',
                                        }}
                                        style={{ left: `${10 + Math.random() * 80}%` }}
                                    />
                                ))}
                            </>
                        )}
                    </div>

                    {/* Info section with 3D depth */}
                    <div
                        className="relative z-30 px-6 py-5 -mt-16"
                        style={{
                            transform: `translateZ(${isHovered ? '30px' : '0px'})`,
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        <motion.h3
                            className="text-xl font-bold text-white mb-1"
                            style={{
                                textShadow: isHovered ? '0 0 20px rgba(6,182,212,0.5)' : 'none',
                                transition: 'text-shadow 0.3s ease',
                            }}
                        >
                            {title}
                        </motion.h3>
                        <p
                            className="text-sm font-medium"
                            style={{
                                color: isHovered ? '#06b6d4' : '#9ca3af',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const PhotoFrames3D: React.FC = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full max-w-2xl mx-auto">
            <div className="w-64">
                <Photo3DFrame
                    imageSrc={`${import.meta.env.BASE_URL}profile.jpg`}
                    title="Pavan Kumar K M"
                    subtitle="Developer & Creator"
                    delay={0}
                />
            </div>
            <div className="w-64">
                <Photo3DFrame
                    imageSrc={`${import.meta.env.BASE_URL}profile-placeholder.png`}
                    title="Pavan Kumar K M"
                    subtitle="AI & ML Enthusiast"
                    delay={0.2}
                />
            </div>

            {/* Inject the keyframes animation */}
            <style>{`
        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </div>
    );
};

export default PhotoFrames3D;
