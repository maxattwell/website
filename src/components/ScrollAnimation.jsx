import { useEffect, useRef } from 'react';

export default function ScrollAnimation() {
  const heroRef = useRef(null);
  const subHeroRef = useRef(null);
  const svgRef = useRef(null);

  // Configuration constants that match your original logic
  const SCROLL_CONFIG = {
    scale: {
      start: 90,
      range: 110,
      stopAtProgress: 0.8  // Stops scaling at 80% scroll
    },
    opacity: {
      svg: {
        multiplier: 4,  // Reaches full opacity at 25% scroll
        maxProgress: 1
      },
      hero: {
        maxProgress: 1  // Fades in linearly over entire scroll
      },
      subHero: {
        startProgress: 0.8,  // Starts fading at 80% scroll
        multiplier: 10
      }
    }
  };

  useEffect(() => {
    function onScroll() {
      if (!heroRef.current || !subHeroRef.current || !svgRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll progress (same as original)
      const maxScroll = documentHeight - windowHeight;
      const scrollProgress = Math.min(scrollY / maxScroll, 1);

      // Text zoom effect - exact same logic as original
      const scale = SCROLL_CONFIG.scale.start - (
        Math.min(scrollProgress, SCROLL_CONFIG.scale.stopAtProgress) * SCROLL_CONFIG.scale.range
      );

      // Opacity calculations - exact same as original
      const svgOpacity = Math.min(scrollProgress * SCROLL_CONFIG.opacity.svg.multiplier, 1);
      const heroOpacity = Math.min(scrollProgress, 1);
      const subHeroOpacity = Math.max(0, (scrollProgress - SCROLL_CONFIG.opacity.subHero.startProgress) * SCROLL_CONFIG.opacity.subHero.multiplier);

      // Apply transformations - same as original
      svgRef.current.style.transform = `scale(${scale})`;
      svgRef.current.style.opacity = svgOpacity;
      heroRef.current.style.opacity = heroOpacity;
      subHeroRef.current.style.opacity = subHeroOpacity;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="scroll-container">
      <section className="hero-section">
        {/* Static background image first */}
        <div className="background-image"></div>
        <div ref={heroRef} className="hero-text-color"></div>

        {/* Foreground that covers the image except where the text is */}
        <div className="foreground-layer">
          <svg
            ref={svgRef}
            className="text-mask-svg"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <mask id="textMask">
                <rect width="100%" height="100%" fill="white" />
                <text
                  x="46"
                  y="50"
                  fill="black"
                  fontSize="8"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  Max
                </text>
                <text
                  ref={subHeroRef}
                  x="48.8"
                  y="58"
                  fill="black"
                  fontSize="8"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  Attwell
                </text>
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="#282828"
              mask="url(#textMask)"
            />
          </svg>
        </div>
      </section>

      <section className="content-section">
        <div className="scrolling-content">
          <h2>Content Below</h2>
          <p>This content appears after the effect completes</p>
          {Array(10).fill().map((_, i) => (
            <p key={i}>Continue scrolling...</p>
          ))}
        </div>
      </section>
    </div>
  );
}
