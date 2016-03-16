'use strict';


const TYPE = require('../MutationTypes');
const state = {
  _ids : [],
  storedComponents : {
  },

};
var idGenterator = (function* () {
  var n = 0;
  while(true) {
    yield '_id' + n++;
  }
})();

const mutations = {
  [TYPE.ADD_COMPONENT](state, component) {
    var _id = idGenterator.next().value;
    component._id = _id;
    component.type = 'InputComponent';
    state._ids.push(_id);
    state.storedComponents[_id] = component;
  }
}

module.exports = {
  state,
  mutations
};
