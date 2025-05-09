export const ANIMATION_CONFIG = {
  triggers: {
    hero: {
      startZoom: 0,
      endZoom: 1000,
      startSlideOutUp: 1200,
      completeExit: 2000,
    },
    subHero: {
      startFadeIn: 1100,
      endFadeIn: 1200
    },
    projects: {
      startEntry: 1200,
      stopEntry: 1500,
      startExit: 1900,
      completeExit: 2000,
    },
    history: {
      title: 1950,
      image: 2050,
      paragraph: 2150,
      fullReveal: 2250,
    }
  },
  values: {
    hero: {
      scaleStart: 90,          // Starting scale: 90%
      scaleEnd: 3,            // Ending scale: 3% (very small)
      opacityMultiplier: 4,
      subHeroStart: 0.2,
      subHeroMultiplier: 10,
    },
    slide: {
      distance: 50,
      duration: 100,
    },
    translate: {
      distance: 100,
    }
  }
};

// Helper function to calculate progress between two points
export const getProgress = (start, end, scrollY) => {
  if (scrollY <= start) return 0;
  if (scrollY >= end) return 1;
  return (scrollY - start) / (end - start);
};

// Helper function to interpolate between two values
export const interpolate = (start, end, progress) => {
  return start + (end - start) * progress;
};

// Helper function to calculate scale value
export const calculateScale = (startScale, endScale, progress) => {
  return interpolate(startScale, endScale, progress);
};

// Helper function to calculate transform translation
export const calculateTranslation = (distance, progress) => {
  return distance * progress;
};

// Helper function to calculate opacity with multiplier
export const calculateOpacity = (progress, multiplier = 1, max = 1) => {
  return Math.min(max, progress * multiplier);
};

// Helper function for slide animations
export const calculateSlide = (distance, progress, fromLeft = false) => {
  const direction = fromLeft ? -1 : 1;
  return direction * (distance - (progress * distance));
};

// Animation calculation functions
export const calculateHeroAnimations = (scrollY) => {
  const zoomProgress = getProgress(
    ANIMATION_CONFIG.triggers.hero.startZoom,
    ANIMATION_CONFIG.triggers.hero.endZoom,
    scrollY
  );
  const slideOutProgress = getProgress(
    ANIMATION_CONFIG.triggers.hero.startSlideOutUp,
    ANIMATION_CONFIG.triggers.hero.completeExit,
    scrollY
  );
  const subHeroProgress = getProgress(
    ANIMATION_CONFIG.triggers.subHero.startFadeIn,
    ANIMATION_CONFIG.triggers.subHero.endFadeIn,
    scrollY
  );

  return {
    scale: calculateScale(
      ANIMATION_CONFIG.values.hero.scaleStart,
      ANIMATION_CONFIG.values.hero.scaleEnd,
      zoomProgress
    ),
    translateY: slideOutProgress * 100,
    svgOpacity: calculateOpacity(zoomProgress, ANIMATION_CONFIG.values.hero.opacityMultiplier),
    heroOpacity: calculateOpacity(zoomProgress),
    subHeroOpacity: subHeroProgress
  };
};

export const calculateProjectsAnimations = (scrollY) => {
  const entryProgress = getProgress(
    ANIMATION_CONFIG.triggers.projects.startEntry,
    ANIMATION_CONFIG.triggers.projects.stopEntry,
    scrollY
  );
  const exitProgress = getProgress(
    ANIMATION_CONFIG.triggers.projects.startExit,
    ANIMATION_CONFIG.triggers.projects.completeExit,
    scrollY
  );

  let translateY = ANIMATION_CONFIG.values.translate.distance;
  if (scrollY > ANIMATION_CONFIG.triggers.projects.startEntry) {
    translateY = ANIMATION_CONFIG.values.translate.distance -
                 (entryProgress * ANIMATION_CONFIG.values.translate.distance);
  }
  if (scrollY > ANIMATION_CONFIG.triggers.projects.startExit) {
    translateY = -exitProgress * ANIMATION_CONFIG.values.translate.distance;
  }

  return {
    translateY
  };
};

export const calculateHistoryAnimations = (scrollY) => {
  const titleProgress = getProgress(
    ANIMATION_CONFIG.triggers.history.title,
    ANIMATION_CONFIG.triggers.history.title + ANIMATION_CONFIG.values.slide.duration,
    scrollY
  );
  const imageProgress = getProgress(
    ANIMATION_CONFIG.triggers.history.image,
    ANIMATION_CONFIG.triggers.history.image + ANIMATION_CONFIG.values.slide.duration,
    scrollY
  );
  const paragraphProgress = getProgress(
    ANIMATION_CONFIG.triggers.history.paragraph,
    ANIMATION_CONFIG.triggers.history.paragraph + ANIMATION_CONFIG.values.slide.duration,
    scrollY
  );

  return {
    title: {
      translateX: calculateSlide(ANIMATION_CONFIG.values.slide.distance, titleProgress, true),
      opacity: titleProgress
    },
    image: {
      translateX: calculateSlide(ANIMATION_CONFIG.values.slide.distance, imageProgress),
      opacity: imageProgress
    },
    paragraph: {
      translateX: calculateSlide(ANIMATION_CONFIG.values.slide.distance, paragraphProgress),
      opacity: paragraphProgress
    }
  };
};
