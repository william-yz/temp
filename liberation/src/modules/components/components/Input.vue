<template>
  <div :class="classes" @click="onSelect" :style="styles">
    <label for="" >{{component.name}}</label>
    <input />
  </div>
</template>

<script>
  var TYPE = require('../../MutationTypes');
  const ComponentActions = require('../ComponentActions');
  var actions = {

  };
  module.exports = {
    props : ['_id'],
    vuex : {
      actions : _.merge(ComponentActions,actions),
      getters : {
        storedStyles({StyleStore}) {
          return StyleStore.styles;
        },

        storedComponents({ComponentsStore}) {
          return ComponentsStore.storedComponents;
        }
      }
    },

    computed : {
      classes() {
        return this.storedStyles[this._id].classes;
      },

      styles() {
        return this.storedStyles[this._id].styles;
      },

      component() {
        return this.storedComponents[this._id];
      }
    }
  }
</script>

<style lang="stylus" media="screen" scoped>
.l-selected
  border 1px solid
.l-default
  border none
</style>
