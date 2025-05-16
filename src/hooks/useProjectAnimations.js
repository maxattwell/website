// hooks/useProjectAnimations.js
import { useCallback } from 'react';
import { getProgress, calculateSlide } from './helpers';

// Config values colocated with individual project logic
const PROJECT_CONFIG = {
  triggers: {
    title: 1950,
    image: 2050,
    paragraph: 2150,
    fullReveal: 2250,
  },
  values: {
    slideDistance: 50,
    slideDuration: 100,
  }
};

export function useProjectAnimations(projectRefs) {
  return useCallback((scrollY) => {
    if (!projectRefs.titleRef?.current ||
        !projectRefs.imageRef?.current ||
        !projectRefs.paragraphRef?.current) return;

    const titleProgress = getProgress(
      PROJECT_CONFIG.triggers.title,
      PROJECT_CONFIG.triggers.title + PROJECT_CONFIG.values.slideDuration,
      scrollY
    );

    const imageProgress = getProgress(
      PROJECT_CONFIG.triggers.image,
      PROJECT_CONFIG.triggers.image + PROJECT_CONFIG.values.slideDuration,
      scrollY
    );

    const paragraphProgress = getProgress(
      PROJECT_CONFIG.triggers.paragraph,
      PROJECT_CONFIG.triggers.paragraph + PROJECT_CONFIG.values.slideDuration,
      scrollY
    );

    const titleTranslateX = calculateSlide(PROJECT_CONFIG.values.slideDistance, titleProgress, true);
    const imageTranslateX = calculateSlide(PROJECT_CONFIG.values.slideDistance, imageProgress);
    const paragraphTranslateX = calculateSlide(PROJECT_CONFIG.values.slideDistance, paragraphProgress);

    // Apply transformations
    projectRefs.titleRef.current.style.transform = `translateX(${titleTranslateX}%)`;
    projectRefs.titleRef.current.style.opacity = titleProgress;

    projectRefs.imageRef.current.style.transform = `translateX(${imageTranslateX}%)`;
    projectRefs.imageRef.current.style.opacity = imageProgress;

    projectRefs.paragraphRef.current.style.transform = `translateX(${paragraphTranslateX}%)`;
    projectRefs.paragraphRef.current.style.opacity = paragraphProgress;
  }, [projectRefs]);
}
