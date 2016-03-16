<template>
<div class="general">
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
    <input type="number"value="">
  </div>

</div>
</template>

<script>
module.exports = {

}
</script>

<style lang="stylus" media="screen" scoped>
button
  width 80px
  margin inherit

.top-choose,.left-choose
  float left
</style>
