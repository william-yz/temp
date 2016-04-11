'use strict';
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/gomoku';
const _ = require('lodash');

const Pieces = require('./Pieces');
class ChessData {
  constructor() {
    MongoClient.connect(url, (err, d) => {
      this.db = d;
      console.log('ChessData db connected');
    });
  }

  reset() {
    var chessboard = new Array(15);
    for (var x = 0; x < 15; x++) {
        chessboard[x] = new Array(15);
        for (var y = 0; y < 15; y++) {
            chessboard[x][y] = 0;
        }
    }

    this.chessboard = chessboard;
    this.last = null;
    this.count = 0;
    this.key = moment().format('YYYYMMDDHHmmssSSS');

  }

  move(pieces) {
    this.chessboard[pieces.x][pieces.y] = pieces.chess;
    this.count ++;
    this.last = pieces;
    this.save();
    var result = this.judge();
    if (result !== null) {
      this.update(pieces.chess);
    }
    return result === null ? 0 : result.chess;
  }

  getString() {
    var str = '';
    this.chessboard.forEach(i => {
      i.forEach(j => {
        str += j;
      });
    });
    return str;
  }

  getForecastString(pieces) {
    var str = '';
    this.chessboard[pieces.x][pieces.y] = pieces.chess;
    this.chessboard.forEach(i => {
      i.forEach(j => {
        str += j;
      });
    });
    this.chessboard[pieces.x][pieces.y] = 0;
    return str;
  }

  save() {
    var col = this.db.collection('stores');
    col.insert({key : this.key, data : this.getString(), count : this.count}, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  update(chess) {
    var col = this.db.collection('stores');
    col.updateMany({key: this.key}, {$set : {chess : chess}}, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  suppose(pieces, cb) {
    var pre = this.last;
    this.chessboard[pieces.x][pieces.y] = pieces.chess;
    this.count ++;
    this.last = pieces;
    cb();
    this.chessboard[pieces.x][pieces.y] = 0;
    this.count --;
    this.last = pre;
  }

  judge(n) {
    if (!n && this.count < 9 || !this.last) {
      return null;
    }
    if (!n) {
      n = 5;
    }
    var x = this.last.x,
        y = this.last.y,
        chess = this.last.chess;
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    var edge1 = [];
    var edge2 = [];
    var edge3 = [];
    var edge4 = [];

    for (var i = x; i >= 0; i--) {
      if (this.chessboard[i][y] != chess) {
        if (this.chessboard[i][y] == 0) {
          edge1.push(new Pieces(i, y, chess ^ 3));
        }
        break;
      }
      count1++;
    }
    for (var i = x + 1; i < 15; i++) {
      if (this.chessboard[i][y] != chess) {
        if (this.chessboard[i][y] == 0) {
          edge1.push(new Pieces(i, y, chess ^ 3));
        }
        break;
      }
      count1++;
    }
    if (count1 >= n) {
      return {edge : edge1, chess : chess};
    }
    //上下判断
    for (var i = y; i >= 0; i--) {
      if (this.chessboard[x][i] != chess) {
        if (this.chessboard[x][i] == 0) {
          edge2.push(new Pieces(x, i, chess ^ 3));
        }
        break;
      }
      count2++;
    }
    for (var i = y + 1; i < 15; i++) {
      if (this.chessboard[x][i] != chess) {
        if (this.chessboard[x][i] == 0) {
          edge2.push(new Pieces(x, i, chess ^ 3));
        }
        break;
      }
      count2++;
    }
    if (count2 >= n) {
      return {edge : edge2, chess : chess};
    }
    //左上右下判断
    for (var i = x, j = y; i >= 0 && j >= 0; i--, j--) {
      if (this.chessboard[i][j] != chess) {
        if (this.chessboard[i][j] == 0) {
          edge3.push(new Pieces(i, j, chess ^ 3));
        }
        break;
      }
      count3++;
    }
    for (var i = x + 1, j = y + 1; i < 15 && j < 15; i++, j++) {
      if (this.chessboard[i][j] != chess) {
        if (this.chessboard[i][j] == 0) {
          edge3.push(new Pieces(i, j, chess ^ 3));
        }
        break;
      }
      count3++;
    }
    if (count3 >= n) {
      return {edge : edge3, chess : chess};
    }
    //右上左下判断
    for (var i = x, j = y; i >= 0 && j < 15; i--, j++) {
      if (this.chessboard[i][j] != chess) {
        if (this.chessboard[i][j] == 0) {
          edge4.push(new Pieces(i, j, chess ^ 3));
        }
        break;
      }
      count4++;
    }
    for (var i = x + 1, j = y - 1; i < 15 && j >= 0; i++, j--) {
      if (this.chessboard[i][j] != chess) {
        if (this.chessboard[i][j] == 0) {
          edge4.push(new Pieces(i, j, chess ^ 3));
        }
        break;
      }
      count4++;
    }
    if (count4 >= n) {
      return {edge : edge4, chess : chess};
    }
    return null;
  }

}


module.exports = ChessData;
