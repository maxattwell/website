// hooks/useProjectsAnimations.js
import { useCallback } from 'react';
import { getProgress } from './helpers';

// Config values colocated with project section logic
const PROJECTS_CONFIG = {
  triggers: {
    startEntry: 1200,
    stopEntry: 1500,
    startExit: 1900,
    completeExit: 2000,
  },
  values: {
    translateDistance: 100
  }
};

export function useProjectsAnimations(projectsRef) {
  return useCallback((scrollY) => {
    if (!projectsRef.current) return;

    const entryProgress = getProgress(
      PROJECTS_CONFIG.triggers.startEntry,
      PROJECTS_CONFIG.triggers.stopEntry,
      scrollY
    );

    const exitProgress = getProgress(
      PROJECTS_CONFIG.triggers.startExit,
      PROJECTS_CONFIG.triggers.completeExit,
      scrollY
    );

    let translateY = PROJECTS_CONFIG.values.translateDistance;
    if (scrollY > PROJECTS_CONFIG.triggers.startEntry) {
      translateY = PROJECTS_CONFIG.values.translateDistance -
                   (entryProgress * PROJECTS_CONFIG.values.translateDistance);
    }
    if (scrollY > PROJECTS_CONFIG.triggers.startExit) {
      translateY = -exitProgress * PROJECTS_CONFIG.values.translateDistance;
    }

    projectsRef.current.style.transform = `translateY(${translateY}%)`;
  }, [projectsRef]);
}
