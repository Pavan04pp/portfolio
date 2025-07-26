import React from 'react';
import { motion } from 'framer-motion';
import WorksSlider from '../components/WorksSlider';
import { worksData } from '../data/worksData';

const WorksSection: React.FC = () => {
  return (
    <section id="works" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 premium-text">
          My Works
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A showcase of my creative projects and professional design work. 
          Each piece represents a unique challenge and solution.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <WorksSlider works={worksData} />
      </motion.div>

      {/* Statistics or Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center"
      >
        <div className="space-y-2">
          <div className="text-3xl font-bold text-red-400">50+</div>
          <div className="text-gray-400 text-sm">Projects Completed</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-red-400">25+</div>
          <div className="text-gray-400 text-sm">Happy Clients</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-red-400">3+</div>
          <div className="text-gray-400 text-sm">Years Experience</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-red-400">10+</div>
          <div className="text-gray-400 text-sm">Tools Mastered</div>
        </div>
      </motion.div>
    </section>
  );
};

export default WorksSection;