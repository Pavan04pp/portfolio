import React from 'react';
import { motion } from 'framer-motion';

interface SkillDetailPanelProps {
  skillName: string;
  percentage: number;
  icon: string;
  details: string[]; // Add a details array for more information
  onClose: () => void;
}

const SkillDetailPanel: React.FC<SkillDetailPanelProps> = ({
  skillName,
  percentage,
  icon,
  details,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="absolute inset-0 bg-gray-900 rounded-lg shadow-2xl p-8 flex flex-col items-center justify-center text-center overflow-y-auto custom-scrollbar"
    >
      <img src={icon} alt={skillName} className="w-20 h-20 mb-4 filter brightness-0 invert" />
      <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {skillName}
      </h3>
      <p className="text-xl text-gray-300 mb-6">Proficiency: {percentage}%</p>
      <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-8 text-left">
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        Back to Skills
      </motion.button>
    </motion.div>
  );
};

export default SkillDetailPanel; 