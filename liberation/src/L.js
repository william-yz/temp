'use strict';
var _ = require('lodash');

function L() {

}

Object.defineProperty(L, 'Model', {
  value: function (name) {
    function Model() {

    }
    return Model;
  },
  writable: false,
  configurable: false
});

Object.defineProperty(L.Model, 'extend', {
  value: function (prop) {
    L.Model.__prop__ = prop;
    function NewModel() {

    }
    NewModel.__prop__ = _.merge(this.__prop__,prop);
    return NewModel;
  },
  writable: false,
  configurable: false
});

var B = L.Model.extend({haha:123});
console.log(new B().haha);
var C = B.extend({hehe:1234});
console.log(C);
