'use strict';
const express = require('express');
const app = express();
const path = require('path');
const consolidate = require('consolidate');
const config = require('./config/config');
app.engine('.html', consolidate['swig']);
app.set('view engine', 'html');
app.set('views', './modules/views');


app.use('/src', express.static(path.resolve('./src')));

app.get('/', function (req, res) {
  res.render('index', {
    config : config
  });
})
app.get('/api/table/:tableName', require('./modules/mysql/mysql.controller').getTableInfo);



app.listen(3000);
