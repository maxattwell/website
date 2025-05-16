// MainPortfolio.jsx
import { useRef } from 'react';
import HeroSection from './HeroSection';
import ProjectSection from './ProjectSection';
import ProjectsSection from './ProjectsSection';

export default function MainPortfolio() {
  // Refs for HeroSection
  const heroRef = useRef(null);
  const subHeroRef = useRef(null);
  const svgRef = useRef(null);
  const backgroundRef = useRef(null);

  // Ref for ProjectsSection
  const projectsRef = useRef(null);

  // Refs for ProjectSection
  const projectRef = useRef(null);
  const projectTitleRef = useRef(null);
  const techBadgesRef = useRef(null); // New ref for tech badges
  const projectImageRef = useRef(null);
  const projectParagraphRef = useRef(null);

  const heroRefs = {
    heroRef,
    subHeroRef,
    svgRef,
    backgroundRef
  };

  const projectRefs = {
    projectRef,
    titleRef: projectTitleRef,
    techBadgesRef, // Added to refs object
    imageRef: projectImageRef,
    paragraphRef: projectParagraphRef
  };

  return (
    <div className="portfolio-container">
      <HeroSection refs={heroRefs} />
      <ProjectsSection projectsRef={projectsRef} />
      <ProjectSection refs={projectRefs} />
    </div>
  );
}
