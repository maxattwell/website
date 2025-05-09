import { useEffect, useRef } from 'react';
import HeroSection from './HeroSection';
import HistorySection from './HistorySection';
import { useScrollAnimations } from './useScrollAnimations';

export default function ScrollAnimation() {
  const heroRef = useRef(null);
  const subHeroRef = useRef(null);
  const svgRef = useRef(null);
  const backgroundRef = useRef(null);

  const projectsRef = useRef(null);

  const historyRef = useRef(null);
  const historyTitleRef = useRef(null);
  const historyImageRef = useRef(null);
  const historyParagraphRef = useRef(null);

  const refs = {
    heroRefs: {
      heroRef,
      subHeroRef,
      svgRef,
      backgroundRef
    },
    projectsRef,
    historyRefs: {
      historyRef,
      titleRef: historyTitleRef,
      imageRef: historyImageRef,
      paragraphRef: historyParagraphRef,
    }
  };

  const {
    updateHeroAnimations,
    updateProjectsAnimations,
    updateHistoryAnimations,
  } = useScrollAnimations(refs);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;

      updateHeroAnimations(scrollY);
      updateProjectsAnimations(scrollY);
      updateHistoryAnimations(scrollY);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [updateHeroAnimations, updateProjectsAnimations, updateHistoryAnimations]);

  return (
    <div className="scroll-container">
      <HeroSection refs={refs.heroRefs} />

      <section ref={projectsRef} className="projects-section">
        <h2>Web Projects</h2>
      </section>

      <HistorySection refs={refs.historyRefs} />
    </div>
  );
}
