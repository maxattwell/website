import { useCallback, useEffect, useId } from 'react';
import scrollManager from '../managers/ScrollManager';
import { getProgress, calculateScale, calculateOpacity } from '../utils/scrollHelpers';

const HeroSection = ({ refs }) => {
  const componentId = useId(); // Generate unique ID for this component instance

  // Config values colocated directly within the component
  const CONFIG = {
    triggers: {
      startZoom: 0,
      endZoom: 1000,
      startSlideOutUp: 1200,
      completeExit: 1700,
      subHero: {
        startFadeIn: 1000,
        endFadeIn: 1150
      }
    },
    values: {
      scaleStart: 90,
      scaleEnd: 3,
      opacityMultiplier: 4,
    }
  };

  // Animation function defined within the component
  const updateAnimations = useCallback((scrollY) => {
    if (!refs.heroRef.current || !refs.subHeroRef.current ||
        !refs.svgRef.current || !refs.backgroundRef.current) return;

    const zoomProgress = getProgress(
      CONFIG.triggers.startZoom,
      CONFIG.triggers.endZoom,
      scrollY
    );

    const slideOutProgress = getProgress(
      CONFIG.triggers.startSlideOutUp,
      CONFIG.triggers.completeExit,
      scrollY
    );

    const subHeroProgress = getProgress(
      CONFIG.triggers.subHero.startFadeIn,
      CONFIG.triggers.subHero.endFadeIn,
      scrollY
    );

    const scale = calculateScale(
      CONFIG.values.scaleStart,
      CONFIG.values.scaleEnd,
      zoomProgress
    );

    const translateY = slideOutProgress * 100;
    const svgOpacity = calculateOpacity(zoomProgress, CONFIG.values.opacityMultiplier);
    const heroOpacity = calculateOpacity(zoomProgress);

    // Apply transformations
    refs.svgRef.current.style.transform = `scale(${scale}) translateY(-${translateY}%)`;
    refs.heroRef.current.style.transform = `translateY(-${translateY}%)`;
    refs.backgroundRef.current.style.transform = `translateY(-${translateY}%)`;

    refs.svgRef.current.style.opacity = svgOpacity;
    refs.heroRef.current.style.opacity = heroOpacity;
    refs.subHeroRef.current.style.opacity = subHeroProgress;
  }, [refs]);

  // Register with scroll manager on mount, unregister on unmount
  useEffect(() => {
    const unregister = scrollManager.register(`hero-${componentId}`, updateAnimations);
    return unregister;
  }, [updateAnimations, componentId]);

  return (
    <section className="font-['Pirata_One'] fixed w-screen h-screen overflow-hidden top-0 left-0 flex items-center justify-center">
      <div ref={refs.backgroundRef} className="absolute w-full h-full bg-[url('/src/assets/running-header.webp')] bg-cover bg-center z-[1]"></div>
      <div ref={refs.heroRef} className="absolute w-full h-full bg-foreground z-[2]"></div>

      <div className="absolute w-full h-full z-[3] flex items-center justify-center">
        <svg
          ref={refs.svgRef}
          className="origin-center w-screen h-screen"
          width="100vw"
          height="100vh"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <mask id="textMask">
              <rect width="100%" height="100%" fill="white" />
              <text
                x="46"
                y="50"
                fill="black"
                fontSize="8"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                Max
              </text>
              <text
                ref={refs.subHeroRef}
                x="50"
                y="58"
                fill="black"
                fontSize="8"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                Attwell
              </text>
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="#282828"
            mask="url(#textMask)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
