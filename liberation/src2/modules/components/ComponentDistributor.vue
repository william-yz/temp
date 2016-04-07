<template>
    <!-- <component v-for="id in _ids" :is="storedComponents[id].type" :_id="id"></component> -->

    <div :is="thisComponent.type" :_id='_id'></div>

    <div v-if="thisComponent.type==='container'" class="l-container">
      <component-distributor v-for="sub_id in thisComponent.sub_ids" :_id='sub_id'></component-distributor>
    </div>



</template>

<script>
var InputComponent = require('./components/Input');
var PanelComponent = require('./components/Panel');
module.exports = {
  props : ['_id'],

  name : 'component-distributor',

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
      return this.storedComponents[this._id];
    }
  }

}
</script>
