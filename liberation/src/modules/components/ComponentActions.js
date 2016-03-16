'use strict';
const TYPE = require('../MutationTypes');

const actions = {
  onSelect(funcs) {
    funcs.dispatch(TYPE.SELECT_COMPONENT, this._id);
  }
};


module.exports = actions;
