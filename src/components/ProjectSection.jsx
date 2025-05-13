import { useCallback, useEffect, useId } from 'react';
import scrollManager from '../managers/ScrollManager';
import { getProgress, calculateSlide } from '../utils/scrollHelpers';
import TechBadge from './TechBadge';

// Import icons
import VueIcon from './icons/VueIcon';
import JavaScriptIcon from './icons/JavaScriptIcon';
import TailwindIcon from './icons/TailwindIcon';
import TypeScriptIcon from './icons/TypeScriptIcon';
import ReactIcon from './icons/ReactIcon';
import LinkIcon from './icons/LinkIcon';

const ProjectSection = ({ refs }) => {
  const componentId = useId();

  // Configuration for animations
  const CONFIG = {
    triggers: {
      // Title animation points
      titleSlideIn: 1700,
      titleFullyVisible: 1800,
      titleStayVisibleUntil: 3000,
      titleCompleteExit: 3100,

      // Tech badges base animation trigger
      techBadgesBaseAppear: 1800,
      techBadgesStayVisibleUntil: 3400,

      // Content appears in viewport around these scroll positions
      contentVisibleStart: 2100,
      contentVisibleEnd: 2800,

      // Base scroll position
      baseScrollPosition: 2300,
    },
    values: {
      slideDistance: 50,
      contentScrollSpeed: 1,

      // Badge animation configuration
      techBadges: {
        staggerDelay: 50,    // ms stagger between each badge
        duration: 300,        // ms duration of each badge animation
        exitStart: 2400       // When badges start to exit
      }
    }
  };

  // Tech badges data
  const techBadges = [
    { icon: <VueIcon />, name: "Vue", color: "#42b883" },
    { icon: <JavaScriptIcon />, name: "JavaScript", color: "#f0db4f" },
    { icon: <TailwindIcon />, name: "Tailwind", color: "#38bdf8" },
    { icon: <TypeScriptIcon />, name: "TypeScript", color: "#007acc" },
    { icon: <ReactIcon />, name: "React", color: "#61dafb" }
  ];

  // Project section main animation
  const updateAnimations = useCallback((scrollY) => {
    if (!refs.titleRef?.current ||
        !refs.imageRef?.current ||
        !refs.paragraphRef?.current) return;

    // Title animation with three phases
    let titleTranslateX = -CONFIG.values.slideDistance;
    let titleOpacity = 0;

    // Phase 1: Title slide in from left
    if (scrollY >= CONFIG.triggers.titleSlideIn && scrollY < CONFIG.triggers.titleFullyVisible) {
      const slideInProgress = getProgress(
        CONFIG.triggers.titleSlideIn,
        CONFIG.triggers.titleFullyVisible,
        scrollY
      );

      titleTranslateX = calculateSlide(CONFIG.values.slideDistance, slideInProgress, true);
      titleOpacity = slideInProgress;
    }
    // Phase 2: Title stays in place
    else if (scrollY >= CONFIG.triggers.titleFullyVisible && scrollY < CONFIG.triggers.titleStayVisibleUntil) {
      titleTranslateX = 0;
      titleOpacity = 1;
    }
    // Phase 3: Title slides out to left
    else if (scrollY >= CONFIG.triggers.titleStayVisibleUntil) {
      const slideOutProgress = getProgress(
        CONFIG.triggers.titleStayVisibleUntil,
        CONFIG.triggers.titleCompleteExit,
        scrollY
      );

      titleTranslateX = -slideOutProgress * CONFIG.values.slideDistance;
      titleOpacity = 1 - slideOutProgress;
    }

    // Apply title transformations
    refs.titleRef.current.style.transform = `translateX(${titleTranslateX}%)`;
    refs.titleRef.current.style.opacity = titleOpacity;
    
    // Ensure the app icon maintains iOS-style appearance
    const appIcon = refs.titleRef.current.querySelector('.app-icon');
    if (appIcon) {
      appIcon.style.borderRadius = '22%';
      appIcon.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }

    // Simulated scrolling for image and paragraph
    const scrollDifference = scrollY - CONFIG.triggers.baseScrollPosition;
    const contentTranslateY = -scrollDifference * CONFIG.values.contentScrollSpeed;


    // Apply content transformations
    const mediaContainer = refs.imageRef.current.parentElement;
    if (mediaContainer) {
      mediaContainer.style.transform = `translateY(${contentTranslateY}px)`;
    }
  }, [refs, CONFIG]);

  // Register with scroll manager
  useEffect(() => {
    const unregister = scrollManager.register(`project-${componentId}`, updateAnimations);
    return unregister;
  }, [updateAnimations, componentId]);

  return (
    <section ref={refs.projectRef} className="project-section">
      <div className="project-content">
        <div ref={refs.titleRef} className="project-title">
          <div className="app-icon-container">
            <img src="/src/assets/bexfit-icon.png" alt="BexFit App" className="app-icon" />
            <a href="https://www.bexfit.co" target="_blank" rel="noopener noreferrer" className="app-link">
              <LinkIcon />
              www.bexfit.co
            </a>
          </div>
        </div>

        <div className="tech-badges">
          {techBadges.map((badge, index) => (
            <TechBadge
              key={index}
              icon={badge.icon}
              name={badge.name}
              color={badge.color}
              index={index}
              triggerScrollY={CONFIG.triggers.techBadgesBaseAppear}
              animationConfig={CONFIG.values.techBadges}
            />
          ))}
        </div>

        <div className="project-media">
          <div className="right-content">
            <div ref={refs.imageRef} className="project-image-container">
              <img src="/src/assets/iphones_image.png" alt="Project" className="project-image" />
            </div>
            <p ref={refs.paragraphRef} className="project-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
