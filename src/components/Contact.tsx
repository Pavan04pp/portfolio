import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to a backend service
    alert('Message Sent! (Check console for data)');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen py-20 flex items-center justify-center"
    >
      <div className="container mx-auto px-4">
        <AnimatedText
          text="Get In Touch"
          className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-gray-300 mb-12 text-center"
        >
          Have a question or want to work together? Send me a message.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-gray-900 p-8 rounded-xl shadow-2xl space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div variants={inputVariants}>
            <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 transition-colors"
              placeholder="Your name..."
              required
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 transition-colors"
              placeholder="your.email@example.com"
              required
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 transition-colors resize-none"
              placeholder="Your message here..."
              required
            ></textarea>
          </motion.div>

          <motion.div variants={inputVariants}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:opacity-90 transition-opacity"
            >
              Send Message
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Contact; 