'use strict';

const ChessData = require('../ChessData');
const Pieces = require('../Pieces');
var cd = new ChessData();

cd.reset().then(function (db) {
  console.log('done');
  for (var i = 0; i < 15; i ++) {
    var n = i % 2 === 0 ? 2 : 1;
    var p = new Pieces((n + i)/2, n, n);
    if (cd.move(p)) {
      break;
    }
    console.log(cd.getString());
  }
  console.log(cd.getString());
  db.close();
})
