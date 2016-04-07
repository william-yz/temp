'use strict';
const TYPE = require('../MutationTypes');

const actions = {
  onSelect(funcs) {
    funcs.dispatch(TYPE.COMPONENTS_SELECT, this._id);
  }
};


module.exports = actions;
