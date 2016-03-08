const express = require('express');
const app = express();
const db = require('./db/db');
const path = require('path');

app.set('view engine', 'swig');
app.set('views', './'); 


app.use('/', express.static(path.resolve('./public')));


app.get('/api/table/:tableName', require('./controller/table.controller').getTableInfo);



app.listen(3000);