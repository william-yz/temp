'use strict'
const bodyParser = require('body-parser')
const glob = require('glob')
const path = require('path')
function initMiddleware(app) {
  app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

      next();
  });

  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json({
    limit: 1024 * 1024 * 5
  }))

}

function initRouters(app) {
  glob.sync('routers/**/*.js').forEach(file => {
    require(path.resolve(path.join(file)))(app)
  })
}

function init(app) {
  initMiddleware(app)
  initRouters(app)
}
module.exports = {
  initMiddleware,
  initRouters,
  init
}
