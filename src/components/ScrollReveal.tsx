import React from 'react';
import { motion, Variants } from 'framer-motion';

type RevealVariant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'rotateIn' | 'slideRotate';

interface ScrollRevealProps {
    children: React.ReactNode;
    variant?: RevealVariant;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
    amount?: number;
}

const variants: Record<RevealVariant, Variants> = {
    fadeUp: {
        hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    },
    fadeDown: {
        hidden: { opacity: 0, y: -60, filter: 'blur(8px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -80, filter: 'blur(8px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
    },
    fadeRight: {
        hidden: { opacity: 0, x: 80, filter: 'blur(8px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
        visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    },
    rotateIn: {
        hidden: { opacity: 0, rotateX: 25, y: 40, scale: 0.95 },
        visible: { opacity: 1, rotateX: 0, y: 0, scale: 1 },
    },
    slideRotate: {
        hidden: { opacity: 0, rotateY: -15, x: -60, scale: 0.9 },
        visible: { opacity: 1, rotateY: 0, x: 0, scale: 1 },
    },
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 0.7,
    className = '',
    once = true,
    amount = 0.15,
}) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={variants[variant]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
