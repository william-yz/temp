module.exports = function (content) {
  require('fs').appendFile('log',content + '\r\n');
}
