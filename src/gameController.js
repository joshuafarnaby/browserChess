import { pubsub } from "./pubsub";
import { gboard } from "./gameboard";

export const gameController = (() => {
  let _whiteTurn = true;
  let _currentPlayer;
  let _currentMovingPeice = null;

  const _graveyard = [];

  const { gameboard } = gboard;

  const cancelTurn = () => {
    pubsub.publish('turnCancelled');
    _currentMovingPeice = null;
  }

  const executeMove = (targetPosition) => {
    const currentPosition = _currentMovingPeice.currentPosition;
    let mode;
    
    if (gameboard[targetPosition[0]][targetPosition[1]]) {
      _graveyard.push(gameboard[targetPosition[0]][targetPosition[1]]);
      mode = 'capture'
    } else {
      mode = 'standard'
    }
    
    gameboard[targetPosition[0]][targetPosition[1]] = _currentMovingPeice;
    gameboard[currentPosition[0]][currentPosition[1]] = '';

    if (_currentMovingPeice.type == 'pawn') {
      _currentMovingPeice.updateState();
    }
  
    pubsub.publish('executeMove', { mode, currentPosition, targetPosition });
    
    _whiteTurn = !_whiteTurn;
    initialiseBoard();
  }

  const validateTurnStart = (obj) => {
    const selectedPeice = gameboard[obj.position[0]][obj.position[1]];
    const potentialNextMoves = selectedPeice.potentialNextMoves;

    if (selectedPeice.color != _currentPlayer) {
      pubsub.publish('gameError', `You cannot select that peice - it is ${_currentPlayer}'s turn to move`);
    } else if (potentialNextMoves.length == 0) {
      // peice currently cannot move because it is blocked
      pubsub.publish('gameError', 'The selected peice is currently blocked from moving - select another')
    } else {
      // player has selected a valid peice to move
      _currentMovingPeice = selectedPeice;
      const turnData = {
        currentPosition: selectedPeice.currentPosition
      };

      pubsub.publish('validTurnStart', turnData);
    }
  }

  const validateMove = (targetPosition) => {
    if (_currentMovingPeice.samePosition(targetPosition)) {
      cancelTurn()
    } else if (_currentMovingPeice.validateMove(gameboard, targetPosition)) {
      executeMove(targetPosition);
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