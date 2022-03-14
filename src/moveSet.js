import { pubsub } from "./pubsub";

export const moveSet = (() => {
  // const ROOK_MOVE_SET = [[0, 1], [1, 1], [0, -1], [-1, -1]];

  const MOVE_SETS = {
    rook: [[0, 1], [1, 1], [0, -1], [-1, -1]],
  }

  const getMoveSet = (peiceData) => {
    // if (peiceData.type == 'rook') pubsub.publish() ROOK_MOVE_SET
    console.log(MOVE_SETS[peiceData.type]);
    peiceData['moves'] = MOVE_SETS[peiceData.type];
    console.log(peiceData);
  }

  pubsub.subscribe('requestMoves', getMoveSet);
  
})();