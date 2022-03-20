import { chessPeice } from "./chessPeice";

export const Pawn = function(peiceColor) {
  const color = peiceColor;
  let movesMade = 0;
  const currentPosition = [];
  const type = 'pawn';

  const MOVE_SET = color == 'white' ? 
    [[-2, 0], [-1, -1], [-1, 0], [-1, 1]] : 
    [[2, 0], [1, -1], [1, 0], [1, 1]];
  
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

  const validateAdvancement = (gameboard, targetPosition) => {
    const targetSquare = gameboard[targetPosition[0]][targetPosition[1]];

    if (Math.abs(currentPosition[0] - targetPosition[0] == 2)) {
      const intermediateRow = (currentPosition[0] + targetPosition[0]) / 2;
      const intermediateSquare = gameboard[intermediateRow][targetPosition[1]];

      return intermediateSquare == '' && targetSquare == ''
    } else {
      return targetSquare == ''
    }
  }

  const validateCapture = (gameboard, targetPosition) => {
    const targetSquare = gameboard[targetPosition[0]][targetPosition[1]];

    if (targetSquare == '') {
      // en passant validation will go here
      return false
    } else {
      console.log(!targetSquare.getColor() == color);
      return !(targetSquare.getColor() == color)
    }
  }

  const validateMove = (gameboard, targetPosition) => {
    // check if the target position is at least one of the potential target positions
    if (!potentialNextMoves.some(move => targetPosition[0] == move[0] && targetPosition[1] == move[1])) {
      return false
    }

    if (currentPosition[1] == targetPosition[1]) {
      return validateAdvancement(gameboard, targetPosition)
    } else {
      return validateCapture(gameboard, targetPosition)
    }
  } 

  const samePosition = (targetPosition) => {
    return currentPosition[0] == targetPosition[0] && currentPosition[1] == targetPosition[1]
  }

  const updateState = () => {
    movesMade += 1;

    if (movesMade == 1) {
      MOVE_SET.shift()
    }
  }

  return {
    getColor,
    getType,
    getCurrentPosition,
    setCurrentPosition,
    getPotentialNextMoves,
    setPotentialNextMoves,
    updateState,
    validateMove,
    samePosition
  }
}