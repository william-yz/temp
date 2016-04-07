<template>
  <div>
    <component-distributor :_id="_id1"></component-distributor>
  </div>
</template>

<script>
var ComponentDistributor = require('../ComponentDistributor')
module.exports = {
  components : {
    ComponentDistributor
  }
}
</script>
