'use strict';
const MongoClient = require('mongodb').MongoClient;
const Pieces = require('./Pieces');
var ChessData = require('./ChessData');
const url = 'mongodb://localhost:27017/gomoku';
// const log = require('./log');
class Player {
  constructor(chessData, chess, name ,socket) {
    this.chessData = chessData;
    this.chess = chess;
    this.socket = socket;
    this.name = name;
    MongoClient.connect(url, (err, d) => {
      this.db = d;
      console.log('Player db connected');
      if (err) console.log(err);
    });
  }

  reset() {
    if (this.chess === 1) {
      this.forecast = [new Pieces(7,7,this.chess)];
    } else {
      this.forecast = [];
    }
  }

  move() {
    this.updateForecast();
    var next = this.judge();
    var result = this.chessData.move(next);
    if (this.socket) {
      this.socket.emit('do', this.chessData.last);
    }
    // console.log(this.forecast[0]);
    this.updateForecast();
    return result;
  }

  judge() {
    var l = this.forecast.length;
    var r = Math.floor(Math.random() * l);
    return this.forecast[r];
    // var pList = [],
    //     map = new Map();
    // for (let i = 0; i < this.forecast.length; i ++) {
    //   let key = this.chessData.getForecastString(this.forecast[i]);
    //   map.set(key, i);
    //   let collectionName = 'test'+ (this.chessData.count + 1);
    //   let coll = this.db.collection(collectionName);
    //   pList.push(coll.findOne({_id : key}));
    // }
    // return new Promise((resolve, reject) => {
    //   Promise.all(pList).then(function (err, res) {
    //     res.sort((a, b) => return b.value - a.value);
    //   });
    // })

  }

  getNewPieces(x, y) {
    return new Pieces(x, y, this.chess);
  }

  updateForecast() {
    if (!this.chessData.last) {
      return;
    }
    var l = [];
    var x = this.chessData.last.x,
        y = this.chessData.last.y;
    var chessboard = this.chessData.chessboard;
    if (x - 1 > 0 && chessboard[x - 1][y] === 0)
      l.push(this.getNewPieces(x - 1, y));
    if (x - 1 > 0 && y - 1 > 0 && chessboard[x - 1][y - 1] === 0)
      l.push(this.getNewPieces(x - 1, y - 1))
    if (x - 1 > 0 && y + 1 < 15 && chessboard[x - 1][y + 1] === 0)
      l.push(this.getNewPieces(x - 1, y + 1));
    if (x - 2 > 0 && chessboard[x - 2][y] === 0)
      l.push(this.getNewPieces(x - 2, y));
    if (x + 1 < 15 && chessboard[x + 1][y] === 0)
      l.push(this.getNewPieces(x + 1,y));
    if (x + 1 < 15 && y - 1 > 0 && chessboard[x + 1][y - 1] === 0)
      l.push(this.getNewPieces(x + 1,y - 1));
    if (x + 1 < 15 && y + 1 < 15 && chessboard[x + 1][y + 1] === 0)
      l.push(this.getNewPieces(x + 1,y + 1));
    if (x + 2 < 15 && chessboard[x + 2][y] === 0)
      l.push(this.getNewPieces(x + 2,y));
    if (y - 1 > 0 && chessboard[x][y - 1] === 0)
      l.push(this.getNewPieces(x,y - 1));
    if (y - 2 > 0 && chessboard[x][y - 2] === 0)
      l.push(this.getNewPieces(x,y - 2));
    if (y + 1 < 15 && chessboard[x][y + 1] === 0)
      l.push(this.getNewPieces(x,y + 1));
    if (y + 2 < 15 && chessboard[x][y + 2] === 0)
      l.push(this.getNewPieces(x,y + 2));

    var newForecast = this.forecast.filter(done => {
      return !done.eq(x, y);
    });
    l.forEach(n => {
      if (newForecast.every(done => {
        return !done.eq(n);
      })) {
        newForecast.push(n);
      }
    });
    this.forecast = newForecast;
  }
}

module.exports = Player;
