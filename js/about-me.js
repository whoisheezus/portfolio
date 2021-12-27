var rellax = new Rellax('.rellax', {
    breakpoints: [576, 768, 1201]
  });

// grabs the media query
const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

// if the user prefers reduced motion, disable parallax
if (motionMediaQuery.matches) rellax.destroy();