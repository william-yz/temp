'use strict';

// require('./styles/main.styl');
const App = require('./App');
const store = require('./modules/store');
const models = require('./modules/models');
Vue.Models = models;

new Vue({
  el : 'body',
  components : { App },
  store
});
