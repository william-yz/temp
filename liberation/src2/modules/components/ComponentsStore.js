'use strict';

const TYPE = require('../MutationTypes');

const state = {
  _ids : [],
  _rootid : '',
  storedComponents : {
  }

};

const mutations = {
  [TYPE.COMPONENTS_ADD](state, component) {
    state._ids.push(component._id);
    Vue.set(state.storedComponents,component._id,component);
  }
}

module.exports = {
  state,
  mutations
};
