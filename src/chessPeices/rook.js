import { chessPeice } from "./chessPeice";

export const Rook = (peiceColor) => {
  const moveSet = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  const validateMove = (gameboard, targetPosition) => {
    // check if the target position is at least one of the potential target positions
    return (potentialNextMoves.some(move => targetPosition[0] == move[0] && targetPosition[1] == move[1]));
  }

  const { 
    type,
    color,
    currentPosition,
    setCurrentPosition,
    potentialNextMoves,
    findUnlimitedMoves: setPotentialNextMoves,
    samePosition
  } = chessPeice('rook', peiceColor);

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