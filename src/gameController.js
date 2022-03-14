import { pubsub } from "./pubsub";

export const gameController = (() => {
  let whiteTurn = true;
  let currentPlayer = 'black';

  const getPosition = (boardSquare) => {
    const x = boardSquare.getAttribute('data-x');
    const y = boardSquare.getAttribute('data-y');

    return [Number(x), Number(y)]
  }

  const handleTurnStart = (chessPeice) => {
    if (chessPeice.classList.contains(currentPlayer)) {
      // request move set
      // color = currentPlayer
      // const peiceType = chessPeice.getAttribute('data-type');
      // const position = getPosition(chessPeice.parentElement);

      const peiceData = {
        color: currentPlayer,
        type: chessPeice.getAttribute('data-type'),
        // position: chessPeice.parentElement,
        position: getPosition(chessPeice.parentElement),
      }

      pubsub.publish('requestMoves', peiceData)
    } else {
      pubsub.publish('wrongColor', 'You cannot select your opponents peice');
    }
  }

  pubsub.subscribe('turnStart', handleTurnStart)
})();