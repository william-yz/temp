<template>
  <div class='component-container'>
    <component v-for="id in _ids" :is="storedComponents[id].type" :_id="id"></component>
  </div>


</template>

<script>
var InputComponent = require('./input/InputComponent');
module.exports = {
  components: {
    InputComponent: InputComponent
  },

  vuex: {
    getters: {
      storedComponents({ComponentsStore}) {
        return ComponentsStore.storedComponents;
      },

      _ids({ComponentsStore}) {
        return ComponentsStore._ids;
      }
    }
  }

}
</script>
