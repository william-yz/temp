'use strict';
const ComponentModel = require('./components/ComponentModel');
const StyleModel = require('./manager/StyleModel');
const modules = {
  ComponentModel,
  StyleModel
};

var idGenterator = (function* () {
  var n = 0;
  while(true) {
    yield '_id' + n++;
  }
})();

var Model = function (config) {
  var modules = config.modules;
  for (var key in modules) {
    var theModule = modules[key];
    if (!theModule && typeof(theModule) !== 'object') {
      throw new Error('Error in Model('+ key +') Config. Model must be an Object (Object or Array)');
    }
    this[key] = _.create(Model.prototype, {
      propConfigs : theModule
    });
  }
};


Model.prototype.create = function (props) {
  var propConfigs = this.propConfigs,
      propNames,
      model = {};
  if (propConfigs instanceof Array) {
    propNames = propConfigs;
  } else {
    propNames = Object.getOwnPropertyNames(propConfigs);
  }
  propNames.forEach(function (propName) {
    var propConfig = propConfigs[propName],
        prop = props[propName],
        propType = 'none',
        propRequired = false;
    if (typeof(propConfig) === 'string') {
      propType = propConfig;
    }
    if (typeof(propConfig) === 'object') {
      propType = propConfig.type;
      propRequired = propConfig.propRequired === undefined ? false : propConfig.propRequired;
    }
    if (prop === undefined) {
      if (propRequired) {
        throw new Error('Property : ' + propName + 'is required.');
      } else {
        if (propType !== 'none' && typeof(prop) !== propType) {
          throw new Error('Property : ' + propName + ', defined type:' + propType + ', actrual :' +  typeof(prop));
        }
        if (propName === '_id' && !prop) {
          model[propName] = idGenterator.next().value;
        } else {
          model[propName] = null;
        }
      }
    } else {
      model[propName] = prop;
    }
  });
  return model;
}



module.exports = new Model({
  modules
});
