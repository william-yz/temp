$(function () {
  var canvas;
  var context;
  var pTurn = false;
  var chess;
  var isWell = false;
  var img_b = new Image();
  img_b.src = "./black.png";//白棋图片
  var img_w = new Image();
  img_w.src = "./white.png";//黑棋图片

  var chessData = new Array(15);
  for (var x = 0; x < 15; x++) {
      chessData[x] = new Array(15);
      for (var y = 0; y < 15; y++) {
          chessData[x][y] = 0;
      }
  }

  var socket = io();

  socket.on('do', function (msg) {
    pTurn = true;
    down(msg.x, msg.y, msg.chess);
  });

  socket.on('win', function (msg) {
    alert(msg);
  });
  init();
  $('#canvas').on('mousedown', play);
  $('#auto').on('click', function () {
    init();
    socket.emit('auto');
  });
  $('#white').on('click', function () {
    init();
    pTurn = true;
    chess = 1;
    socket.emit('white', 2);
  });
  $('#black').on('click', function () {
    init();
    pTurn = false;
    chess = 2;
    socket.emit('black', 1);
  });

  function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height)
    for (var i = 0; i <= 640; i += 40) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(640, i);
      context.closePath();
      context.stroke();

      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, 640);
      context.closePath();
      context.stroke();
    }
  }


  function play(e) {
    if (!pTurn) {
      return;
    }
    pTurn = false;
    var x = parseInt((e.clientX - 20) / 40);
    var y = parseInt((e.clientY - 20) / 40);

    if (chessData[x][y] != 0) {
      return;
    }
    down(x, y, chess);
    socket.emit('pdo', {x : x, y : y, chess : chess})
  }

  function down(x, y, chess) {
    drawChess(chess, x, y);
  }
  function drawChess(chess, x, y) {
      if (x >= 0 && x < 15 && y >= 0 && y < 15) {
          if (chess == 1) {
              context.drawImage(img_w, x * 40 + 20, y * 40 + 20);//绘制白棋
              chessData[x][y] = 1;
          }
          else {
              context.drawImage(img_b, x * 40 + 20, y * 40 + 20);
              chessData[x][y] = 2;
          }
      }
  }

});
