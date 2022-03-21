import { chessPeice } from "./chessPeice"

export const Bishop = function(peiceColor) {
  const moveSet = [[-1, -1], [-1, 1], [1, 1], [1, -1]];

  const { 
    movesMade,
    type,
    color,
    currentPosition,
    setCurrentPosition,
    potentialNextMoves,
    findUnlimitedMoves: setPotentialNextMoves,
    samePosition
  } = chessPeice('bishop', peiceColor);

  const validateMove = (gameboard, targetPosition) => {
    // check if the target position is at least one of the potential target positions
    return (potentialNextMoves.some(move => targetPosition[0] == move[0] && targetPosition[1] == move[1]));
  }

  return {
    movesMade,
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