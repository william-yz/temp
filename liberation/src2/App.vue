<template>
  <header-section></header-section>

  <div id="editor">
    <selector></selector>
    <view-panel></view-panel>
    <manager></manager>
  </div>
</template>

<script>
var HeaderSection = require('./modules/header/HeaderSection');
var ViewPanel = require('./modules/view/ViewPanel');
var Manager = require('./modules/manager/Manager');
var Selector = require('./modules/selector/Selector');
module.exports = {
  components: {
    Selector,
    HeaderSection,
    ViewPanel,
    Manager
  }
}
</script>

<style lang="stylus">
body
  background-image linear-gradient(90deg, #83D9C5, #114F44)
  color #fff
header
  height  50px
  font-size 50px
  text-align center

#editor
  height 100%

button, input
    opacity 0.4
    border 1px solid white
    width 100px
    margin 10px

button:hover
    opacity 0.7

label
  display block
</style>
