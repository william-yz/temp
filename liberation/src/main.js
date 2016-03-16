'use strict';

// require('./styles/main.styl');
const App = require('./App');
const store = require('./store');
new Vue({
  el : 'body',
  components : { App },
  store
})
