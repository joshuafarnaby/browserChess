import { pubsub } from "./pubsub";

export const pathBuilder = (() => {
  const outOfBounds = (num) => {
    return num < 1 || num > 8
  }

  const pathHandler = (peiceData) => {
    const potentialSquares = [];

    peiceData.moves.forEach(move => {
      let currentX = peiceData.position[0];
      let currentY = peiceData.position[1];

      let nextX;
      let nextY;

      let nextSquare;

      while (true) {
        nextX = currentX + move[0];
        nextY = currentY + move[1];

        if (outOfBounds(nextX) || outOfBounds(nextY)) break;

        nextSquare = document.querySelector(`[data-x="${nextX}"][data-y="${nextY}"]`);

        if (nextSquare.firstChild) {
          if (nextSquare.firstChild.classList.contains(peiceData.color)) {
            break;
          } else {
            potentialSquares.push(nextSquare);
          }
        } else {
          potentialSquares.push(nextSquare);
        }

        currentX = nextX;
        currentY = nextY;
      }
    })

    peiceData.potentialSquares = potentialSquares;

    pubsub.publish('squaresFound', peiceData);
    // potentialSquares.forEach(square => square.style.backgroundColor = 'red');
  }

  pubsub.subscribe('movesAquired', pathHandler)
})();