<template>
<div class="general" v-show="isSelected">
  <div class="alignment-choose">
    <label>Alignment</label>
    <button type="button" @click="alignmentAdj"  value="none">none</button>
    <button type="button" @click="alignmentAdj" value="left">left</button>
    <button type="button" @click="alignmentAdj" value="right">right</button>
  </div>

  <div class="display-choose">
    <label>Display</label>
    <button type="button" @click="displayAdj"  value="block">block</button>
    <button type="button" @click="displayAdj"  value="inline">inline</button>
    <button type="button" @click="displayAdj"  value="inline-block">inline-block</button>
    <button type="button" @click="displayAdj"  value="none">none</button>
  </div>

  <div class="position-choose">
    <label>Position</label>
    <button type="button" @click="positionAdj" value="static">static</button>
    <button type="button" @click="positionAdj" value="relative">relative</button>
    <button type="button" @click="positionAdj" value="absolute">absolute</button>
    <button type="button" @click="positionAdj" value="fixed">fixed</button>
  </div>
  <div class="top-choose">
    <label>Top</label>
    <input type="number" @change="updatePosition" data-type="top" value="styles.bottom | cut">
  </div>
  <div class="right-choose">
    <label style="">Right</label>
    <input type="number" @change="updatePosition" data-type="right" value="styles.right | cut">
  </div>
  <div class="left-choose">
    <label>Left</label>
    <input type="number" @change="updatePosition" data-type="left" value="styles.left | cut">
  </div>
  <div class="bottom-choose">
    <label>Bottom</label>
    <input type="number" @change="updatePosition" data-type="bottom" value="styles.bottom | cut">
  </div>
  <div class="Width">
    <label>Width</label>
    <input type="number" :value="styles.width | cut" @change="updateWidth">
  </div>
</div>
</template>

<script>
var TYPE = require('../MutationTypes');
module.exports = {
  vuex : {
    getters : {
      styles({StyleStore}) {
        return StyleStore.styles[StyleStore.selectedId].styles;
      },

      isSelected({StyleStore}) {
        return StyleStore.selected;
      }
    },

    actions : {
      updateWidth({dispatch}, e) {
        dispatch(TYPE.STYLE_UPDATE, {
          width : e.target.value + 'px'
        });
      },

      alignmentAdj({dispatch}, e) {
        dispatch(TYPE.STYLE_UPDATE, {
          float : e.target.value
        });
      },

      displayAdj({dispatch}, e) {
        dispatch(TYPE.STYLE_UPDATE, {
          display : e.target.value
        });
      },

      positionAdj({dispatch}, e) {
        dispatch(TYPE.STYLE_UPDATE, {
          position : e.target.value
        });
      },

      updatePosition({dispatch}, e) {debugger;
        dispatch(TYPE.STYLE_UPDATE, {
          [e.target.dataset.type] : e.target.value + 'px'
        });
      }
    }

  },

  computed : {
      styles() {
        return this.styles;
      }
  },

  filters : {
    cut(px) {
      return _.replace(px,'px','');
    }
  }
}
</script>

<style lang="stylus" media="screen" scoped>
button
  width 80px
  margin inherit

.top-choose,.left-choose
  float left
</style>
