import { pubsub } from "./pubsub";

export const gameController = (() => {
  let whiteTurn = true;
  let currentPlayer = 'white';

  const validateTurnStart = (obj) => {
    if (obj.color != currentPlayer) {
      pubsub.publish('gameError', 'You cannot select your opponents peice');
    } else {
      // valid turn start - move to 2nd stage
    }
  }

  pubsub.subscribe('turnInitiated', validateTurnStart);
})();