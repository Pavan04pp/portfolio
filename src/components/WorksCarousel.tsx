import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

type Work = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
};

// We'll compute the correct API path at runtime because the site may be served
// under a base path like /portfolio/ (see vite.config.ts base).

const WorksCarousel: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        // choose API URL depending on whether the current page path includes the base
        const hasPortfolioBase = typeof window !== 'undefined' && window.location.pathname.includes('/portfolio');
        const apiUrl = hasPortfolioBase ? '/portfolio/api/works' : '/api/works';
        // try the computed apiUrl first, fall back to localhost backend if necessary
        let res;
        try {
          res = await axios.get(apiUrl);
        } catch (e) {
          // fallback to localhost backend (useful during local dev when proxy isn't used)
          res = await axios.get('http://localhost:3000/api/works');
        }
        // show newest first (treat id as timestamp)
        const sorted = res.data.sort((a: Work, b: Work) => Number(b.id) - Number(a.id));
        // normalize image URLs so they load correctly when the app is served under /portfolio/
        // In dev, Vite serves the frontend on a different origin (5173) and the backend
        // serves images on :3000; therefore use absolute backend origin when running dev.
        const isDevFrontend = typeof window !== 'undefined' && window.location.hostname === 'localhost' && (window.location.port === '5173' || window.location.port === '3000' || window.location.port === '5174');
        const backendOrigin = 'http://localhost:3000';
        const prefix = hasPortfolioBase ? '/portfolio' : '';
        const normalized = sorted.map((w: Work) => {
          let img = w.image;
          if (img && !img.startsWith('http')) {
            if (isDevFrontend) {
              // point directly to backend origin where images are served
              img = backendOrigin + img;
            } else {
              // in production, assume images are available under the same origin
              img = prefix + img;
            }
          }
          return { ...w, image: img };
        });
        setWorks(normalized);
        setIndex(0);
      } catch (err) {
        // silently fail for now
        console.error('Failed to fetch works', err);
      }
    };
    fetchWorks();
  }, []);

  useEffect(() => {
    if (!works.length) return;
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % works.length);
    }, 4000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [works]);

  if (!works.length) return null;

  return (
    <section id="edits" className="min-h-screen pt-24 pb-12 bg-black/80 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center premium-text">Edits</h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-visible rounded-xl relative" style={{ height: '28rem' }}>
            {/* overlay-style carousel: center card forward, neighbors left/right */}
            {works.map((w, i) => {
              const n = works.length;
              // compute shortest signed distance from current index to i (circular)
              let delta = i - index;
              if (delta > n / 2) delta -= n;
              if (delta < -n / 2) delta += n;
              const absDelta = Math.abs(delta);
              const translate = delta * 36; // percent horizontal offset
              const scale = absDelta === 0 ? 1 : Math.max(0.72, 1 - absDelta * 0.14);
              const z = 100 - absDelta * 10;
              const opacity = absDelta === 0 ? 1 : absDelta === 1 ? 0.55 : absDelta === 2 ? 0.28 : 0;
              const rotateY = delta * -8; // slight 3D rotation for sides

              return (
                <div
                  key={w.id}
                  onClick={() => setIndex(i)}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 cursor-pointer"
                  style={{
                    width: 'auto',
                    transform: `translateX(${translate}%) translateY(${Math.min(absDelta * 8, 20)}px) scale(${scale}) rotateY(${rotateY}deg)`,
                    zIndex: z,
                    opacity,
                    display: opacity === 0 ? 'none' : 'block',
                  }}
                >
                  <div className={`mx-auto relative inline-block rounded-xl overflow-visible shadow-2xl`} style={{ border: index === i ? '1px solid rgba(6,182,212,0.18)' : undefined }}>
                    {w.image ? (
                      // center the image and keep it at its natural width (no stretching)
                      <div className="flex items-center justify-center py-4 px-2">
                        <img src={w.image} alt={w.title} className="h-auto max-h-80 w-auto object-contain block" />
                      </div>
                    ) : (
                      <div className="w-full h-96 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-400">No image</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute left-6 bottom-6 text-left">
                      <h3 className={`text-3xl font-extrabold text-white drop-shadow-md ${index === i ? '' : 'opacity-90'}`}>{w.title}</h3>
                      <p className={`mt-2 text-gray-200 max-w-2xl ${index === i ? '' : 'opacity-80'}`}>{w.description}</p>
                      {i === 0 && <span className="inline-block mt-3 px-3 py-1 text-sm font-semibold bg-yellow-400 text-black rounded">Trending</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {works.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-3 h-3 rounded-full ${idx === index ? 'bg-cyan-500' : 'bg-gray-600'}`}
                onClick={() => setIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksCarousel;
