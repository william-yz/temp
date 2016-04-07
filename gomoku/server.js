'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(function (req, res, next) {
  // console.log(req.ip);
  // if (req.ip === '::1') {
  //   next();
  // } else {
  //   res.end('You cannot access.');
  // }
  next();
});

app.use('/', express.static(path.resolve('./public')));
app.use('/libs', express.static(path.resolve('./node_modules')));

app.get('/', function(req, res){
  res.sendFile('./public/index.html');
});

const ChessData = require('./ChessData');
const Pieces = require('./Pieces');
const Player = require('./Player');

io.on('connection', function (socket) {

  socket.on('auto', function () {
    var cd = new ChessData();
    cd.reset();
    var p1 = new Player(cd, 1, socket);
    var p2 = new Player(cd, 2, socket);

    var timmer = setInterval(function () {

      if (p1.move()) {
        clearInterval(timmer);
        console.log('p1 win.');
        socket.emit('win','white wins!');
        return;
      }
      if (p2.move()) {
        clearInterval(timmer);
        console.log('p2 win.');
        socket.emit('win','Black wins!');
        return;
      }
    }, 100);
  });

  var computer = function (chess) {
    var cd = new ChessData();
    cd.reset();
    var p = new Player(cd, chess, socket);
    socket.on('pdo', function () {
      if(p.move()) {
        socket.emit('win','white wins!');
        return;
      }
    });
  }
  socket.on('white', computer);
  socket.on('black', computer);


});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
