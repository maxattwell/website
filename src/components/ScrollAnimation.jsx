import { useEffect, useRef } from 'react';

export default function ScrollAnimation() {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      if (!containerRef.current || !overlayRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll progress
      const maxScroll = documentHeight - windowHeight;
      const scrollProgress = Math.min(scrollY / maxScroll, 1);

      // Color overlay
      const colorOpacity = Math.min(scrollProgress * 1.2, 1);
      overlayRef.current.style.opacity = colorOpacity;

      // Title - zooms out first
      if (titleRef.current) {
        const titleScale = 8 - (scrollProgress * 7);
        const titleOpacity = Math.min(scrollProgress * 3, 1);
        titleRef.current.style.transform = `translate(-50%, -50%) scale(${Math.max(titleScale, 1)})`;
        titleRef.current.style.opacity = titleOpacity;
      }

      // Subtitle - zooms out second
      if (subtitleRef.current) {
        const subtitleDelay = Math.max(0, (scrollProgress - 0.2) * 1.25);
        const subtitleScale = 4 - (subtitleDelay * 3);
        const subtitleOpacity = Math.min(subtitleDelay * 3, 1);
        subtitleRef.current.style.transform = `translate(-50%, -50%) scale(${Math.max(subtitleScale, 1)})`;
        subtitleRef.current.style.opacity = subtitleOpacity;
      }

      // Circle - appears from outside
      if (circleRef.current) {
        const circleDelay = Math.max(0, (scrollProgress - 0.4) * 1.67);
        const circleScale = 20 - (circleDelay * 19);
        const circleOpacity = Math.min(circleDelay * 2, 0.3);
        circleRef.current.style.transform = `translate(-50%, -50%) scale(${Math.max(circleScale, 1)})`;
        circleRef.current.style.opacity = circleOpacity;
      }
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
        <div className="image-container">
          <img
            src="/src/assets/max-running-header.webp"
            alt="Hero"
            className="hero-image"
          />
          <div ref={overlayRef} className="color-overlay"></div>
        </div>

        {/* Background circle */}
        <div ref={circleRef} className="background-circle"></div>

        {/* Title */}
        <h1 ref={titleRef} className="zoom-title">AMAZING</h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="zoom-subtitle">Scroll Experience</p>
      </section>

      <section className="content-section">
        <div className="scrolling-content">
          <h2>Welcome</h2>
          <p>Now you've experienced the zoom out effect!</p>
          {Array(15).fill().map((_, i) => (
            <p key={i}>Continue scrolling to see more content...</p>
          ))}
        </div>
      </section>
    </div>
  );
}
