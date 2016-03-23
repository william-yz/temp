<template>
  <section class="view">
    {{tableName}}
    <component-distributor _id="_id0"></component-distributor>
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
  height 600px;
  float left
  margin  0px 5px
  padding 10px
</style>
