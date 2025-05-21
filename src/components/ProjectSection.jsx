import { useCallback, useEffect, useId } from 'react';
import scrollManager from '../managers/ScrollManager';
import { getProgress, calculateSlide } from '../utils/scrollHelpers';
import TechBadge from './TechBadge';

const ProjectSection = ({
  refs,
  scrollStart = 0,
  slidesFromLeft = true,
  title = {
    icon: "/default-icon.webp",
    alt: "Project Icon",
    link: "#"
  },
  techBadges = [],
  projectImage = {
    src: "/default-project.webp",
    alt: "Project Image"
  },
  description = "",
  animationConfig = {}
}) => {
  const componentId = useId();

  // Merge custom animation config with defaults
  const CONFIG = {
    triggers: {
      // Title animation points (relative to scrollStart)
      titleSlideIn: scrollStart - 600,
      titleFullyVisible: scrollStart - 500,
      titleStayVisibleUntil: scrollStart + 1100,
      titleCompleteExit: scrollStart + 1500,

      // Content appears in viewport around these scroll positions
      contentVisibleStart: scrollStart - 200,
      contentVisibleEnd: scrollStart + 500,

      // Base scroll position
      baseScrollPosition: scrollStart,

      ...animationConfig.triggers
    },
    values: {
      slideDistance: 100,
      contentScrollSpeed: 1,

      // Badge animation configuration
      techBadges: {
        enterStart: scrollStart - 500,
        exitStart: scrollStart + 700,
        staggerDelay: 50,
        duration: 300
      },

      ...animationConfig.values
    }
  };

  // Project section main animation
  const updateAnimations = useCallback((scrollY) => {
    if (!refs.titleRef?.current ||
        !refs.imageRef?.current ||
        !refs.paragraphRef?.current) return;

    // Title animation with three phases
    let titleTranslateX = slidesFromLeft ? -CONFIG.values.slideDistance : CONFIG.values.slideDistance;
    let titleOpacity = 0;

    // Phase 1: Title slide in
    if (scrollY >= CONFIG.triggers.titleSlideIn && scrollY < CONFIG.triggers.titleFullyVisible) {
      const slideInProgress = getProgress(
        CONFIG.triggers.titleSlideIn,
        CONFIG.triggers.titleFullyVisible,
        scrollY
      );

      titleTranslateX = calculateSlide(CONFIG.values.slideDistance, slideInProgress, slidesFromLeft);
      titleOpacity = slideInProgress;
    }
    // Phase 2: Title stays in place
    else if (scrollY >= CONFIG.triggers.titleFullyVisible && scrollY < CONFIG.triggers.titleStayVisibleUntil) {
      titleTranslateX = 0;
      titleOpacity = 1;
    }
    // Phase 3: Title slides out
    else if (scrollY >= CONFIG.triggers.titleStayVisibleUntil) {
      const slideOutProgress = getProgress(
        CONFIG.triggers.titleStayVisibleUntil,
        CONFIG.triggers.titleCompleteExit,
        scrollY
      );

      // For exit animation, we reverse the direction
      titleTranslateX = slidesFromLeft
        ? -slideOutProgress * CONFIG.values.slideDistance
        : slideOutProgress * CONFIG.values.slideDistance;
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
  }, [refs, CONFIG, slidesFromLeft]);

  // Register with scroll manager
  useEffect(() => {
    const unregister = scrollManager.register(`project-${componentId}`, updateAnimations);
    return unregister;
  }, [updateAnimations, componentId]);

  return (
    <section ref={refs.projectRef} className="fixed top-1/3 w-full flex justify-center">
      <div className="w-[90%] max-w-[1200px] flex flex-col gap-8">
        {/* Title section - position based on slide direction */}
        <div className={`${slidesFromLeft ? '' : 'flex justify-end'}`}>
          <div className="w-1/2 flex flex-col gap-8 items-center justify-center">
            <div ref={refs.titleRef} className="magic-hover magic-hover__square">
              <a href={title.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={`${import.meta.env.BASE_URL}${title.icon}`}
                  alt={title.alt}
                  className="w-48 h-48 rounded-4xl"
                />
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
                  componentId={componentId}
                  animationConfig={CONFIG.values.techBadges}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content section - position opposite of title */}
        <div className={`flex ${slidesFromLeft ? 'justify-end' : 'justify-start'}`}>
          <div className="w-1/2 flex flex-col gap-8">
            <div ref={refs.imageRef} className="opacity-100">
              <img
                src={`${import.meta.env.BASE_URL}${projectImage.src}`}
                alt={projectImage.alt}
                className="w-full h-auto max-h-[400px] object-cover rounded-lg"
              />
            </div>
            <div>
              <p ref={refs.paragraphRef} className="flex-1 text-[clamp(1rem,2vw,1.5rem)] leading-[1.6] text-[#fbf1c7] opacity-100">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
