import { useCallback, useEffect, useId, useRef } from 'react';
import scrollManager from '../managers/ScrollManager';
import { getProgress, calculateSlide } from '../utils/scrollHelpers';

// Tech badge icons
const VueIcon = () => (
  <svg viewBox="0 0 128 128" width="24" height="24">
    <path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" />
    <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" />
  </svg>
);

const JavaScriptIcon = () => (
  <svg viewBox="0 0 128 128" width="24" height="24">
    <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
    <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 128 128" width="24" height="24">
    <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.4-8.531 13.867-11.73 22.403-9.597 4.87 1.213 8.352 4.746 12.207 8.66C72.883 56.629 80.13 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.4 8.532-13.867 11.732-22.404 9.6-4.87-1.216-8.347-4.75-12.207-8.664-6.27-6.367-13.515-13.735-29.39-13.732zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.07 13.87 77.87 22.403 80c4.872 1.215 8.352 4.75 12.207 8.664 6.27 6.367 13.516 13.735 29.39 13.732 17.067 0 27.73-8.53 32-25.597-6.4 8.531-13.867 11.73-22.403 9.597-4.87-1.213-8.347-4.746-12.207-8.66-6.27-6.367-13.515-13.735-29.39-13.736z" fill="#38bdf8" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 128 128" width="24" height="24">
    <path fill="#007acc" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.31 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23 23 0 0180 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1h21.81z" />
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 128 128" width="24" height="24">
    <g fill="#61DAFB">
      <circle cx="64" cy="64" r="11.4" />
      <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8z" />
    </g>
  </svg>
);

// Tech badge component with its own animation state
const TechBadge = ({ icon, name, color, triggerScrollY, index, animationConfig }) => {
  const badgeRef = useRef(null);

  // Calculate the staggered delay based on index
  const staggerDelay = index * animationConfig.staggerDelay;
  const appearStart = triggerScrollY + staggerDelay;
  const appearEnd = appearStart + animationConfig.duration;
  const exitStart = animationConfig.exitStart + staggerDelay;
  const exitEnd = exitStart + animationConfig.duration;

  // Update the badge animation based on scroll position
  const updateBadgeAnimation = useCallback((scrollY) => {
    if (!badgeRef.current) return;

    let opacity = 0;
    let translateY = 20; // Starting position (slightly below)

    // Phase 1: Badge appears
    if (scrollY >= appearStart && scrollY < appearEnd) {
      const progress = getProgress(appearStart, appearEnd, scrollY);
      opacity = progress;
      translateY = 20 * (1 - progress);
    }
    // Phase 2: Badge stays visible
    else if (scrollY >= appearEnd && scrollY < exitStart) {
      opacity = 1;
      translateY = 0;
    }
    // Phase 3: Badge fades out
    else if (scrollY >= exitStart && scrollY < exitEnd) {
      const progress = getProgress(exitStart, exitEnd, scrollY);
      opacity = 1 - progress;
      translateY = -10 * progress; // Move slightly up when fading out
    }

    // Apply animations to the badge
    badgeRef.current.style.opacity = opacity;
    badgeRef.current.style.transform = `translateY(${translateY}px)`;
  }, [appearStart, appearEnd, exitStart, exitEnd]);

  // Register this badge with the scroll manager
  useEffect(() => {
    const unregister = scrollManager.register(`tech-badge-${index}`, updateBadgeAnimation);
    return unregister;
  }, [index, updateBadgeAnimation]);

  return (
    <div
      ref={badgeRef}
      className="tech-badge"
      style={{
        backgroundColor: color,
        opacity: 0, // Start invisible
        transform: 'translateY(20px)' // Start offset
      }}
    >
      {icon}
      <span className="tech-name">{name}</span>
    </div>
  );
};

const ProjectSection = ({ refs }) => {
  const componentId = useId();

  // Configuration for animations
  const CONFIG = {
    triggers: {
      // Title animation points
      titleSlideIn: 1950,
      titleFullyVisible: 2050,
      titleStayVisibleUntil: 2400,
      titleCompleteExit: 2500,

      // Tech badges base animation trigger
      techBadgesBaseAppear: 2100,
      techBadgesStayVisibleUntil: 2400,

      // Content appears in viewport around these scroll positions
      contentVisibleStart: 2100,
      contentVisibleEnd: 2800,

      // Base scroll position
      baseScrollPosition: 2300,
    },
    values: {
      slideDistance: 50,
      contentScrollSpeed: 0.7,

      // Badge animation configuration
      techBadges: {
        staggerDelay: 100,    // ms stagger between each badge
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

    // Simulated scrolling for image and paragraph
    const scrollDifference = scrollY - CONFIG.triggers.baseScrollPosition;
    const contentTranslateY = -scrollDifference * CONFIG.values.contentScrollSpeed;

    // Calculate opacity based on visibility range
    let contentOpacity = 1;

    // Fade in when content enters viewport
    if (scrollY < CONFIG.triggers.contentVisibleStart) {
      contentOpacity = getProgress(
        CONFIG.triggers.contentVisibleStart - 100,
        CONFIG.triggers.contentVisibleStart,
        scrollY
      );
    }
    // Fade out when content leaves viewport
    else if (scrollY > CONFIG.triggers.contentVisibleEnd) {
      contentOpacity = 1 - getProgress(
        CONFIG.triggers.contentVisibleEnd,
        CONFIG.triggers.contentVisibleEnd + 100,
        scrollY
      );
    }

    // Apply content transformations
    const mediaContainer = refs.imageRef.current.parentElement;
    if (mediaContainer) {
      mediaContainer.style.transform = `translateY(${contentTranslateY}px)`;
      mediaContainer.style.opacity = 1;
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
        <h2 ref={refs.titleRef} className="project-title">Project</h2>

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
