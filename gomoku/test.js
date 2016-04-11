'use strict';
const ChessData = require('./ChessData');
const Pieces = require('./Pieces');
const Player = require('./Player');
var cd = new ChessData();
var p1 = new Player(cd, 1, 'P1');
var p2 = new Player(cd, 2, 'P2');

var run = function (count) {
  console.log('start:' + count);
  cd.reset();
  p1.reset();
  p2.reset();
  var timmer = setInterval(function () {

    if (p1.move()) {
      console.log('end' + count);
      clearInterval(timmer);
      if (count) {
        run(--count);
      }
      return;
    }
    if (p2.move()) {
      console.log('end' + count);
      clearInterval(timmer);
      if (count) {
        run(--count)
      }
      return;
    }
  }, 10);
}
setTimeout(function () {
    run(process.argv[2] || 1);
}, 1000);

// process.exit(0);
