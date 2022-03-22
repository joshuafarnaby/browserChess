import { chessPeice } from "./chessPeice"

export const Bishop = (peiceColor) => {
  const moveSet = [[-1, -1], [-1, 1], [1, 1], [1, -1]];

  const validateMove = function (gameboard, targetPosition) {
    // check if the target position is at least one of the potential target positions
    return (this.potentialNextMoves.some(move => targetPosition[0] == move[0] && targetPosition[1] == move[1]));
  }

  // const { 
  //   movesMade,
  //   type,
  //   color,
  //   currentPosition,
  //   setCurrentPosition,
  //   potentialNextMoves,
  //   findUnlimitedMoves: setPotentialNextMoves,
  //   samePosition
  // } = chessPeice('bishop', peiceColor, false);


  // return {
  //   movesMade,
  //   type,
  //   color,
  //   moveSet,
  //   currentPosition,
  //   setCurrentPosition,
  //   potentialNextMoves,
  //   setPotentialNextMoves,
  //   samePosition,
  //   validateMove
  // }

  return Object.assign(
    chessPeice('bishop', peiceColor, false),
    { moveSet, validateMove }
  )
}