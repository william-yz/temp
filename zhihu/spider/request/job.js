'use strict'
const config = require('../config/config')
const db = require('../db/db')
const request = require('./request')

const findOneAndDelete = db => new Promise(function (resovle, reject) {
    db.collection('raw_users')
      .findOneAndDelete({})
      .then(result => {
        if (result.value) {
          resovle({db, userId : result.value.userId})
        } else {
          reject()
        }
      })
  })

const isExists = ({db, userId}) => new Promise(function (resovle, reject) {
  db.collection('all_users')
    .findOne({userId})
    .then(result => {
      if(!result) resovle(userId)
      else reject()
    })})



module.exports = {
  run : () => {
    config.init()
          .then(config => {
            db.connectDb
            .then(findOneAndDelete)
            .catch(() => process.exit(0))
            .then(isExists)
            .then(request.getFollowees(config))
          })
  }

}
