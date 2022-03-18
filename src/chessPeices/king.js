import { chessPeice } from "./chessPeice";


export const King = function(peiceColor) {
  const color = peiceColor;
  const currentPosition = [];
  const type = 'King';

  const MOVE_SET = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  const potentialNextMoves = [];

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

  return {
    getColor,
    getType,
    getCurrentPosition,
    setCurrentPosition,
    getPotentialNextMoves,
    setPotentialNextMoves
  }
}