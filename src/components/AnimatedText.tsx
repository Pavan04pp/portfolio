import React from 'react';
import { motion } from 'framer-motion';
import { Text3D, Center, useMatcapTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

interface AnimatedTextProps {
  text: string;
  className?: string;
  is3D?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', is3D = false }) => {
  if (is3D) {
    return (
      <div className={`h-32 ${className}`}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Center>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.5}
              height={0.2}
              curveSegments={12}
            >
              {text}
              <meshMatcapMaterial color="#3b82f6" />
            </Text3D>
          </Center>
        </Canvas>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText; 