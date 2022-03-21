import { chessPeice } from "./chessPeice";

export const Knight = function(peiceColor) {
  const moveSet = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]];

  const {
    type,
    color,
    currentPosition,
    setCurrentPosition,
    potentialNextMoves,
    findLimitedMoves: setPotentialNextMoves,
    samePosition
  } = chessPeice('knight', peiceColor);

  const validateMove = (gameboard, targetPosition) => {
    // check if the target position is at least one of the potential target positions
    return (potentialNextMoves.some(move => targetPosition[0] == move[0] && targetPosition[1] == move[1]));
  }

  return {
    type,
    color,
    moveSet,
    currentPosition,
    setCurrentPosition,
    potentialNextMoves,
    setPotentialNextMoves,
    samePosition,
    validateMove
  }
}