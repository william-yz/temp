<template>
  <section class="view">
    {{tableName}}
    <component-distributor></component-distributor>
  </section>
</template>

<script>
var ComponentDistributor = require('../components/ComponentDistributor');
module.exports = {
  components : {
    ComponentDistributor
  }
}
</script>

<style lang="stylus" media="screen" scoped>
.view
  border 1px #D7FBBC solid
  width  70%
  height 500px
.view
  float left
  margin  0px 5px
</style>
