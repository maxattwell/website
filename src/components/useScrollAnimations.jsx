import { useCallback } from 'react';
import {
  calculateHeroAnimations,
  calculateProjectsAnimations,
  calculateProjectAnimations
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

  const updateProjectAnimations = useCallback((scrollY) => {
    if (!refs.projectRefs || !refs.projectRefs.projectRef.current) return;

    const animations = calculateProjectAnimations(scrollY);

    // Apply transformations
    refs.projectRefs.titleRef.current.style.transform = `translateX(${animations.title.translateX}%)`;
    refs.projectRefs.titleRef.current.style.opacity = animations.title.opacity;

    refs.projectRefs.imageRef.current.style.transform = `translateX(${animations.image.translateX}%)`;
    refs.projectRefs.imageRef.current.style.opacity = animations.image.opacity;

    refs.projectRefs.paragraphRef.current.style.transform = `translateX(${animations.paragraph.translateX}%)`;
    refs.projectRefs.paragraphRef.current.style.opacity = animations.paragraph.opacity;
  }, [refs]);

  return {
    updateHeroAnimations,
    updateProjectsAnimations,
    updateProjectAnimations,
  };
}
