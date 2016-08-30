'use strict';

const fs = require('fs');
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;
var collection, col2 ;
MongoClient.connect('mongodb://localhost:27017/chifan', function (err, db) {
  collection = db.collection('chifan');
  col2 = db.collection('cai')
  console.log('connected');
});


var today = moment().format('YYYY-MM-DD');
var getUserInfo = function(userId) {
  var collection = db.collection('userInfo');
  collection.find
  return require(storeFolder + userId);
}

var saveRest = function (rest) {
  var data = {
    date : today,
    restaurant : rest
  };
  return collection.update({date: today},data, {
    upsert : true
  });
}

var getAll = function () {
  return col2.find({date : today}).toArray();
}

var getGetRest = function () {
  return collection.findOne({date: today});
}

var saveCai = function (user, cai) {
  var data = {
    user,
    cai,
    date : today
  };
  return col2.update({date: today, user : user}, data, {
    upsert : true
  })
}

var getMyCais = function (user) {
  return col2.find({date: today, user : user}).sort({date: -1}).toArray()
}

var updatePrice = function (body) {
  var p = []
  for (var user in body) {
    p.push(col2.update({user},  {$set : {
      price : body[user]
    }}));
  }
  return Promise.all(p);
}
module.exports = {
  getUserInfo,
  saveRest,
  getAll,
  getGetRest,
  saveCai,
  getMyCais,
  updatePrice
}
