import { chessPeice } from "./chessPeice";

export const Queen = function(peiceColor) {
  const color = peiceColor;
  const currentPosition = [];
  const type = 'Queen';

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
      let currentRow = currentPosition[0];
      let currentCol = currentPosition[1];
      let nextRow;
      let nextCol;
      let nextPosition;

      while (true) {
        nextRow = currentRow + move[0];
        nextCol = currentCol + move[1];

        if (outOfBounds(nextRow) || outOfBounds(nextCol)) break

        nextPosition = gameboard[nextRow][nextCol];

        if (nextPosition != '') {
          if (nextPosition.getColor() == color) {
            break;
          } else {
            potentialNextMoves.push([nextRow, nextCol]);
            break;
          }
        } else {
          potentialNextMoves.push([nextRow, nextCol]);
        }

        currentRow = nextRow;
        currentCol = nextCol;
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