var _ = require('lodash');
var template = _.template(require('input/views/input'));

class InputView {
  constructor(prop) {
    this._template = template(prop.data);
    this.$rootEl = prop.rootEl;
  }

  render() {
    $rootEl.html()
  }
}

require('Class').add('Input', Input);