import { chessPeice } from "./chessPeice";

export const Knight = (peiceColor) => {
  const moveSet = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]];

  const validateMove = function (gameboard, targetPosition) {
    // check if the target position is at least one of the potential target positions
    return (this.potentialNextMoves.some(move => targetPosition[0] == move[0] && targetPosition[1] == move[1]));
  }
  
  return Object.assign(
    chessPeice('knight', peiceColor, true),
    { moveSet, validateMove }
  )
}