'use strict';


const TYPE = require('../MutationTypes');
const state = {
  selected : false,
  selectedId : '',
  styles : {
  }

};

const mutations = {
  [TYPE.STYLE_INIT](state, _id) {
    var model = Vue.Models.StyleModel.create({
      styles : {
        width : '200px'
      },
      classes : ['l-default']
    });
    Vue.set(state.styles,_id,model);
  },

  [TYPE.COMPONENTS_SELECT](state, _id) {
    state.selected = true;
    if (state.selectedId !== _id) {
      if (state.selectedId) {
        state.styles[state.selectedId].classes.$remove('l-selected');
      }
      state.styles[_id].classes.push('l-selected');
      state.styles[_id].classes.$remove('l-default');
    }
    state.selectedId = _id;
  },

  [TYPE.STYLE_UPDATE](state, updateStyle) {
    _.assign(state.styles[state.selectedId].styles, updateStyle);
  }
}

module.exports = {
  state,
  mutations
};
