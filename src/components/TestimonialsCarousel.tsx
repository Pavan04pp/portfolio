import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

interface Testimonial {
    name: string;
    role: string;
    company: string;
    image: string;
    text: string;
    rating: number;
}

const TestimonialsCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials: Testimonial[] = [
        {
            name: 'John Doe',
            role: 'Senior Developer',
            company: 'Tech Corp',
            image: '/profile-placeholder.png',
            text: 'Pavan is an exceptional developer with a strong grasp of modern web technologies. His dedication to clean code and problem-solving is impressive.',
            rating: 5,
        },
        {
            name: 'Jane Smith',
            role: 'Project Manager',
            company: 'Innovation Labs',
            image: '/profile-placeholder.png',
            text: 'Working with Pavan was a great experience. He delivered high-quality work on time and was always open to feedback and collaboration.',
            rating: 5,
        },
        {
            name: 'Mike Johnson',
            role: 'Tech Lead',
            company: 'StartupXYZ',
            image: '/profile-placeholder.png',
            text: 'Pavan\'s passion for AI and machine learning is evident in his work. He quickly learns new technologies and applies them effectively.',
            rating: 5,
        },
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="py-16 bg-black/20">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-center mb-12 premium-text"
                >
                    What People Say
                </motion.h2>

                <div className="max-w-4xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            className="glass-effect p-8 md:p-12 rounded-2xl backdrop-blur-sm bg-black/40 border border-gray-800/50"
                        >
                            {/* Stars */}
                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(currentTestimonial.rating)].map((_, i) => (
                                    <FaStar key={i} className="w-5 h-5 text-yellow-500" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-300 text-lg md:text-xl text-center mb-8 leading-relaxed italic">
                                "{currentTestimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center justify-center gap-4">
                                <img
                                    src={currentTestimonial.image}
                                    alt={currentTestimonial.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-red-500/30"
                                />
                                <div className="text-left">
                                    <h4 className="text-white font-bold">{currentTestimonial.name}</h4>
                                    <p className="text-gray-400 text-sm">
                                        {currentTestimonial.role} at {currentTestimonial.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevTestimonial}
                            className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-white transition-all duration-300"
                            aria-label="Previous testimonial"
                        >
                            <FaChevronLeft className="w-5 h-5" />
                        </motion.button>

                        {/* Dots indicator */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'bg-red-500 w-8'
                                            : 'bg-gray-600 hover:bg-gray-500'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextTestimonial}
                            className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-white transition-all duration-300"
                            aria-label="Next testimonial"
                        >
                            <FaChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
