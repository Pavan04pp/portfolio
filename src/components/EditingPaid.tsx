import React from 'react';
import { motion } from 'framer-motion';
import { FaImages } from 'react-icons/fa';

// Instructions for users:
// 1. Upload your images to the public/editing_paid/ directory
// 2. Add the filename (with extension) to the photoList array below
// 3. The images will automatically appear in the gallery
const photoList: string[] = [
  // Example: 'image1.jpg', 'image2.png', 'image3.webp'
  // Add your image filenames here
];

const EditingPaid: React.FC = () => {
  return (
    <section id="editing-paid" className="min-h-screen pt-24 pb-12 bg-black/80 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8 text-center premium-text flex items-center justify-center gap-3"
        >
          <FaImages className="text-red-500" /> Editing _Paid
        </motion.h2>

        {photoList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <FaImages className="text-6xl text-gray-500 mx-auto mb-4" />
            <p className="text-xl text-gray-400 mb-2">No images available yet</p>
            <p className="text-sm text-gray-500">
              Upload images to public/editing_paid/ and add filenames to the photoList array
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {photoList.map((filename, index) => (
              <motion.div
                key={filename}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`/editing_paid/${filename}`}
                    alt={`Editing work ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EditingPaid;