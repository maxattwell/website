import { useEffect, useRef } from 'react';

export default function ScrollAnimation() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      if (!containerRef.current || !svgRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll progress
      const maxScroll = documentHeight - windowHeight;
      const scrollProgress = Math.min(scrollY / maxScroll, 1);

      // Text zoom effect (starts at 8x and scales down to 1x)
      const scale = 30 - (scrollProgress * 28);

      // Opacity for the entire text
      const opacity = Math.min(scrollProgress * 4, 1);

      // Apply scale transformation to SVG
      svgRef.current.style.transform = `scale(${scale})`;
      svgRef.current.style.opacity = opacity;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="scroll-container">
      <section ref={containerRef} className="hero-section">
        {/* Static background image first */}
        <div className="background-image"></div>

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
                  x="50"
                  y="50"
                  fill="black"
                  fontSize="8"
                  fontWeight="900"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  letterSpacing="-0.3"
                >
                  ATTWELL
                </text>
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="#fbf1c7"
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
