import React from 'react';
import { FaWhatsapp, FaDiscord, FaInstagram, FaPaintBrush, FaTrophy, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const designServices = [
  { icon: <FaPaintBrush className="text-red-500 text-2xl" />, name: 'Gaming Poster Design', price: '₹49' },
  { icon: <FaPaintBrush className="text-red-500 text-2xl" />, name: 'Esports/Gaming Logos', price: '₹149' },
  { icon: <FaPaintBrush className="text-red-500 text-2xl" />, name: 'YouTube/Instagram Thumbnails', price: '₹49' },
  { icon: <FaPaintBrush className="text-red-500 text-2xl" />, name: 'Full Branding Kit (Logo + Banner + Poster)', price: '₹299' },
];

const esportsPacks = [
  {
    name: 'Basic Pack',
    features: 'Poster + Registration Google Form + Discord Setup',
    price: '₹299',
  },
  {
    name: 'Pro Pack',
    features: '+ Points Table + Match Day Setup + Admin Support',
    price: '₹599',
  },
  {
    name: 'Premium Pack',
    features: '+ Live Stream Overlay + Bracket System + Team Management + Full Support',
    price: '₹999–₹1499',
  },
];

const addons = [
  'Discord Automation',
  'Points Table in Google Sheets or Challonge',
  'Auto-Updating Match Results',
  'Website or App Integration',
];

const EsportsDesignServices: React.FC = () => {
  return (
    <section id="esports-design" className="min-h-screen pt-24 pb-12 bg-black/80 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8 text-center premium-text flex items-center justify-center gap-3"
        >
          <span role="img" aria-label="esports">🎮</span> Esports & Design Services
        </motion.h2>

        {/* Digital Design Packs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaPaintBrush className="text-red-500" /> Digital Design Packs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {designServices.map((service, idx) => (
              <motion.div
                key={service.name}
                className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {service.icon}
                <div className="mt-3 font-semibold text-lg text-white">{service.name}</div>
                <div className="mt-1 text-red-400 font-bold text-xl">{service.price}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Esports Tournament Packs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaTrophy className="text-yellow-400" /> Esports Tournament Packs</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-xl shadow-lg">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="py-3 px-4">Pack Name</th>
                  <th className="py-3 px-4">Features</th>
                  <th className="py-3 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {esportsPacks.map((pack, idx) => (
                  <tr key={pack.name} className="border-t border-gray-800 hover:bg-gray-800 transition-colors">
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">{pack.name}</td>
                    <td className="py-3 px-4 text-gray-300">{pack.features}</td>
                    <td className="py-3 px-4 text-red-400 font-bold">{pack.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaPlus className="text-green-400" /> Add-ons</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {addons.map((addon, idx) => (
              <li key={addon} className="bg-gray-900 rounded-xl shadow p-4 text-white flex items-center gap-2">
                <FaPlus className="text-green-400" /> {addon}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-4 mt-8"
        >
          <div className="text-xl font-semibold text-white text-center">Contact us on WhatsApp at <a href="https://wa.me/9036616886" className="text-green-400 underline">9036616886</a> to book now!</div>
          <div className="flex gap-6 mt-2">
            <a href="https://wa.me/9036616886" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-colors" aria-label="WhatsApp"><FaWhatsapp className="text-2xl" /></a>
            <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-3 shadow-lg transition-colors" aria-label="Discord"><FaDiscord className="text-2xl" /></a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 shadow-lg transition-colors" aria-label="Instagram"><FaInstagram className="text-2xl" /></a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EsportsDesignServices; 