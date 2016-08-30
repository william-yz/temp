'use strict';

const express = require('express');
const app = express();

function f(a,b) {
  return function(req,res,next){
    console.log(a);
    next();
  };
}
function f2(a,b) {
  return function(req,res,next){
    console.log(a);
    next();
  };
}
// app.use(f('abc'),f('zxc'));

app.route('/abc')
    .get( f('ahb'),f2('bbbb'))
    .get((req,res) => {
      res.end('hah')
    })
app.listen(3000);
