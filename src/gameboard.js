import { King } from "./chessPeices/king";
import { Queen } from "./chessPeices/queen";
import { Rook } from "./chessPeices/rook";
import { Knight } from "./chessPeices/knight";
import { Bishop } from "./chessPeices/bishop";
import { Pawn } from "./chessPeices/pawn";

export const gboard = (() => {
  const wk = King('white');
  const wq = Queen('white')
  const wr1 = Rook('white');
  const wr2 = Rook('white');
  const wk1 = Knight('white');
  const wk2 = Knight('white');
  const wb1 = Bishop('white');
  const wb2 = Bishop('white');
  const wp1 = Pawn('white');

  const bk = King('black');
  const bq = Queen('black');
  const br1 = Rook('black');
  const br2 = Rook('black');
  const bk1 = Knight('black');
  const bk2 = Knight('black');
  const bb1 = Bishop('black');
  const bb2 = Bishop('black');

  const gameboard = [
    [br1, bk1, bb1, bq, bk, bb2, bk2, br2],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    [wp1, '', '', '', '', '', '', ''],
    [wr1, wk1, wb1, wq, wk, wb2, wk2, wr2]
  ];

  return {
    gameboard
  }
})();