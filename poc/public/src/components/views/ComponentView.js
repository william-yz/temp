var inputTemplate = _.template(require('text!components/template/input.html'));

class ComponentView {




  set template(template) {
    this._template = template;
  }

  get template() {
    return this._template;
  }

  render() {
    
  }
}



module.exports = ComponentView;