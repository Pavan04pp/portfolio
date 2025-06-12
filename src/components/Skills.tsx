import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaCode,
  FaTerminal,
  FaMicrochip,
  FaCodeBranch,
  FaFileAlt,
  FaPalette,
  FaServer,
  FaDatabase,
  FaTable,
  FaChartBar
} from 'react-icons/fa';

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 90, icon: FaTerminal },
      { name: "C++", level: 85, icon: FaCode },
      { name: "C#", level: 80, icon: FaMicrochip },
      { name: "JavaScript", level: 85, icon: FaCodeBranch },
    ]
  },
  {
    title: "Web Development",
    skills: [
      { name: "HTML", level: 90, icon: FaFileAlt },
      { name: "CSS", level: 85, icon: FaPalette },
      { name: "Django", level: 75, icon: FaServer },
    ]
  },
  {
    title: "AI & ML Tools",
    skills: [
      { name: "PyTorch", level: 70, icon: FaDatabase },
      { name: "NumPy", level: 80, icon: FaTable },
      { name: "Pandas", level: 75, icon: FaChartBar },
    ]
  }
];

interface CircularProgressProps {
  percentage: number;
  Icon: React.ComponentType<{ className?: string }>;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, Icon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div ref={ref} className="relative w-24 h-28 group flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#374151"
            strokeWidth="8"
            className="opacity-30"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ 
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.2
            }}
            className="group-hover:filter group-hover:blur-[2px] transition-all duration-300"
            style={{
              filter: "drop-shadow(0 0 8px #ef4444)",
            }}
          />
          {/* Glow effect */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#glow)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference, opacity: 0 }}
            animate={isInView ? { strokeDashoffset, opacity: 0.3 } : { strokeDashoffset: circumference, opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.2
            }}
            className="blur-sm"
          />
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Icon className="w-8 h-8 text-white group-hover:text-red-500 transition-colors duration-300" />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mt-2"
      >
        <span className="text-sm font-mono text-gray-400 group-hover:text-white transition-colors duration-300">
          {percentage}%
        </span>
      </motion.div>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center premium-text">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect p-6 rounded-lg backdrop-blur-sm bg-black/30 border border-gray-800/50 hover:border-red-500/30 transition-colors duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-center premium-text">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CircularProgress percentage={skill.level} Icon={skill.icon} />
                    <span className="mt-2 text-sm font-mono text-center group-hover:text-white transition-colors duration-200">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 