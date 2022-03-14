import './styles/style.css'

import { pubsub } from './pubsub';
import { gameController } from './gameController';
import { moveSet } from './moveSet';
import { pathBuilder } from './pathBuilder';

const uiController = (() => {
  const gameboard = document.querySelectorAll('.board-square');
  const chessPeices = document.querySelectorAll('.chess-peice');
  const messages = document.getElementById('messages');

  const displayMessage = (msg) => {
    messages.innerText = msg;
    setTimeout(() => (messages.innerText = ''), 2000)
  }

  chessPeices.forEach(chessPeice => {
    chessPeice.addEventListener('click', (ev) => pubsub.publish('turnStart', ev.target));
  })

  pubsub.subscribe('wrongColor', displayMessage)

})();