import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

const MouseTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setParticles((prevParticles) => {
        const newParticle: Particle = {
          id: nextId,
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          size: Math.random() * 8 + 5, // Increased size between 5 and 13
        };
        setNextId((prevId) => prevId + 1);

        // Remove old particles to prevent performance issues
        const updatedParticles = [...prevParticles, newParticle].slice(-50); // Keep last 50 particles
        return updatedParticles;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop for particles
    const animationFrame = requestAnimationFrame(function animateParticles() {
      setParticles((prevParticles) =>
        prevParticles
          .map((p) => ({
            ...p,
            opacity: p.opacity - 0.02, // Fade out
            size: p.size * 0.98, // Shrink
          }))
          .filter((p) => p.opacity > 0 && p.size > 0.5) // Remove invisible/tiny particles
      );
      requestAnimationFrame(animateParticles);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [nextId]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-red-500" // Changed to red color
          initial={{ opacity: p.opacity, scale: p.size / 10, x: p.x, y: p.y }}
          animate={{ opacity: p.opacity, scale: p.size / 10, x: p.x, y: p.y }}
          transition={{ duration: 0.05, ease: 'easeOut' }}
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)' // Increased glow effect with red color
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrail; 