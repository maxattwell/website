import { useCallback, useEffect, useId } from 'react';
import scrollManager from '../managers/ScrollManager';
import { getProgress } from '../utils/scrollHelpers';

const ProjectsSection = ({ projectsRef }) => {
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
    if (!projectsRef.current) return;

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

    projectsRef.current.style.transform = `translateY(${translateY}%)`;
  }, [projectsRef]);

  // Register with scroll manager on mount, unregister on unmount
  useEffect(() => {
    const unregister = scrollManager.register(`projects-${componentId}`, updateAnimations);
    return unregister;
  }, [updateAnimations, componentId]);

  return (
    <section ref={projectsRef} className="projects-section">
      <h2>Web Projects</h2>
    </section>
  );
};

export default ProjectsSection;
