<template>
  <div class='component-container'>
    <!-- <component v-for="id in _ids" :is="storedComponents[id].type" :_id="id"></component> -->

    <component :is="thisComponent.type" :_id='_id'>
      <component-distributor :_id='thisComponent.sub_ids[0]'></component-distributor>
    </component>
  </div>


</template>

<script>
var InputComponent = require('./components/Input');
var PanelComponent = require('./components/Panel');
module.exports = {
  props : ['_id'],

  components: {
    InputComponent,
    PanelComponent
  },

  vuex: {
    getters: {
      storedComponents({ComponentsStore}) {
        return ComponentsStore.storedComponents;
      },

      frist_id({ComponentsStore}) {
        return ComponentsStore._ids[0];
      }
    }
  },

  computed: {
    thisComponent() {
      console.log(this.storedComponents[this._id].sub_ids);
      return this.storedComponents[this._id];
    }
  }

}
</script>
