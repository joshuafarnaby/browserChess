import { pubsub } from "./pubsub";

import { Rook } from "./chessPeices/rook";

export const gameController = (() => {
  let whiteTurn = true;
  let currentPlayer;
  let currentMovingPeice = null;

  const wr1 = Rook('white');
  const wr2 = Rook('white');

  const br1 = Rook('black');

  const gameboard = [
    [br1, '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    [wr1, '', '', '', '', '', '', wr2]
  ];

  const executeMove = (targetPosition) => {
    const currentPosition = currentMovingPeice.getCurrentPosition();

    gameboard[targetPosition[0]][targetPosition[1]] = currentMovingPeice;
    gameboard[currentPosition[0]][currentPosition[1]] = ''

    pubsub.publish('moveExecuted', { currentPosition, targetPosition });

    whiteTurn = !whiteTurn;
    initialiseBoard();
  }

  const validateTurnStart = (obj) => {
    const selectedPeice = gameboard[obj.position[0]][obj.position[1]];
    const potentialNextMoves = selectedPeice.getPotentialNextMoves();

    if (selectedPeice.getColor() != currentPlayer) {
      pubsub.publish('gameError', 'You cannot select your opponents peice');
    } else if (potentialNextMoves.length == 0) {
      // peice currently cannot move because it is blocked
      pubsub.publish('gameError', 'The selected peice is currently blocked from moving - select another')
    } else {
      // player has selected a valid peice to move
      currentMovingPeice = selectedPeice;

      const turnData = {
        currentPosition: selectedPeice.getCurrentPosition()
      };

      pubsub.publish('validTurnStart', turnData);
    }
  }

  const validateMove = (selectedPosition) => {
    const validPositions = currentMovingPeice.getPotentialNextMoves();
    let validMove = false;

    validPositions.forEach(position => {
      if (position[0] == selectedPosition[0] && position[1] == selectedPosition[1]) {
        validMove = true
      }
    })

    if (validMove) {
      executeMove(selectedPosition);
    } else {
      pubsub.publish('gameError', 'That move is invalid')
    }
  }

  const initialiseBoard = () => {
    gameboard.forEach((row, i, gboard) => {
      row.forEach((peice, j)=> {
        if (peice == '') return

        peice.setCurrentPosition([i, j]);
        peice.setPotentialNextMoves(gboard);
      })
    })

    currentPlayer = whiteTurn ? 'white' : 'black';
    currentMovingPeice = null;
  }

  initialiseBoard();

  pubsub.subscribe('turnInitiated', validateTurnStart);
  pubsub.subscribe('moveInitiated', validateMove)
})();