import { useCallback } from 'react';
import {
  calculateHeroAnimations,
  calculateProjectsAnimations,
  calculateHistoryAnimations
} from './ScrollAnimationConfig';

export function useScrollAnimations(refs) {
  const updateHeroAnimations = useCallback((scrollY) => {
    if (!refs.heroRefs.heroRef.current || !refs.heroRefs.subHeroRef.current ||
        !refs.heroRefs.svgRef.current || !refs.heroRefs.backgroundRef.current) return;

    const animations = calculateHeroAnimations(scrollY);

    // Apply transformations
    refs.heroRefs.svgRef.current.style.transform = `scale(${animations.scale}) translateY(-${animations.translateY}%)`;
    refs.heroRefs.heroRef.current.style.transform = `translateY(-${animations.translateY}%)`;
    refs.heroRefs.backgroundRef.current.style.transform = `translateY(-${animations.translateY}%)`;

    refs.heroRefs.svgRef.current.style.opacity = animations.svgOpacity;
    refs.heroRefs.heroRef.current.style.opacity = animations.heroOpacity;
    refs.heroRefs.subHeroRef.current.style.opacity = animations.subHeroOpacity;
  }, [refs]);

  const updateProjectsAnimations = useCallback((scrollY) => {
    if (!refs.projectsRef.current) return;

    const animations = calculateProjectsAnimations(scrollY);

    refs.projectsRef.current.style.transform = `translateY(${animations.translateY}%)`;
  }, [refs]);

  const updateHistoryAnimations = useCallback((scrollY) => {
    if (!refs.historyRefs || !refs.historyRefs.historyRef.current) return;

    const animations = calculateHistoryAnimations(scrollY);

    // Apply transformations
    refs.historyRefs.titleRef.current.style.transform = `translateX(${animations.title.translateX}%)`;
    refs.historyRefs.titleRef.current.style.opacity = animations.title.opacity;

    refs.historyRefs.imageRef.current.style.transform = `translateX(${animations.image.translateX}%)`;
    refs.historyRefs.imageRef.current.style.opacity = animations.image.opacity;

    refs.historyRefs.paragraphRef.current.style.transform = `translateX(${animations.paragraph.translateX}%)`;
    refs.historyRefs.paragraphRef.current.style.opacity = animations.paragraph.opacity;
  }, [refs]);

  return {
    updateHeroAnimations,
    updateProjectsAnimations,
    updateHistoryAnimations,
  };
}
