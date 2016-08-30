'use strict'
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(3001)

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})
