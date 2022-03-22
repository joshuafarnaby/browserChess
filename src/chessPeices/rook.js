import { chessPeice } from "./chessPeice";

export const Rook = (peiceColor) => {
  const moveSet = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  const validateMove = function (gameboard, targetPosition) {
    // check if the target position is at least one of the potential target positions
    return (this.potentialNextMoves.some(move => targetPosition[0] == move[0] && targetPosition[1] == move[1]));
  }

  return Object.assign(
    chessPeice('rook', peiceColor, false),
    { moveSet, validateMove }
  )
}