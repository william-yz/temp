<template>
<div class="general" v-show="isSelected">
  <div class="alignment-choose">
    <label>Alignment</label>
    <button type="button">none</button>
    <button type="button">left</button>
    <button type="button">right</button>
  </div>

  <div class="display-choose">
    <label>Display</label>
    <button type="button">block</button>
    <button type="button">inline</button>
    <button type="button">inline-block</button>
    <button type="button">none</button>
  </div>

  <div class="position-choose">
    <label>Position</label>
    <button type="button">Static</button>
    <button type="button">relative</button>
    <button type="button">absolute</button>
    <button type="button">fixed</button>
  </div>
  <div class="top-choose">
    <label>Top</label>
    <input type="number"value="">
  </div>
  <div class="right-choose">
    <label style="">Right</label>
    <input type="number"value="">
  </div>
  <div class="left-choose">
    <label>Left</label>
    <input type="number"value="">
  </div>
  <div class="bottom-choose">
    <label>Bottom</label>
    <input type="number" value="">
  </div>
  <div class="Width">
    <label>Width</label>
    <input type="number" :value="width | cut" @change="updateWidth">
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
        })
      }
    }

  },

  computed : {
      width() {
        return this.styles.width;
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
