
const job = require('./request/job')


// config.init()
// .then(request.getFollowees('yang-zhe-38-13'))
// // .then(request.run('https://www.zhihu.com/node/ProfileFolloweesListV2'))
// .catch(console.log)

setInterval(function () {
  job.run()
}, 5000)
