'use strict';
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/gomoku';
const _ = require('lodash');

class ChessData {
  constructor() {

  }

  reset(cb) {
    var init = () => {
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
      this.indents = [];
    },
    dbConnect = (cb) => {
      MongoClient.connect(url, (err, d) => {
        this.db = d;
        console.log('db connected');
        cb(d);
      });
    }
    if (typeof cb === 'function') {
      init();
      dbConnect(cb);
    } else {
      return new Promise(resolve => {
        init();
        dbConnect(resolve);
      });
    }

  }

  move(pieces) {
    this.chessboard[pieces.x][pieces.y] = pieces.chess;
    this.count ++;
    this.last = pieces;
    this.save();
    var result = this.judge();
    if (result) {
      this.update(pieces.chess);
    }
    return result;
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
  judge() {
    var x = this.last.x,
        y = this.last.y,
        chess = this.last.chess;
    if (this.count < 10) {
      return 0;
    }
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;

    for (var i = x; i >= 0; i--) {
      if (this.chessboard[i][y] != chess) {
        break;
      }
      count1++;
    }
    for (var i = x + 1; i < 15; i++) {
      if (this.chessboard[i][y] != chess) {
        break;
      }
      count1++;
    }
    if (count1 >= 5) {
      return chess;
    }
    //上下判断
    for (var i = y; i >= 0; i--) {
      if (this.chessboard[x][i] != chess) {
        break;
      }
      count2++;
    }
    for (var i = y + 1; i < 15; i++) {
      if (this.chessboard[x][i] != chess) {
        break;
      }
      count2++;
    }
    if (count2 >= 5) {
      return chess;
    }
    //左上右下判断
    for (var i = x, j = y; i >= 0 && j >= 0; i--, j--) {
      if (this.chessboard[i][j] != chess) {
        break;
      }
      count3++;
    }
    for (var i = x + 1, j = y + 1; i < 15 && j < 15; i++, j++) {
      if (this.chessboard[i][j] != chess) {
        break;
      }
      count3++;
    }
    if (count3 >= 5) {
      return chess;
    }
    //右上左下判断
    for (var i = x, j = y; i >= 0 && j < 15; i--, j++) {
      if (this.chessboard[i][j] != chess) {
        break;
      }
      count4++;
    }
    for (var i = x + 1, j = y - 1; i < 15 && j >= 0; i++, j--) {
      if (this.chessboard[i][j] != chess) {
        break;
      }
      count4++;
    }
    if (count4 >= 5) {
      return chess;
    }
    return 0;
  }

}


module.exports = ChessData;
