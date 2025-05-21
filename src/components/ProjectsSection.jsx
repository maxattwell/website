import { useCallback, useEffect, useId } from 'react';
import scrollManager from '../managers/ScrollManager';
import { getProgress } from '../utils/scrollHelpers';

const ProjectsSection = ({ refs }) => {
  const componentId = useId(); // Generate unique ID for this component instance

  // Config values colocated directly within the component
  const CONFIG = {
    triggers: {
      startEntry: 1200,
      stopEntry: 1350,
      startExit: 1450,
      completeExit: 1800,
    },
    values: {
      translateDistance: 100
    }
  };

  // Animation function defined within the component
  const updateAnimations = useCallback((scrollY) => {
    if (!refs.projectsRef.current || !refs.projectsMouseRef.current) return;

    const entryProgress = getProgress(
      CONFIG.triggers.startEntry,
      CONFIG.triggers.stopEntry,
      scrollY
    );

    const exitProgress = getProgress(
      CONFIG.triggers.startExit,
      CONFIG.triggers.completeExit,
      scrollY
    );

    let translateY = CONFIG.values.translateDistance;
    if (scrollY > CONFIG.triggers.startEntry) {
      translateY = CONFIG.values.translateDistance -
                   (entryProgress * CONFIG.values.translateDistance);
    }
    if (scrollY > CONFIG.triggers.startExit) {
      translateY = -exitProgress * CONFIG.values.translateDistance;
    }

    refs.projectsRef.current.style.transform = `translateY(${translateY}%)`;
  }, [refs.projectsRef]);

  // Register with scroll manager on mount, unregister on unmount
  useEffect(() => {
    const unregister = scrollManager.register(`projects-${componentId}`, updateAnimations);
    return unregister;
  }, [updateAnimations, componentId]);

  return (
    <section ref={refs.projectsRef} className="fixed bg-[#282828] top-0 left-0 w-screen h-screen flex items-center justify-center transition-none">
      <div ref={refs.projectsMouseRef} className="">
        <h2 className="font-['Pirata_One'] text-[clamp(3rem,8vw,8rem)] z-[2] text-[#fbf1c7] font-semibold">Web Projects</h2>
      </div>
    </section>
  );
};

export default ProjectsSection;
