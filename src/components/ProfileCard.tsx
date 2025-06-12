import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const ProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const variants = {
    hidden: { opacity: 0, rotateY: -90, scale: 0.8 },
    visible: { opacity: 1, rotateY: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, rotateY: 90, scale: 0.8, transition: { duration: 0.5, ease: "easeIn" } },
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full max-w-2xl min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl flex items-center justify-center cursor-pointer overflow-hidden transform-gpu"
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="brief-info"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center w-full h-full flex flex-col items-center justify-center backface-hidden absolute inset-0"
          >
            <img
              src="/profile-placeholder.png"
              alt="Pawan Kumar K M Profile"
              className="w-32 h-32 rounded-full mb-6 object-cover border-4 border-blue-500 shadow-lg"
            />
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Pawan Kumar K M
            </h2>
            <p className="text-xl text-gray-300">AI/ML Specialist & Full Stack Developer</p>
            <p className="text-md text-gray-400 mt-4">(Hover for detailed info)</p>
          </motion.div>
        ) : (
          <motion.div
            key="full-info"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-left w-full h-full overflow-y-auto custom-scrollbar p-4 backface-hidden absolute inset-0"
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">About Me</h3>
            <p className="text-gray-300 mb-4">
              I am a dedicated and curious Computer Science and Engineering undergraduate specializing in Artificial Intelligence and Machine Learning (AIML). I'm passionate about building intelligent systems and solving real-world problems through technology.
            </p>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Current Focus</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Mastering C++ Data Structures and Algorithms (DSA).</li>
              <li>Learning web development deeply with real-world Django projects.</li>
              <li>Understanding machine learning algorithms step-by-step.</li>
            </ul>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Interests & Goals</h3>
            <p className="text-gray-300">
              I enjoy working on skill-based, impactful projects and love converting ideas into working solutions. My goal is to become a full-stack AI developer, combining web development and machine learning to build intelligent, scalable applications.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfileCard; 