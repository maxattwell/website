import { useCallback, useEffect, useId } from 'react';
import scrollManager from '../managers/ScrollManager';
import { getProgress, calculateSlide } from '../utils/scrollHelpers';
import TechBadge from './TechBadge';

// Import icons
import VueIcon from './icons/VueIcon';
import TailwindIcon from './icons/TailwindIcon';
import TypeScriptIcon from './icons/TypeScriptIcon';

const ProjectSection = ({ refs }) => {
  const componentId = useId();

  // Configuration for animations
  const CONFIG = {
    triggers: {
      // Title animation points
      titleSlideIn: 1700,
      titleFullyVisible: 1800,
      titleStayVisibleUntil: 3400,
      titleCompleteExit: 3800,

      // Content appears in viewport around these scroll positions
      contentVisibleStart: 2100,
      contentVisibleEnd: 2800,

      // Base scroll position
      baseScrollPosition: 2300,
    },
    values: {
      slideDistance: 100,
      contentScrollSpeed: 1,

      // Badge animation configuration
      techBadges: {
        enterStart: 1800,
        exitStart: 3000,       // When badges start to exit
        staggerDelay: 50,    // ms stagger between each badge
        duration: 300        // ms duration of each badge animation
      }
    }
  };

  // Tech badges data
  const techBadges = [
    { icon: <VueIcon />, name: "Vue", color: "#42b883" },
    { icon: <TailwindIcon />, name: "Tailwind", color: "#38bdf8" },
    { icon: <TypeScriptIcon />, name: "TypeScript", color: "#007acc" },
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
    <section ref={refs.projectRef} className="fixed top-1/3 w-full flex justify-center">
      <div className="w-[90%] max-w-[1200px] flex flex-col gap-8">
        <div  className="w-1/2 flex flex-col gap-8 items-center justify-center">
          <div ref={refs.titleRef} className="magic-hover magic-hover__square">
            <a href="https:www.bexfit.co" target="_blank" rel="noopener noreferrer">
              <img src={`${import.meta.env.BASE_URL}/bexfit-icon.webp`} alt="BexFit App" className="w-48 h-48 rounded-4xl" />
            </a>
          </div>

        <div className="flex gap-3 justify-center flex-wrap w-60">
          {techBadges.map((badge, index) => (
            <TechBadge
              key={index}
              icon={badge.icon}
              name={badge.name}
              color={badge.color}
              index={index}
              animationConfig={CONFIG.values.techBadges}
            />
          ))}
        </div>
        </div>

        <div className="flex justify-end">
          <div className="w-1/2 flex flex-col gap-8">
            <div ref={refs.imageRef} className="opacity-100">
              <img src={`${import.meta.env.BASE_URL}/iphones_image.webp`} alt="Project" className="w-full h-auto max-h-[400px] object-cover rounded-lg" />
            </div>
            <div>
              <p ref={refs.paragraphRef} className="flex-1 text-[clamp(1rem,2vw,1.5rem)] leading-[1.6] text-[#fbf1c7] opacity-100">
                BEXFIT is a custom platform built to replace TrueCoach for an online personal training business. It includes a marketing website to showcase services, a web app for trainers to create programs and manage clients, and a progressive web app for clients to view and complete their personalized training sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
