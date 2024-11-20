export const applyGlowEffect = (e: MouseEvent) => {
  const elements = document.querySelectorAll('.glow-effect');
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isHovered =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (isHovered) {
      element.classList.add('glow-effect-active');
    } else {
      element.classList.remove('glow-effect-active');
    }
  });
}; 