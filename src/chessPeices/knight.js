import { chessPeice } from "./chessPeice";

export const Knight = function(peiceColor) {
  const color = peiceColor;
  const currentPosition = [];
  const type = 'knight';

  const MOVE_SET = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]];
  const potentialNextMoves = [];

  // const outOfBounds = (n) => n < 0 || n > 7;
  const { 
    outOfBounds,
  } = chessPeice;

  const getColor = () => color;

  const getType = () => type;

  const getCurrentPosition = () => currentPosition;
  const setCurrentPosition = (newPosition) => {
    currentPosition[0] = newPosition[0];
    currentPosition[1] = newPosition[1];
  }

  const getPotentialNextMoves = () => potentialNextMoves;
  const setPotentialNextMoves = (gameboard) => {
    potentialNextMoves.length = 0;

    MOVE_SET.forEach(move => {
      let nextRow = currentPosition[0] + move[0];
      let nextCol = currentPosition[1] + move[1];

      if (outOfBounds(nextRow) || outOfBounds(nextCol)) return;

      let nextPosition = gameboard[nextRow][nextCol];

      if (nextPosition != '') {
        if (nextPosition.getColor() == color) {
          return
        } else {
          potentialNextMoves.push([nextRow, nextCol]);
        }
      } else {
        potentialNextMoves.push([nextRow, nextCol]);
      }
    })
  }

  const samePosition = (targetPosition) => {
    return currentPosition[0] == targetPosition[0] && currentPosition[1] == targetPosition[1]
  }

  const validateMove = (gameboard, targetPosition) => {
    // check if the target position is at least one of the potential target positions
    return (potentialNextMoves.some(move => targetPosition[0] == move[0] && targetPosition[1] == move[1]));
  }


  return {
    getColor,
    getType,
    getCurrentPosition,
    setCurrentPosition,
    getPotentialNextMoves,
    setPotentialNextMoves,
    samePosition,
    validateMove
  }
}