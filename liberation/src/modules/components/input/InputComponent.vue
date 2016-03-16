<template>
  <label for=""></label>
  <input @click="onSelect" />
</template>

<script>
  var TYPE = require('../../MutationTypes');
  const ComponentActions = require('../ComponentActions');
  var actions = {

  };
  console.log(_.merge(ComponentActions,actions) );
  module.exports = {
    props : ['_id'],
    vuex : {
      actions : _.merge(ComponentActions,actions)
    }
  }
</script>
