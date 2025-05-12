import { useEffect, useRef } from 'react';
import HeroSection from './HeroSection';
import ProjectSection from './ProjectSection';
import { useScrollAnimations } from './useScrollAnimations';

export default function ScrollAnimation() {
  const heroRef = useRef(null);
  const subHeroRef = useRef(null);
  const svgRef = useRef(null);
  const backgroundRef = useRef(null);

  const projectsRef = useRef(null);

  const projectRef = useRef(null);
  const projectTitleRef = useRef(null);
  const projectImageRef = useRef(null);
  const projectParagraphRef = useRef(null);

  const refs = {
    heroRefs: {
      heroRef,
      subHeroRef,
      svgRef,
      backgroundRef
    },
    projectsRef,
    projectRefs: {
      projectRef,
      titleRef: projectTitleRef,
      imageRef: projectImageRef,
      paragraphRef: projectParagraphRef,
    }
  };

  const {
    updateHeroAnimations,
    updateProjectsAnimations,
    updateProjectAnimations,
  } = useScrollAnimations(refs);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;

      updateHeroAnimations(scrollY);
      updateProjectsAnimations(scrollY);
      updateProjectAnimations(scrollY);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [updateHeroAnimations, updateProjectsAnimations, updateProjectAnimations]);

  return (
    <div className="scroll-container">
      <HeroSection refs={refs.heroRefs} />

      <section ref={projectsRef} className="projects-section">
        <h2>Web Projects</h2>
      </section>

      <ProjectSection refs={refs.projectRefs} />
    </div>
  );
}
