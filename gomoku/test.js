'use strict';
const ChessData = require('./ChessData');
const Pieces = require('./Pieces');
const Player = require('./Player');
var cd = new ChessData();
cd.reset();
var p1 = new Player(cd, 1);
var p2 = new Player(cd, 2);

var timmer = setInterval(function () {
  if (p1.move()) {
    clearInterval(timmer);
    console.log('p1 win.');
    return;
  }
  if (p2.move()) {
    clearInterval(timmer);
    console.log('p2 win.');
    return;
  }
}, 100);
