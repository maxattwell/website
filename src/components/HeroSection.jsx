const HeroSection = ({ refs }) => {
  return (
    <section className="hero-section">
      <div ref={refs.backgroundRef} className="background-image"></div>
      <div ref={refs.heroRef} className="hero-text-color"></div>

      <div className="foreground-layer">
        <svg
          ref={refs.svgRef}
          className="text-mask-svg"
          width="100vw"
          height="100vh"
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
                ref={refs.subHeroRef}
                x="50"
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
  );
};

export default HeroSection;
