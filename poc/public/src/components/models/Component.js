'use strict';
var _ = require('lodash');







class Component {
  constructor(column) {
    this._meta = {
      column : column
    };

    console.log(inputTemplate(column))
  }

  dragstart() {
    console.log('haha');
  }

  test() {
    // console.log(templateEl);
  }
}


require('Class').add('Component', Component);
module.exports = Component;