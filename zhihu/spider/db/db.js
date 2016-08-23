const mongodb = require('mongodb');

const dbConfig = require('../config/config').db,
    MongoClient = mongodb.MongoClient;
const connectDb = new Promise(function(resolved, rejected) {
  MongoClient.connect(dbConfig.url,
    {
      server : {
        poolSize : 6
      }
    },
    function(err, db) {
      if (err) {
        db.close();
        rejected(err);
      } else {
        resolved(db);
      }
    }
  );
});

const insert = function(collectionName, data) {
  const insert = function(db) {
    return new Promise(function(resolved, rejected) {
      const collection = db.collection(collectionName);
      collection.insert(data, function(err, result) {
        if (err) {
          rejected(err);
        } else {
          // console.log('Save success')
          resolved({
            insertedIds : result.insertedIds
          });
        }
      });
    });
  }

  return connectDb
    .then(insert)
    .catch(function(err) {
      console.log(err);
    });
}

const find = function(collectionName, query) {
  const find = function(db) {
    return new Promise(function(resolved, rejected) {
      const collection = db.collection(collectionName);
      collection.find(query, function(err, result) {
        if (err) {
          rejected(err);
        } else {
          resolved(result);
        }
      });
    });
  }

  return connectDb
    .then(find)
    .catch(function(err) {
      console.log(err);
    });
}

module.exports = {
  connectDb,
  insert,
  find
};
