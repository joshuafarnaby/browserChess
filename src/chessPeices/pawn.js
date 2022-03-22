import { chessPeice } from "./chessPeice";

export const Pawn = (peiceColor) => {
  const moveSet = peiceColor == 'white' ? 
    [[-2, 0], [-1, -1], [-1, 0], [-1, 1]] : 
    [[2, 0], [1, -1], [1, 0], [1, 1]];

  const validateAdvancement = function (gameboard, targetPosition) {
    const targetSquare = gameboard[targetPosition[0]][targetPosition[1]];

    if (Math.abs(this.currentPosition[0] - targetPosition[0] == 2)) {
      const intermediateRow = (this.currentPosition[0] + targetPosition[0]) / 2;
      const intermediateSquare = gameboard[intermediateRow][targetPosition[1]];

      return intermediateSquare == '' && targetSquare == ''
    } else {
      return targetSquare == ''
    }
  }

  const validateCapture = function (gameboard, targetPosition) {
    const targetSquare = gameboard[targetPosition[0]][targetPosition[1]];

    if (targetSquare == '') {
      // en passant validation will go here
      return false
    } else {
      return !(targetSquare.color == this.color)
    }
  }

  const validateMove = function (gameboard, targetPosition) {
    // check if the target position is at least one of the potential target positions
    if (!this.potentialNextMoves.some(move => targetPosition[0] == move[0] && targetPosition[1] == move[1])) {
      return false
    }

    if (this.currentPosition[1] == targetPosition[1]) {
      return validateAdvancement.call(this, gameboard, targetPosition)
    } else {
      return validateCapture.call(this, gameboard, targetPosition)
    }
  } 

  const updateState = function () {
    this.movesMade++;

    if (this.movesMade == 1) {
      moveSet.shift()
    }
  }

  return Object.assign(
    chessPeice('pawn', peiceColor, true),
    { moveSet, validateMove, updateState },
  )
}