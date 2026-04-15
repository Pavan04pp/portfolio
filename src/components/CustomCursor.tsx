import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: -100, y: -100 });
    const ring = useRef({ x: -100, y: -100 });
    const animId = useRef<number>(0);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px`;
            }
        };

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
            ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);
            if (ringRef.current) {
                ringRef.current.style.left = `${ring.current.x}px`;
                ringRef.current.style.top = `${ring.current.y}px`;
            }
            animId.current = requestAnimationFrame(animate);
        };

        const onEnter = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            if (t.closest('a, button, [role="button"], input, textarea')) setHovered(true);
        };
        const onLeave = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            if (t.closest('a, button, [role="button"], input, textarea')) setHovered(false);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseover', onEnter);
        window.addEventListener('mouseout', onLeave);
        animId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onEnter);
            window.removeEventListener('mouseout', onLeave);
            cancelAnimationFrame(animId.current);
        };
    }, []);

    const scale = hovered ? 2.2 : 1;

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    width: 5, height: 5,
                    borderRadius: '50%',
                    background: '#e2b96f',
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transition: 'transform 0.2s ease',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    top: 0, left: 0,
                    mixBlendMode: 'difference',
                }}
            />
            {/* Ring */}
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    width: 32, height: 32,
                    borderRadius: '50%',
                    border: `1px solid rgba(226,185,111,${hovered ? 0.6 : 0.25})`,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    pointerEvents: 'none',
                    zIndex: 99998,
                    top: 0, left: 0,
                }}
            />
        </>
    );
};

export default CustomCursor;
