'use strict';
var Class = require('Class');


class Input extends Class.get('Component') {
  constructor(props) {
    super(props);
    this._meta = {
      column : prop.column
    };
  }

  dragstart() {
    console.log('haha');
  }

  test() {
    // console.log(templateEl);
  }
}

Class.add('Input', Input);