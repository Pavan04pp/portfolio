import React from 'react';
import { motion } from 'framer-motion';

interface AboutDetailedInfoProps {
  onClose: () => void;
}

const AboutDetailedInfo: React.FC<AboutDetailedInfoProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="absolute inset-0 bg-gray-900 rounded-2xl p-8 shadow-2xl flex flex-col items-center justify-center text-center overflow-y-auto custom-scrollbar"
    >
      <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">About Me</h3>
      <p className="text-lg text-gray-300 mb-6">
        I am a dedicated and curious Computer Science and Engineering undergraduate specializing in Artificial Intelligence and Machine Learning (AIML) at NIE, Mysuru (2024–2028). I'm passionate about building intelligent systems, solving real-world problems through technology, and continuously pushing the boundaries of what I can create.
      </p>

      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Current Focus</h3>
      <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-6">
        <li>Mastering C++ Data Structures and Algorithms (DSA) — currently at binary search level, improving problem-solving skills.</li>
        <li>Learning web development deeply with real-world Django projects.</li>
        <li>Understanding machine learning algorithms step-by-step — from math to implementation.</li>
      </ul>

      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Interests & Goals</h3>
      <p className="text-lg text-gray-300 mb-6">
        I enjoy working on skill-based, impactful projects and love the process of converting ideas into working solutions. My goal is to become a full-stack AI developer, combining the power of web development and machine learning to build intelligent, scalable applications.
      </p>
      <p className="text-lg text-gray-300">
        I actively participate in hackathons, ideathons, and coding events, and I believe that collaboration and continuous learning are key to growing in tech.
      </p>
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        Go Back
      </motion.button>
    </motion.div>
  );
};

export default AboutDetailedInfo; 