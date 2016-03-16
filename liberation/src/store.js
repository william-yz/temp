'use strict';
const HeaderStore = require('./modules/header/HeaderStore');
const ComponentsStore = require('./modules/components/ComponentsStore');
const StyleStore = require('./modules/manager/StyleStore');


Vue.use(Vuex);

module.exports = new Vuex.Store({
  modules : {
    HeaderStore,
    ComponentsStore,
    StyleStore
  },

  middlewares: [require('logger')()]
});
