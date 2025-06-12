import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaLink } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black opacity-50" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold mb-2 premium-text">Pavan Kumar KM</h2>
            <p className="text-gray-400">Full Stack Developer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-4 mb-6"
          >
            <motion.a
              href="https://www.linkedin.com/in/pavankumarkm/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors"
            >
              <FaLinkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="mailto:pavankumarkm@gmail.com"
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors"
            >
              <FaEnvelope className="w-6 h-6" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 text-sm"
          >
            © {new Date().getFullYear()} Pavan Kumar KM. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 