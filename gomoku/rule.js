'use strict';

var chessData;
chessData = new Array(15);
for (var x = 0; x < 15; x++) {
    chessData[x] = new Array(15);
    for (var y = 0; y < 15; y++) {
        chessData[x][y] = 0;
    }
}

var timekey;
var last = {};
var count = 0;

function judge(x, y, chess) {
  last.x = x;
  last.y = y;
  if (++ count < 10) {
    return 0;
  }
  var count1 = 0;
  var count2 = 0;
  var count3 = 0;
  var count4 = 0;

  for (var i = x; i >= 0; i--) {
    if (chessData[i][y] != chess) {
      break;
    }
    count1++;
  }
  for (var i = x + 1; i < 15; i++) {
    if (chessData[i][y] != chess) {
      break;
    }
    count1++;
  }
  if (count1 >= 5) {
    return chess;
  }
  //上下判断
  for (var i = y; i >= 0; i--) {
    if (chessData[x][i] != chess) {
      break;
    }
    count2++;
  }
  for (var i = y + 1; i < 15; i++) {
    if (chessData[x][i] != chess) {
      break;
    }
    count2++;
  }
  if (count2 >= 5) {
    return chess;
  }
  //左上右下判断
  for (var i = x, j = y; i >= 0 && j >= 0; i--, j--) {
    if (chessData[i][j] != chess) {
      break;
    }
    count3++;
  }
  for (var i = x + 1, j = y + 1; i < 15 && j < 15; i++, j++) {
    if (chessData[i][j] != chess) {
      break;
    }
    count3++;
  }
  if (count3 >= 5) {
    return chess;
  }
  //右上左下判断
  for (var i = x, j = y; i >= 0 && j < 15; i--, j++) {
    if (chessData[i][j] != chess) {
      break;
    }
    count4++;
  }
  for (var i = x + 1, j = y - 1; i < 15 && j >= 0; i++, j--) {
    if (chessData[i][j] != chess) {
      break;
    }
    count4++;
  }
  if (count4 >= 5) {
    return chess;
  }

  return 0;
}

var init = function () {
  timekey = new Date().getTime();
  count = 0;
  for (var x = 0; x < 15; x++) {
      for (var y = 0; y < 15; y++) {
          chessData[x][y] = 0;
      }
  }
}

var getChessData = function () {
  return chessData;
}

var getLast = function () {
  return last;
}
var getTimekey = function () {
  return timekey;
}
var getCount = function () {
  return count;
}

var getString = function () {
  var str = '';
  chessData.forEach(i => {
    i.forEach(j => {
      str += j;
    });
  });
  return str;
}

module.exports = {
  init,
  judge,
  getChessData,
  getLast,
  getTimekey,
  getString,
  getCount
}
