import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaSchool } from 'react-icons/fa';

const Education: React.FC = () => {
  return (
    <section id="education" className="min-h-screen pt-24 pb-12 relative overflow-hidden">
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
          Education Journey
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Current Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="relative p-8 rounded-lg bg-black/50 backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 transition-colors duration-300">
              <div className="text-red-500 mb-6 text-4xl">
                <FaGraduationCap />
              </div>
              <h3 className="text-2xl font-bold mb-4 premium-text">B.Tech in CSE</h3>
              <p className="text-gray-300 mb-2">National Institute of Engineering</p>
              <p className="text-gray-400 mb-4">Mysore</p>
              <p className="text-red-500 font-semibold">2024 - 2028</p>
              <div className="mt-4 p-2 bg-red-500/10 rounded-lg">
                <p className="text-gray-300">Specializing in</p>
                <p className="text-red-500 font-semibold">AI & Machine Learning</p>
              </div>
            </div>
          </motion.div>

          {/* 12th Grade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="relative p-8 rounded-lg bg-black/50 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300">
              <div className="text-blue-500 mb-6 text-4xl">
                <FaSchool />
              </div>
              <h3 className="text-2xl font-bold mb-4 premium-text">12th Grade</h3>
              <p className="text-gray-300 mb-2">Akshara PU College</p>
              <p className="text-gray-400 mb-4">2022 - 2024</p>
              <div className="mt-4 p-2 bg-blue-500/10 rounded-lg">
                <p className="text-gray-300">Score</p>
                <p className="text-blue-500 font-semibold text-2xl">97%</p>
              </div>
            </div>
          </motion.div>

          {/* 10th Grade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="relative p-8 rounded-lg bg-black/50 backdrop-blur-sm border border-green-500/20 hover:border-green-500/40 transition-colors duration-300">
              <div className="text-green-500 mb-6 text-4xl">
                <FaSchool />
              </div>
              <h3 className="text-2xl font-bold mb-4 premium-text">10th Grade</h3>
              <p className="text-gray-300 mb-2">Pushpa English Medium School</p>
              <p className="text-gray-400 mb-4">2021 - 2022</p>
              <div className="mt-4 p-2 bg-green-500/10 rounded-lg">
                <p className="text-gray-300">Score</p>
                <p className="text-green-500 font-semibold text-2xl">96%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education; 