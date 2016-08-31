'use strict'
const storage = require('../storage')

module.exports = function (app) {
  app.route('/api/login')
      .post((req, res) => {
        const user = storage.findUser(req.body)
        res.json({
          success: true,
          response: user
        })
      })
}
