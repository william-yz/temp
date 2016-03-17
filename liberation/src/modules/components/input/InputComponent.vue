<template>
  <label for=""></label>
  <input @click="onSelect" :class="classes" :style="styles"/>
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
          console.log(StyleStore);
          return StyleStore.styles;
        }
      }
    },

    computed : {
      classes() {
        return this.storedStyles[this._id].classes;
      },

      styles() {
        return this.storedStyles[this._id].styles;
      }
    }
  }
</script>
