'use strict';

var _ = require('lodash');


var Class = (function() {
  var managedClass = new Map();

  class Class {

    static add(className, clazz) {
      managedClass.set(className, clazz);
    }

    static remove(className) {
      managedClass.delete(className);
    }

    static get(className) {
      console.log(managedClass.get(className));
      return managedClass.get(className);
    }

    static create(className, prop) {
      var clazz = managedClass.get(className);
      if (clazz  !== undefined && typeof clazz === 'function') {
        return new clazz(prop);
      }
      throw new Error(`Specified class : ${className} no found.`);
    }


  }

  return Class;
})();

module.exports = Class;