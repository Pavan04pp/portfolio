import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';


interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  link,
}) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.03, y: -6 }}
        className="relative w-full max-w-sm bg-zinc-950/65 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/5 hover:border-[#e2b96f]/40 hover:shadow-[0_20px_50px_rgba(226,185,111,0.06),0_0_30px_rgba(192,132,252,0.04)] transition-all duration-300"
      >
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e2b96f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <h3 className="text-xl font-bold mb-2 premium-text">{title}</h3>
      <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-[#e2b96f]/5 text-[#e2b96f] rounded-full text-xs border border-[#e2b96f]/20 hover:bg-[#e2b96f]/10 transition-colors duration-300 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="inline-block bg-gradient-to-r from-[#e2b96f] to-[#fb7185] text-zinc-950 font-bold px-6 py-2 rounded-full hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 text-sm cursor-pointer"
        >
          View Project
        </button>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-500 hover:text-white transition-colors underline ml-2"
        >
          Source
        </a>
      </div>
    </motion.div>
 
       {/* Modal */}
       {open && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-50 flex items-center justify-center"
         >
           <div
             className="absolute inset-0 bg-black/80 backdrop-blur-sm"
             onClick={() => setOpen(false)}
           />
 
           <motion.div
             initial={{ y: 20, scale: 0.98 }}
             animate={{ y: 0, scale: 1 }}
             transition={{ type: 'spring', stiffness: 300, damping: 28 }}
             className="relative z-10 w-[min(900px,95%)] max-h-[90vh] overflow-auto bg-zinc-950/90 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/10"
             role="dialog"
             aria-modal="true"
             aria-label={`${title} details`}
           >
             <button
               onClick={() => setOpen(false)}
               className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer"
               aria-label="Close dialog"
             >
               ✕
             </button>
 
             <div className="flex flex-col md:flex-row gap-6">
               <div className="flex-shrink-0 md:w-1/2">
                 <div className="rounded-lg overflow-hidden bg-black/10">
                   <img src={image} alt={title} className="w-full h-auto object-contain" />
                 </div>
               </div>
 
               <div className="md:flex-1">
                 <h3 className="text-2xl font-bold mb-3 premium-text">{title}</h3>
                 <p className="text-zinc-300 text-sm mb-4 leading-relaxed">{description}</p>
 
                 <div className="flex flex-wrap gap-2 mb-6">
                   {technologies.map((tech, i) => (
                     <span key={i} className="px-3 py-1 bg-[#e2b96f]/5 text-[#e2b96f] rounded-full text-xs border border-[#e2b96f]/20 font-mono">
                       {tech}
                     </span>
                   ))}
                 </div>
 
                 <div className="flex gap-3">
                   <a
                     href={link}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-block bg-gradient-to-r from-[#e2b96f] to-[#fb7185] text-zinc-950 font-bold px-6 py-2 rounded-full hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 text-sm"
                   >
                     View Code
                   </a>
 
                   <button
                     disabled
                     title="Live demo coming soon"
                     className="inline-block bg-transparent border border-zinc-800 text-zinc-500 px-6 py-2 rounded-full cursor-not-allowed transition-all duration-300 text-sm"
                   >
                     Live Demo — Coming Soon
                   </button>
                 </div>
               </div>
             </div>
           </motion.div>
         </motion.div>
       )}
    </>
  );
};

export default ProjectCard; 