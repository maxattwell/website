// utils/scrollHelpers.js
export const getProgress = (start, end, scrollY) => {
  if (scrollY <= start) return 0;
  if (scrollY >= end) return 1;
  return (scrollY - start) / (end - start);
};

export const interpolate = (start, end, progress) => {
  return start + (end - start) * progress;
};

export const calculateScale = (startScale, endScale, progress) => {
  return interpolate(startScale, endScale, progress);
};

export const calculateOpacity = (progress, multiplier = 1, max = 1) => {
  return Math.min(max, progress * multiplier);
};

export const calculateSlide = (distance, progress, fromLeft = false) => {
  const direction = fromLeft ? -1 : 1;
  return direction * (distance - (progress * distance));
};
