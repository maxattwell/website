import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function ScrollAnimation() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    const section = sectionRef.current;

    function onScroll() {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollPercentage = 1 - (rect.top / window.innerHeight);

      if (scrollPercentage >= 0 && scrollPercentage <= 1) {
        // Animate opacity based on scroll position
        section.style.opacity = scrollPercentage;
        // Animate scale based on scroll position
        section.style.transform = `scale(${0.8 + (scrollPercentage * 0.2)})`;
      }
    }

    lenis.on('scroll', onScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="scroll-container">
      <section className="spacer">Scroll Down</section>

      <section ref={sectionRef} className="animated-section">
        <h2>This section fades and scales in as you scroll</h2>
        <p>Powered by Lenis smooth scrolling</p>
      </section>

      <section className="spacer">Keep Scrolling</section>
    </div>
  );
}
