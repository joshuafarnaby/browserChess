export const chessPeice = (function() {
  const outOfBounds = (n) => n < 0 || n > 7;

  return {
    outOfBounds,
  }
})();