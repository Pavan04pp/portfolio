import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { 
  EnvelopeIcon, 
  CodeBracketIcon, 
  CpuChipIcon, 
  ComputerDesktopIcon, 
  RocketLaunchIcon, 
  ArrowDownTrayIcon 
} from '@heroicons/react/24/solid';
import { SiPython, SiCplusplus, SiSharp } from 'react-icons/si';

const ProfileCard: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-full perspective-1000"
      initial={{ opacity: 0, rotateX: 45 }}
      animate={isInView ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: 45 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-lg transform-gpu hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg" />
      <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-red-500/30"
        >
          <img
            src="/profile.jpg"
            alt="Pavan Kumar"
            className="w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-bold mb-2 premium-text"
        >
          Pavan Kumar KM
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-400 mb-4"
        >
          Computer Science & Engineering Student
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex gap-4 mt-4"
        >
          <motion.div whileHover={{ scale: 1.2 }} className="text-red-500">
            <SiPython className="w-6 h-6" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="text-red-500">
            <SiCplusplus className="w-6 h-6" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="text-red-500">
            <SiSharp className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-effect p-6 rounded-lg backdrop-blur-sm bg-black/30 border border-gray-800/50 hover:border-red-500/30 transition-all duration-300"
    >
      <div className="text-red-500 mb-4 text-2xl">{icon}</div>
      <h3 className="text-xl font-bold mb-2 premium-text">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const TemplateModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    about: '',
    skills: '',
    email: '',
    linkedin: '',
    github: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we'll create a template based on the form data
    const template = generateTemplate(formData);
    downloadTemplate(template);
    onClose();
  };

  const generateTemplate = (data: typeof formData) => {
    // This will generate a simplified version of the portfolio
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${data.name}'s Portfolio</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-black text-white">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-bold mb-4">${data.name}</h1>
            <p class="text-xl text-gray-400 mb-8">${data.title}</p>
            
            <div class="mb-12">
              <h2 class="text-2xl font-bold mb-4">About Me</h2>
              <p class="text-gray-300">${data.about}</p>
            </div>

            <div class="mb-12">
              <h2 class="text-2xl font-bold mb-4">Skills</h2>
              <p class="text-gray-300">${data.skills}</p>
            </div>

            <div class="flex gap-4">
              <a href="mailto:${data.email}" class="text-red-500 hover:text-red-400">
                Email
              </a>
              <a href="${data.linkedin}" target="_blank" class="text-red-500 hover:text-red-400">
                LinkedIn
              </a>
              <a href="${data.github}" target="_blank" class="text-red-500 hover:text-red-400">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const downloadTemplate = (template: string) => {
    const blob = new Blob([template], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-6 premium-text">Create Your Portfolio</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">About Me</label>
            <textarea
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Skills (comma separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="e.g., Python, JavaScript, React"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">GitHub URL</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <ArrowDownTrayIcon className="w-6 h-6" />
              Download Template
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const About: React.FC = () => {
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  return (
    <section id="about" className="min-h-screen pt-24 pb-12 relative overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-effect p-8 rounded-lg backdrop-blur-sm bg-black/30 border border-gray-800/50"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Card */}
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-full max-w-sm h-[400px]">
                <ProfileCard />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-4xl font-bold mb-4 premium-text">About Me</h2>
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">
                    I'm Pavan Kumar KM, a passionate and driven Computer Science and Engineering student 
                    specializing in Artificial Intelligence and Machine Learning at NIE, Mysore (Batch: 2024–2028). 
                    My journey in tech is fueled by curiosity, problem-solving, and a desire to create real-world 
                    impact through innovative solutions.
                  </p>

                  <p className="text-gray-300 leading-relaxed">
                    I'm proficient in Python, C++, and C#, with a strong focus on Data Structures and Algorithms (DSA). 
                    I also work with HTML, CSS, and JavaScript, and I'm exploring frameworks like Django and PyTorch 
                    while gaining hands-on experience in tools like NumPy and Pandas.
                  </p>

                  <p className="text-gray-300 leading-relaxed">
                    I believe in skill-based learning over just theoretical knowledge and continuously push myself 
                    to grow through consistent practice, project development, and staying updated with industry trends. 
                    Whether it's AI, web development, or core programming, I'm always ready to dive deeper and build 
                    something meaningful.
                  </p>
                </div>
              </motion.div>

              {/* Skill Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8"
              >
                <h3 className="text-2xl font-bold mb-6 premium-text">Skills & Expertise</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SkillCard
                    icon={<CodeBracketIcon className="w-6 h-6" />}
                    title="Programming"
                    description="Python, C++, C#"
                  />
                  <SkillCard
                    icon={<CpuChipIcon className="w-6 h-6" />}
                    title="AI & ML"
                    description="PyTorch, NumPy, Pandas"
                  />
                  <SkillCard
                    icon={<ComputerDesktopIcon className="w-6 h-6" />}
                    title="Web Dev"
                    description="HTML, CSS, JavaScript, Django"
                  />
                </div>
              </motion.div>

              {/* Contact Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex gap-4"
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
                  <EnvelopeIcon className="w-6 h-6" />
                </motion.a>
              </motion.div>

              {/* Add this before the closing div */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 flex justify-center"
              >
                <motion.button
                  onClick={() => setIsTemplateModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <ArrowDownTrayIcon className="w-6 h-6" />
                  Make Your Portfolio
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />
    </section>
  );
};

export default About; 