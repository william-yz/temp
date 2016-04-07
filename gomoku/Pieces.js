'use strict';


function Pieces(x, y, chess) {
  if(typeof x === 'object'){
    y = x.y;
    x = x.x;
    chess = y;
  }
  this.x = x;
  this.y = y;
  this.chess = chess;
}
Pieces.prototype.eq = function(x, y) {
  if(typeof x === 'object'){
    y = x.y;
    x = x.x;
  }
  return this.x === x && this.y === y;
}

module.exports = Pieces;
