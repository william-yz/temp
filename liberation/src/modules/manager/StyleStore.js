'use strict';


const TYPE = require('../MutationTypes');
const state = {
  selected : false,
  selectedId : '',
  styles : {
  },

};
var idGenterator = (function* () {
  var n = 0;
  while(true) {
    yield '_id' + n++;
  }
})();

const mutations = {
  [TYPE.SELECT_COMPONENT](state, _id) {
    state.selected = true;
    state.selectedId = _id;
  }
}

module.exports = {
  state,
  mutations
};
