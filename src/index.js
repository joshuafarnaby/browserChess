import './styles/style.css'

import { pubsub } from './pubsub';
import { gameController } from './gameController';

import { Rook } from './chessPeices/rook';
import { knight } from './chessPeices/knight';
import { Bishop } from './chessPeices/bishop';

const uiDisplay = (() => {
  const gameboard = document.querySelectorAll('.board-square');
  const chessPeices = document.querySelectorAll('.chess-peice');
  const messages = document.getElementById('messages');

  let elementToMove;

  const initialiseBoard = () => {
    gameboard.forEach(square => {
      square.removeEventListener('click', initiateMove)
    })
  
    chessPeices.forEach(chessPeice => {
      chessPeice.addEventListener('click', initiateTurn);
    })

    elementToMove = null;
  }

  const initiateTurn = (ev) => {
    ev.stopPropagation();

    const selectedPeice = ev.target;
    // const color = selectedPeice.getAttribute('data-color')
    const position = [
      +selectedPeice.parentElement.getAttribute('data-row'),
      +selectedPeice.parentElement.getAttribute('data-col')
    ];

    pubsub.publish('turnInitiated', { position });
    // pubsub.publish('turnInitiated', {color, position});
  }

  const initiateMove = (ev) => {
    ev.stopPropagation();

    const selectedSqaure = ev.target.localName == 'p' ? 
      ev.target.parentElement :
      ev.target;

    const position = [ 
      +selectedSqaure.getAttribute('data-row'),
      +selectedSqaure.getAttribute('data-col')
    ]

    pubsub.publish('moveInitiated', position);
  }

  const executeMove = (moveData) => {
    // make sure this can be extended to cover castling, en passant etc.
    const target = document.querySelector(`[data-row="${moveData.targetPosition[0]}"][data-col="${moveData.targetPosition[1]}"]`);

    if (moveData.mode == 'capture') {
      target.removeChild(target.firstChild);
    }

    target.appendChild(elementToMove);
    
    elementToMove.classList.remove('highlight');

    initialiseBoard();
  }

  const prepareBoardForMove = (data) => {
    // remove event listeners so another turn isn't initiated
    chessPeices.forEach(chessPeice => {
      chessPeice.removeEventListener('click', initiateTurn);
    })

    // highlight peice to move
    elementToMove = document.querySelector(`[data-row="${data.currentPosition[0]}"][data-col="${data.currentPosition[1]}"]`).firstChild;
    elementToMove.classList.add('highlight');

    gameboard.forEach(square => {
      square.addEventListener('click', initiateMove)
    })
  }

  const displayMessage = (msg) => {
    messages.innerText = msg;
    setTimeout(() => (messages.innerText = ''), 2000);
  }

  const turnCancel = () => {
    elementToMove.classList.remove('highlight');
    displayMessage('You have cancelled that move - select another peice');
    initialiseBoard();
  }

  initialiseBoard()

  pubsub.subscribe('gameError', displayMessage);
  pubsub.subscribe('validTurnStart', prepareBoardForMove);
  pubsub.subscribe('executeMove', executeMove);
  pubsub.subscribe('turnCancelled', turnCancel)
})();