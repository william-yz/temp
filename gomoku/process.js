'use strict';
const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/gomoku';

MongoClient.connect(url, function(err, db) {
  var coll = db.collection('stores');
  for (let i = 1; i < 15 * 15; i ++) {
    let chess = i % 2 === 1 ? 1 : 2;
    var map = `
      function() {
        emit(this.data, ${chess}===this.chess);
      }`;
    coll.mapReduce(function() {
      emit(this.data, {win : 1 === this.chess? 1 : 0, total : 1});
    },function (k, vals) {
      var total = vals[0].total;
      var win = 0;
      for (var i in vals) {
          if (i != 0) {
              total ++;
          }
          win += vals[i].win
      }
       return {win : win, total : total};
    },{
      query : {count : i},
      out : 'test' + i
    },function (err, result) {
      console.log('done' + i);
    })
  }
});
