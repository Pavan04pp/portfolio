import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { Work } from '../data/worksData';

interface WorksSliderProps {
  works: Work[];
}

const WorksSlider: React.FC<WorksSliderProps> = ({ works }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % works.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + works.length) % works.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentWork = works[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Slider Container */}
      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50">
        <AnimatePresence mode="wait" custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                nextSlide();
              } else if (swipe > swipeConfidenceThreshold) {
                prevSlide();
              }
            }}
            className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8"
          >
            {/* Image Section */}
            <div className="relative group">
              <div className="relative h-full min-h-64 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                {/* Placeholder Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-red-600/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-red-400/30 mb-2">
                      {currentWork.id}
                    </div>
                    <div className="text-red-300/50 text-sm">
                      {currentWork.category}
                    </div>
                  </div>
                </div>
                
                {/* Actual Image (when available) */}
                <img
                  src={currentWork.image}
                  alt={currentWork.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Hide the image if it fails to load, showing the placeholder instead
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-600/90 text-white text-sm rounded-full backdrop-blur-sm">
                    {currentWork.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-red-400 mb-2"
                >
                  {currentWork.date}
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold mb-4 premium-text"
                >
                  {currentWork.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 text-lg leading-relaxed mb-6"
                >
                  {currentWork.description}
                </motion.p>
              </div>

              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="text-sm font-semibold text-white mb-3">Tools Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentWork.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors duration-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* View Project Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300"
                >
                  View Details
                  <FiExternalLink className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-red-500/50 group"
        >
          <FiChevronLeft className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-red-500/50 group"
        >
          <FiChevronRight className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {works.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-red-500 w-8'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-800 rounded-full h-1">
        <motion.div
          className="bg-gradient-to-r from-red-500 to-red-600 h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / works.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default WorksSlider;