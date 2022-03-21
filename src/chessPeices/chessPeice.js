export const chessPeice = (type, color) => {
  const currentPosition = [];
  const potentialNextMoves = [];

  const outOfBounds = (n) => n < 0 || n > 7;

  const setCurrentPosition = function (newPosition) {
    this.currentPosition[0] = newPosition[0];
    this.currentPosition[1] = newPosition[1];
  }

  const findUnlimitedMoves = function (gameboard) {
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
        }

        currentRow = nextRow;
        currentCol = nextCol;
      }
    })
  }

  const findLimitedMoves = function (gameboard) {
    this.potentialNextMoves.length = 0;

    this.moveSet.forEach(move => {
      let nextRow = this.currentPosition[0] + move[0];
      let nextCol = this.currentPosition[1] + move[1];

      if (outOfBounds(nextRow) || outOfBounds(nextCol)) return;

      let nextPosition = gameboard[nextRow][nextCol];

      if (nextPosition != '') {
        if (nextPosition.color == this.color) {
          return
        } else {
          this.potentialNextMoves.push([nextRow, nextCol]);
        }
      } else {
        this.potentialNextMoves.push([nextRow, nextCol]);
      }
    })
  }

  const samePosition = function (targetPosition) {
    return this.currentPosition[0] == targetPosition[0] && this.currentPosition[1] == targetPosition[1]
  }

  return {
    type,
    color,
    outOfBounds,
    currentPosition,
    setCurrentPosition,
    potentialNextMoves,
    findUnlimitedMoves,
    findLimitedMoves,
    samePosition
  }
};