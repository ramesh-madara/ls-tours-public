/**
 * Scroll to top with smooth behavior, respecting prefers-reduced-motion
 */
export const scrollToTopSmooth = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: prefersReducedMotion ? 'instant' : 'smooth',
  });
};
