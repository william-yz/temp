<template>
  <header-section></header-section>

  <div id="editor">
    <view-panel></view-panel>
    <components></components>
  </div>
</template>

<script>
var headerSection = require('./modules/header/HeaderSection');
var viewPanel = require('./modules/view/ViewPanel');
var Components = require('./modules/components/Components');
module.exports = {
  components: {
    headerSection,
    viewPanel,
    Components
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


</style>
