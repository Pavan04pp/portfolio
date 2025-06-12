import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaTerminal, FaMicrochip } from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.2),transparent_50%)]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center premium-text"
        >
          My Coding Journey
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Milestone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="relative p-8 rounded-lg bg-black/50 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300">
              <div className="text-blue-500 mb-6 text-4xl">
                <FaCode className="w-8 h-8 text-blue-500 mb-4" />
              </div>
              <h3 className="text-2xl font-bold mb-4 premium-text">Beginning of Coding</h3>
              <p className="text-gray-300 mb-4">
                My coding journey began during my 12th grade, where I first discovered my passion for programming. 
                I started with C++, learning the fundamentals of programming and problem-solving.
              </p>
              <div className="mt-4 p-2 bg-blue-500/10 rounded-lg">
                <p className="text-gray-300">Key Achievement</p>
                <p className="text-blue-500 font-semibold">Mastered C++ Fundamentals</p>
              </div>
            </div>
          </motion.div>

          {/* Second Milestone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="relative p-8 rounded-lg bg-black/50 backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 transition-colors duration-300">
              <div className="text-red-500 mb-6 text-4xl">
                <FaMicrochip className="w-8 h-8 text-red-500 mb-4" />
              </div>
              <h3 className="text-2xl font-bold mb-4 premium-text">AI & ML Discovery</h3>
              <p className="text-gray-300 mb-4">
                As I progressed, I discovered Python and was immediately drawn to its potential in 
                Artificial Intelligence and Machine Learning. This sparked my interest in AI/ML, 
                leading me to start my journey in this exciting field.
              </p>
              <div className="mt-4 p-2 bg-red-500/10 rounded-lg">
                <p className="text-gray-300">Current Focus</p>
                <p className="text-red-500 font-semibold">AI & Machine Learning</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-lg bg-black/30 border border-gray-800/50 hover:border-blue-500/30 transition-colors duration-300">
            <SiCplusplus className="w-8 h-8 text-blue-500 mb-4" />
            <h4 className="text-xl font-bold mb-2 premium-text">C++</h4>
            <p className="text-gray-400">Strong foundation in programming concepts</p>
          </div>
          <div className="p-6 rounded-lg bg-black/30 border border-gray-800/50 hover:border-green-500/30 transition-colors duration-300">
            <FaTerminal className="w-8 h-8 text-green-500 mb-4" />
            <h4 className="text-xl font-bold mb-2 premium-text">Python</h4>
            <p className="text-gray-400">AI/ML development and data science</p>
          </div>
          <div className="p-6 rounded-lg bg-black/30 border border-gray-800/50 hover:border-purple-500/30 transition-colors duration-300">
            <FaMicrochip className="w-8 h-8 text-purple-500 mb-4" />
            <h4 className="text-xl font-bold mb-2 premium-text">AI/ML</h4>
            <p className="text-gray-400">Exploring machine learning algorithms</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 