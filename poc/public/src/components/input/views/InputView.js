var _ = require('lodash');
var template = _.template(require('components/input/template/input'));
var Class = require('Class');

class InputView extends Class.get('ComponentView') {
  constructor(prop) {
    super(prop);
    this._template = template(prop.data);
    
  }

  render() {
    $rootEl.html()
  }
}


Class.add('Input', InputView);