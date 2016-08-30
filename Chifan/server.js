'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./users');
const store = require('./store');
var crypto = require('crypto');
var key = 'hahahohohoheheheh'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.set('view engine', 'jade')
app.set('views', './')


app.use('/', express.static('./'));

app.use((req, res, next) => {
  if (req.path === '/login' || req.path === '/admin') {
    next();
  } else {
    var decipher = crypto.createDecipher('aes192',key);
    var decrypted = decipher.update(req.cookies.chifande, 'base64', 'utf8');
    decrypted += decipher.final();
    console.log(decrypted);
    if (users.exist(decrypted)) {
      req.user = decrypted;
      next()
    } else {
      res.redirect('/');
    }
  }
})


app.post('/login', (req, res) => {
  var userId = req.body.user;
  if (users.check(userId, req.body.password)) {
    var cipher = crypto.createCipher('aes192',key);
    var encrypted = cipher.update(userId, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    res.cookie('chifande', encrypted);
    // var userInfo = store.getUserStore(userId);
    res.render('main');
  } else {
    res.send('No this user');
  }
});

app.get('/order', (req, res) => {
  store.getGetRest().then(restaurant => res.render('order', {
    data : restaurant
  }));
});

app.post('/order', (req, res) => {
    var cai = req.body.cai;
    store.saveCai(req.user, cai)
         .then(() => res.redirect('/main'));
});

app.get('/admin', (req, res) => {
  var key = req.query,
      d = new Date(),
      h = d.getHours(),
      m = d.getMinutes();
  if (key[m - h] === '') {
    store.getAll()
         .then(result => {
           store.getGetRest()
                .then(rest => {
                  result.restaurant = rest.restaurant;
                  res.render('admin', {result});
                })

         });
  } else {
    res.send('Gun');
  }
});

function deirectAdmin(res) {
  return function () {
    var d = new Date(),
    h = d.getHours(),
    m = d.getMinutes();
    res.redirect('/admin?' + (m - h));
  }
}
app.post('/rest', (req, res) => {
  store.saveRest(req.body.restaurant)
       .then(deirectAdmin(res))
})

app.get('/main', (req, res) => {
  store.getMyCais(req.user)
      .then(cais => {
        var paid = {}, nopay = {}, dates = [];
        cais.forEach(cai => {
          console.log(cai);
          if (!~dates.indexOf(cai.date)) {
            dates.push(cai.date);
          }
          if (cai.paid) {
            paid[cai.date]={
              cai : cai.cai,
              price : cai.price
            };
          } else {
            nopay[cai.date]={
              cai : cai.cai,
              price : cai.price
            };
          }
          console.log({paid, nopay,dates});
        });
        res.render('main', {paid, nopay,dates})
      });
});
app.post('/update', (req, res) => {
  store.updatePrice(req.body)
       .then(deirectAdmin(res))
})

app.listen(7777);
