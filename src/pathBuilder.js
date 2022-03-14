import { pubsub } from "./pubsub";

export const pathBuilder = (() => {
  const outOfBounds = (num) => {
    return num < 1 || num > 8
  }

  const pathHandler = (peiceData) => {
    // let startPosition = document.querySelector(`[data-x='${peiceData.position[0]}'][data-y='${peiceData.position[1]}']`);

    console.log(peiceData);

    const startingPostion = peiceData.position;
    const moveSet = peiceData.moves;
    const color = peiceData.color;

    const potentialSquares = [];

    moveSet.forEach(move => {
      let currentX = startingPostion[0];
      let currentY = startingPostion[1];

      let nextX;
      let nextY;

      let nextSquare;

      while (true) {
        nextX = currentX + move[0];
        nextY = currentY + move[1];

        console.log(nextX, nextY);

        if (outOfBounds(nextX) || outOfBounds(nextY)) break;

        nextSquare = document.querySelector(`[data-x="${nextX}"][data-y="${nextY}"]`);


        if (nextSquare.firstChild) {
          if (nextSquare.firstChild.classList.contains(color)) {
            break
          } else {
            potentialSquares.push(nextSquare)
          }
        } else {
          potentialSquares.push(nextSquare);
        }

        currentX = nextX;
        currentY = nextY;
      }
    })

    potentialSquares.forEach(square => square.style.backgroundColor = 'red');

  }

  pubsub.subscribe('movesAquired', pathHandler)
})();