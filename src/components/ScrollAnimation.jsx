import { useEffect, useRef } from 'react';

export default function ScrollAnimation() {
  const heroRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      if (!heroRef.current || !overlayRef.current) return;

      // Calculate scroll progress based on viewport
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Start fading in the overlay once we've scrolled 20% of viewport
      const fadeStart = windowHeight * 0.2;
      // Complete the fade at 80% of viewport height
      const fadeEnd = windowHeight * 0.8;

      let progress = 0;

      if (scrollY >= fadeStart) {
        progress = Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
      }

      // Apply the fade effect
      overlayRef.current.style.opacity = progress;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial call to set the correct state
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="scroll-container">
      {/* Fixed hero section */}
      <section ref={heroRef} className="hero-section">
        <div className="image-container">
          <img
            src="/src/assets/max-running-header.webp"
            alt="Hero"
            className="hero-image"
          />
          <div ref={overlayRef} className="color-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>Your Hero Title</h1>
          <p>This image stays fixed while you scroll</p>
        </div>
      </section>

      {/* Content that scrolls over the hero */}
      <section className="content-section">
        <div className="scrolling-content">
          <h2>Content Section</h2>
          <p>This content scrolls over the fixed hero image</p>
          <p>As you scroll, the hero image gradually fades to a blue color</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          {/* Add more content to make scrolling visible */}
          {Array(10).fill().map((_, i) => (
            <p key={i}>More scrolling content...</p>
          ))}
        </div>
      </section>
    </div>
  );
}
