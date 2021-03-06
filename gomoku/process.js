'use strict';
const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/gomoku';
var processStore = 'stores';
MongoClient.connect(url, function(err, db) {
  var coll = db.collection(processStore);
  for (let i = 1; i < 15 * 15; i ++) {
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
      query : {count : i, chess : {$in : [1,2]}},
      out : 'test' + i
    },function (err, result) {
      console.log('done' + i);
    })
  }
});
