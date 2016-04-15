'use strict';
const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/gomoku';
var processStore = 'stores';
var fromname = 'test';
var toname = 'p';
MongoClient.connect(url, function(err, db) {

  for (let i = 1; i < 15 * 15; i ++) {
    var from = db.collection(fromname + i);
    var to = db.collection(toname + i);

    let chess = i % 2 === 1 ? 1 : 2;
    coll.mapReduce(function() {
      emit(this.data, {white : 1 === this.chess? 1 : 0, black : 1 === this.chess? 0 : 1});
    },function (k, vals) {
      var black = vals[0].black;
      var white = vals[0].white;
      for (var i in vals) {
          if (i != 0) {
              white += vals[i].white;
              black += vals[i].black;
          }
      }
       return {white : white, black : black};
    },{
      query : {count : i},
      out : 'test' + i
    },function (err, result) {
      console.log('done' + i);
    })
  }
});
