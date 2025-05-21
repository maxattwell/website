import { useCallback, useEffect, useRef } from 'react';
import scrollManager from '../managers/ScrollManager';
import { getProgress } from '../utils/scrollHelpers';

// Tech badge component with its own animation state
const TechBadge = ({ icon, name, color, index, componentId, animationConfig }) => {
  const badgeRef = useRef(null);

  // Calculate the staggered delay based on index
  const staggerDelay = index * animationConfig.staggerDelay;
  const appearStart = animationConfig.enterStart + staggerDelay;
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
      translateY = -20 * progress; // Move slightly up when fading out
    }

    // Apply animations to the badge
    badgeRef.current.style.opacity = opacity;
    badgeRef.current.style.transform = `translateY(${translateY}px)`;
  }, [appearStart, appearEnd, exitStart, exitEnd]);

  // Register this badge with the scroll manager
  useEffect(() => {
    const unregister = scrollManager.register(`tech-badge-${componentId}-${index}`, updateBadgeAnimation);
    return unregister;
  }, [index, updateBadgeAnimation]);

  return (
    <div
      ref={badgeRef}
      className="bg-[#fbf1c7] text-black flex items-center gap-2 rounded-full"
      style={{ padding: '0.5rem 1rem' }}
    >
      <div className="w-5 h-5">{icon}</div>
      <div className="mx-4">{name}</div>
    </div>
  );
};

export default TechBadge;
