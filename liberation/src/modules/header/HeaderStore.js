'use strict';

const state = {
  tableInfo : {
    tableName : 'Init'
  }
};

const mutations = {
  ['ADD'](state, table) {
    state.tableInfo = table;
  }
}

module.exports = {
  state,
  mutations
};
