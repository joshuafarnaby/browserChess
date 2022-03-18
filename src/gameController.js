import { pubsub } from "./pubsub";

import { Rook } from "./chessPeices/rook";

export const gameController = (() => {
  let _whiteTurn = true;
  let _currentPlayer;
  let _currentMovingPeice = null;

  const _graveyard = [];

  const wr1 = Rook('white');
  const wr2 = Rook('white');

  const br1 = Rook('black');
  const br2 = Rook('black');

  const gameboard = [
    [br1, '', '', '', '', '', '', br2],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    [wr1, '', '', '', '', '', '', wr2]
  ];

  const cancelTurn = () => {
    pubsub.publish('turnCancelled');
    _currentMovingPeice = null;
  }

  const executeMove = (targetPosition) => {
    const currentPosition = _currentMovingPeice.getCurrentPosition();
    let mode;
    
    if (gameboard[targetPosition[0]][targetPosition[1]]) {
      _graveyard.push(gameboard[targetPosition[0]][targetPosition[1]]);
      mode = 'capture'
    } else {
      mode = 'standard'
    }
    
    gameboard[targetPosition[0]][targetPosition[1]] = _currentMovingPeice;
    gameboard[currentPosition[0]][currentPosition[1]] = ''
  
    pubsub.publish('executeMove', { mode, currentPosition, targetPosition });
    
    _whiteTurn = !_whiteTurn;
    initialiseBoard();
  }

  const validateTurnStart = (obj) => {
    const selectedPeice = gameboard[obj.position[0]][obj.position[1]];
    const potentialNextMoves = selectedPeice.getPotentialNextMoves();

    if (selectedPeice.getColor() != _currentPlayer) {
      pubsub.publish('gameError', 'You cannot select your opponents peice');
    } else if (potentialNextMoves.length == 0) {
      // peice currently cannot move because it is blocked
      pubsub.publish('gameError', 'The selected peice is currently blocked from moving - select another')
    } else {
      // player has selected a valid peice to move
      _currentMovingPeice = selectedPeice;

      const turnData = {
        currentPosition: selectedPeice.getCurrentPosition()
      };

      pubsub.publish('validTurnStart', turnData);
    }
  }

  const validateMove = (selectedPosition) => {
    const currentPosition = _currentMovingPeice.getCurrentPosition();

    if (currentPosition[0] == selectedPosition[0] && currentPosition[1] == selectedPosition[1]) {
      cancelTurn();
      return
    }

    const validPositions = _currentMovingPeice.getPotentialNextMoves();
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

    _currentPlayer = _whiteTurn ? 'white' : 'black';
    _currentMovingPeice = null;
  }

  initialiseBoard();

  pubsub.subscribe('turnInitiated', validateTurnStart);
  pubsub.subscribe('moveInitiated', validateMove)
})();