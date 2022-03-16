import './styles/style.css'

import { pubsub } from './pubsub';
import { gameController } from './gameController';
import { moveSet } from './moveSet';
import { pathBuilder } from './pathBuilder'; 

import { chessPeice } from './chessPeices/chessPeice';
import { Rook } from './chessPeices/rook';

const uiController = (() => {
  const gameboard = document.querySelectorAll('.board-square');
  const chessPeices = document.querySelectorAll('.chess-peice');
  const messages = document.getElementById('messages');

  const initiateTurn = (ev) => {
    const selectedPeice = ev.target;
    const color = selectedPeice.getAttribute('data-color')
    const position = [
      selectedPeice.parentElement.getAttribute('data-x') - 1,
      selectedPeice.parentElement.getAttribute('data-y') - 1
    ];

    selectedPeice.classList.add('highlight')
    pubsub.publish('turnInitiated', {color, position});
  }

  const displayMessage = (msg) => {
    messages.innerText = msg;
    setTimeout(() => (messages.innerText = ''), 2000);
  }

  chessPeices.forEach(chessPeice => {
    chessPeice.addEventListener('click', initiateTurn);
  })

  pubsub.subscribe('gameError', displayMessage)
})();