'use strict';

var _ = require('lodash');

var assert = function(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
};


assert.notNullOrUndefined = function(test, message) {
  assert(test !==  null && test !== undefined, message || 'Cannot be null or undefined.');
}

module.exports = assert;