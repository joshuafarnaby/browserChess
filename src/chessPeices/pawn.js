import { chessPeice } from "./chessPeice";

export const Pawn = function(peiceColor) {
  const moveSet = peiceColor == 'white' ? 
    [[-2, 0], [-1, -1], [-1, 0], [-1, 1]] : 
    [[2, 0], [1, -1], [1, 0], [1, 1]];

  const {
    movesMade,
    type,
    color,
    currentPosition,
    setCurrentPosition,
    potentialNextMoves,
    findLimitedMoves: setPotentialNextMoves,
    samePosition
  } = chessPeice('pawn', peiceColor);

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
      return !(targetSquare.color == color)
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

  const updateState = function () {
    this.movesMade += 1;

    if (movesMade == 1) {
      moveSet.shift()
    }
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
    validateMove,
    updateState
  }
}