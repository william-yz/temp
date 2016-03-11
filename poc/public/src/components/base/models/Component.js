'use strict';
var _ = require('lodash'),
    assert = require('assert');






class Component {
  constructor(props) {
    assert.notNullOrUndefined(props);
    assert.notNullOrUndefined(props.rootEl);
    this.$rootEl = props.rootEl;
  }

  dragstart() {
    console.log('haha');
  }

  test() {
    // console.log(templateEl);
  }
}


require('Class').add('Component', Component);