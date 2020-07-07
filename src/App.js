import React, { useState, useEffect, useRef } from 'react';
import './App.scss';

import Pacman from './img/pacman.png';
import Wall from './img/wall.png';
import Ghost1 from './img/ghost1.png';
import Ghost2 from './img/ghost2.png';
import Coin from './img/coin.png';
import Bg from './img/bg.png';



function App() {
  const [up, setUp] = useState(2);
  const [left, setLeft] = useState(3);

  const pacman = {
    y: up,
    x: left
  }

  // wall - 1
  // coin - 2
  // bg - 3
  // pacman - 4

  const movePacman = event => {
    const keyCode = event.keyCode;
    console.log(keyCode);

    if (keyCode === 37) {
      console.log(board)
      board[pacman.y][pacman.x - 1] = 3;
      setLeft(pacman.x - 1);
      console.log(board)
    }


    // switch (keyCode) {
    //   case 37:
    //     setLeft(left - 1)
    //     break;
    //   case 38:
    //     break;
    //   case 39:
    //     break;
    //   case 40:
    //     break;
    //   default:
    //     console.log(keyCode)
  }

  useEffect(() => {
    document.addEventListener("keydown", movePacman, false);

    return () => {
      document.removeEventListener("keydown", movePacman, false);
    };
  });

  const board = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 1, 2, 1, 2, 1],
    [1, 2, 2, 4, 2, 2, 1],
    [1, 2, 1, 2, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ]

  function renderBoard(number, element) {
    if (number === 1) return <img src={Wall} alt='' />;
    else if (number === 2) return <img src={Coin} alt='' />
    else if (number === 3) return <img src={Bg} alt='' />
    else if (number === 4) return <img src={Pacman} alt='' />
    else return console.log('chuj')
  }

  return (
    <div className="game">
      {board.map(element => element.map(thing => renderBoard(thing, element)))}
    </div>
  );
}

export default App;



/* <img src={Pacman} />
      <img src={Wall} />
      <img src={Ghost1} />
      <img src={Ghost2} />
      <img src={Coin} />
      <img src={Bg} /> */


/*
 const movePacman = event => {
    const keyCode = event.keyCode;
    const pacmanPosition = pacmanRef.current.getBoundingClientRect();
    const pacmanLeft = pacmanPosition.left;
    const pacmanTop = pacmanPosition.top;

    switch (keyCode) {
      case 37:
        if (checkMovePosibility(pacmanLeft - 50)) setLeft(pacmanLeft - 50);
        break;
      case 38:
        if (checkMovePosibility(pacmanTop - 50)) setTop(pacmanTop - 50);
        break;
      case 39:
        if (checkMovePosibility(pacmanLeft + 50)) setLeft(pacmanLeft + 50);
        break;
      case 40:
        if (checkMovePosibility(pacmanTop + 50)) setTop(pacmanTop + 50);
        break;
      default:
        console.log(keyCode)
    }
  }

  useEffect(() => {
        document.addEventListener("keydown", movePacman, false);

    return () => {
        document.removeEventListener("keydown", movePacman, false);
    };
  });
  */

/*
useEffect(() => {
        document.addEventListener("keydown", movePacman, false);
});
*/