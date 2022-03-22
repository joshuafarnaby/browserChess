import { chessPeice } from "./chessPeice";

export const Queen = (peiceColor) => {
  const moveSet = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

  const validateMove = function (gameboard, targetPosition) {
    // check if the target position is at least one of the potential target positions
    return (this.potentialNextMoves.some(move => targetPosition[0] == move[0] && targetPosition[1] == move[1]));
  }

  return Object.assign(
    chessPeice('queen', peiceColor, false),
    { moveSet, validateMove }
  )
}