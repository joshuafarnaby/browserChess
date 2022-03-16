import { chessPeice } from "./chessPeice"

export const Rook = (peiceColor) => {
  let color = peiceColor;
  const getColor = () => color;
  const setColor = (newColor) => color = newColor;

  return {
    getColor,
    setColor
  }
}