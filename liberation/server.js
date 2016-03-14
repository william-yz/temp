'use strict';
const express = require('express');
const app = express();
const path = require('path');
const consolidate = require('consolidate');

app.engine('.html', consolidate['swig']);
app.set('view engine', 'html');
app.set('views', './modules/views');


app.use('/', express.static(path.resolve('./dist')));

app.get('/', function (req, res) {
  res.render('index');
})
app.get('/api/table/:tableName', require('./modules/mysql/mysql.controller').getTableInfo);



app.listen(3000);
