export const gameboard = (() => {
  const gameboardContainer = document.createElement('div');
  gameboardContainer.classList.add('gameboard');

  let white = true
  let color;

  for (let i = 0; i < 64; i++) {
    white ? color = 'white' : color = 'black';

    const boardSquare = document.createElement('div');
    
    boardSquare.setAttribute('class', `board-square ${color}`)

    gameboardContainer.appendChild(boardSquare);

    if ((i + 1) % 8 == 0) continue;

    white = !white
  }

  const render = () => document.body.appendChild(gameboardContainer);

  return {
    render
  }
})();