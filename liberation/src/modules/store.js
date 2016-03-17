'use strict';
const HeaderStore = require('./header/HeaderStore');
const ComponentsStore = require('./components/ComponentsStore');
const StyleStore = require('./manager/StyleStore');


Vue.use(Vuex);

module.exports = new Vuex.Store({
  modules : {
    HeaderStore,
    ComponentsStore,
    StyleStore
  },

  middlewares: [require('logger')()]
});
