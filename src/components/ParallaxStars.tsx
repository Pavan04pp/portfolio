import React, { useEffect, useRef, useCallback } from 'react';

interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number; // parallax multiplier
    twinkleSpeed: number;
    twinkleOffset: number;
}

const ParallaxStars: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[][]>([]);
    const scrollRef = useRef(0);
    const animFrameRef = useRef(0);

    // Create star layers with different depths
    const createStars = useCallback((width: number, height: number) => {
        const layers = [
            { count: 300, sizeRange: [0.3, 0.8], speed: 0.02, opacityRange: [0.3, 0.6] },   // Far — tiny, slow
            { count: 200, sizeRange: [0.6, 1.2], speed: 0.05, opacityRange: [0.4, 0.7] },   // Mid — medium
            { count: 100, sizeRange: [1.0, 2.0], speed: 0.1, opacityRange: [0.5, 0.9] },    // Near — bigger, faster
            { count: 30, sizeRange: [1.5, 3.0], speed: 0.18, opacityRange: [0.6, 1.0] },   // Closest — brightest, fastest
        ];

        // Extended height for scrolling (3x the page height)
        const totalHeight = Math.max(height * 4, document.documentElement.scrollHeight * 1.5);

        return layers.map((layer) => {
            const stars: Star[] = [];
            for (let i = 0; i < layer.count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * totalHeight,
                    size: layer.sizeRange[0] + Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]),
                    opacity: layer.opacityRange[0] + Math.random() * (layer.opacityRange[1] - layer.opacityRange[0]),
                    speed: layer.speed,
                    twinkleSpeed: 0.5 + Math.random() * 2,
                    twinkleOffset: Math.random() * Math.PI * 2,
                });
            }
            return stars;
        });
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            starsRef.current = createStars(canvas.width, canvas.height);
        };

        const handleScroll = () => {
            scrollRef.current = window.scrollY;
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', handleScroll, { passive: true });

        let time = 0;

        const draw = () => {
            time += 0.016; // ~60fps
            const scroll = scrollRef.current;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            starsRef.current.forEach((layer) => {
                layer.forEach((star) => {
                    // Parallax offset based on scroll and layer speed
                    const parallaxY = star.y - scroll * star.speed;

                    // Wrap stars that go off screen
                    const wrappedY = ((parallaxY % canvas.height) + canvas.height) % canvas.height;

                    // Twinkle effect
                    const twinkle = 0.6 + 0.4 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
                    const finalOpacity = star.opacity * twinkle;

                    // Draw star with glow
                    ctx.beginPath();
                    ctx.arc(star.x, wrappedY, star.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(200, 220, 255, ${finalOpacity})`;
                    ctx.fill();

                    // Subtle glow for bigger stars
                    if (star.size > 1.2) {
                        ctx.beginPath();
                        ctx.arc(star.x, wrappedY, star.size * 3, 0, Math.PI * 2);
                        const gradient = ctx.createRadialGradient(
                            star.x, wrappedY, 0,
                            star.x, wrappedY, star.size * 3
                        );
                        gradient.addColorStop(0, `rgba(6, 182, 212, ${finalOpacity * 0.2})`);
                        gradient.addColorStop(1, 'transparent');
                        ctx.fillStyle = gradient;
                        ctx.fill();
                    }

                    // Colored tint for the closest layer stars
                    if (star.size > 2) {
                        const hue = Math.random() > 0.5 ? '139, 92, 246' : '6, 182, 212';
                        ctx.beginPath();
                        ctx.arc(star.x, wrappedY, star.size * 0.6, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${hue}, ${finalOpacity * 0.3})`;
                        ctx.fill();
                    }
                });
            });

            animFrameRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [createStars]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
};

export default ParallaxStars;
