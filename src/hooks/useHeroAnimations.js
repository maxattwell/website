// hooks/useHeroAnimations.js
import { useCallback } from 'react';
import { getProgress, calculateScale, calculateOpacity } from './helpers';

// Config values colocated with hero component logic
const HERO_CONFIG = {
  triggers: {
    startZoom: 0,
    endZoom: 1000,
    startSlideOutUp: 1200,
    completeExit: 2000,
    subHero: {
      startFadeIn: 1100,
      endFadeIn: 1200
    }
  },
  values: {
    scaleStart: 90,
    scaleEnd: 3,
    opacityMultiplier: 4,
    subHeroStart: 0.2,
    subHeroMultiplier: 10,
  }
};

export function useHeroAnimations(refs) {
  return useCallback((scrollY) => {
    if (!refs.heroRef.current || !refs.subHeroRef.current ||
        !refs.svgRef.current || !refs.backgroundRef.current) return;

    const zoomProgress = getProgress(
      HERO_CONFIG.triggers.startZoom,
      HERO_CONFIG.triggers.endZoom,
      scrollY
    );

    const slideOutProgress = getProgress(
      HERO_CONFIG.triggers.startSlideOutUp,
      HERO_CONFIG.triggers.completeExit,
      scrollY
    );

    const subHeroProgress = getProgress(
      HERO_CONFIG.triggers.subHero.startFadeIn,
      HERO_CONFIG.triggers.subHero.endFadeIn,
      scrollY
    );

    const scale = calculateScale(
      HERO_CONFIG.values.scaleStart,
      HERO_CONFIG.values.scaleEnd,
      zoomProgress
    );

    const translateY = slideOutProgress * 100;
    const svgOpacity = calculateOpacity(zoomProgress, HERO_CONFIG.values.opacityMultiplier);
    const heroOpacity = calculateOpacity(zoomProgress);

    // Apply transformations
    refs.svgRef.current.style.transform = `scale(${scale}) translateY(-${translateY}%)`;
    refs.heroRef.current.style.transform = `translateY(-${translateY}%)`;
    refs.backgroundRef.current.style.transform = `translateY(-${translateY}%)`;

    refs.svgRef.current.style.opacity = svgOpacity;
    refs.heroRef.current.style.opacity = heroOpacity;
    refs.subHeroRef.current.style.opacity = subHeroProgress;
  }, [refs]);
}
