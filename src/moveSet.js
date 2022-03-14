import { pubsub } from "./pubsub";

export const moveSet = (() => {
  // const ROOK_MOVE_SET = [[0, 1], [1, 1], [0, -1], [-1, -1]];

  const MOVE_SETS = {
    rook: [[0, 1], [1, 0], [0, -1], [-1, 0]],
  }

  const getMoveSet = (peiceData) => {
    peiceData['moves'] = MOVE_SETS[peiceData.type];
    pubsub.publish('movesAquired', peiceData)
  }

  pubsub.subscribe('requestMoves', getMoveSet);
  
})();