export const chessPeice = (type, color, limited) => {
  let movesMade = 0;
  const currentPosition = [];
  const potentialNextMoves = [];

  const outOfBounds = (n) => n < 0 || n > 7;

  const setCurrentPosition = function (newPosition) {
    this.currentPosition[0] = newPosition[0];
    this.currentPosition[1] = newPosition[1];
  }

  const setPotentialNextMoves = function (gameboard) {
    this.potentialNextMoves.length = 0;
    
    this.moveSet.forEach(move => {
      let currentRow = this.currentPosition[0];
      let currentCol = this.currentPosition[1];
      let nextRow;
      let nextCol;
      let nextPosition;

      while (true) {
        nextRow = currentRow + move[0];
        nextCol = currentCol + move[1];

        if (outOfBounds(nextRow) || outOfBounds(nextCol)) break

        nextPosition = gameboard[nextRow][nextCol];

        if (nextPosition != '') {
          if (nextPosition.color == this.color) {
            break;
          } else {
            this.potentialNextMoves.push([nextRow, nextCol]);
            break;
          }
        } else {
          this.potentialNextMoves.push([nextRow, nextCol]);

          if (this.limited) {
            break
          } else {
            currentRow = nextRow;
            currentCol = nextCol;
          }
        }
      }
    })
  }

  // this should belong to the gameController
  const samePosition = function (targetPosition) {
    return this.currentPosition[0] == targetPosition[0] && this.currentPosition[1] == targetPosition[1]
  }

  return {
    movesMade,
    type,
    color,
    limited,
    currentPosition,
    potentialNextMoves,
    outOfBounds,
    setCurrentPosition,
    setPotentialNextMoves,
    samePosition
  }
};