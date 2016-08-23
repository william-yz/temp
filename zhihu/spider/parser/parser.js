
const cheerio = require('cheerio')

const db = require('../db/db')

const parse = page => {
  const $ = cheerio.load(page)
  const mainInfos = $('a.author-link')
  const details = $('div.zm-list-content-medium .details')
  const users = []
  for (let i = 0; i< mainInfos.length; i ++) {
    let mainInfo = mainInfos[i]

    let href = mainInfo.attribs.href
    let userId = href.substring(href.lastIndexOf('/') + 1)
    let nickname = mainInfo.children[0].data

    let detail = details[i]
    let followers = parseInt(detail.children[0].children[0].data)
    let asks = parseInt(detail.children[2].children[0].data)
    let answers = parseInt(detail.children[4].children[0].data)
    let agrees = parseInt(detail.children[6].children[0].data)
    db.connectDb
      .then(db => {
        db.collection('all_users_info').updateOne({userId}, {
          userId,
          nickname,
          href,
          followers,
          asks,
          answers,
          agrees
        }, {upsert : true})
      })
  }
}

const run = () => {
  db.connectDb
    .then(db => {
      db.collection('raw_pages').findOneAndUpdate({handled : {$exists : false}}, {$set : {handled : true}})
      .then(result => {
        if (!result.value.page) {
          process.exit(0)
        }
        parse(result.value.page)
      })
    })
}

setInterval(run, 100)
