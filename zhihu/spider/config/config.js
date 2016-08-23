const fs = require('fs')
const path = require('path')
module.exports = {
    db: {
        url : 'mongodb://yangwi-9-w7:27017/spider',
        config : {
            auto_reconnect : true
        }
    },
    cookieFile : 'spider/config/cookie.cookie',

    init: function () {
      // console.log(path.join(process.cwd(), this.cookieFile)))
      return new Promise((resovle, reject) => {
        fs.readFile(path.join(process.cwd(), this.cookieFile), (err, res) => {
          if (err) {
            reject(err)
          } else {
            this.cookie = res.slice(0, res.length -1).toString()
            resovle(this)
          }
        })
      })
    }
}
