<template>
  <section class="component">
    {{tableName}}
    <ul>
      <li v-for="col in columns">
        <component-distributor :meta="col" default-type="input"></component-distributor>
      </li>
    </ul>
  </section>
</template>
<script>
var ComponentDistributor = require('./ComponentDistributor');
module.exports = {
  components : {
    ComponentDistributor
  },

  vuex: {
    getters: {
      tableInfo({HeaderStore}) {
        return HeaderStore.tableInfo;
      }
    }
  },
  computed: {
    columns() {
      return this.tableInfo.columns;
    },

    tableName() {
      return this.tableInfo.tableName;
    }
  }
}
</script>

<style lang="stylus" media="screen" scoped>
.component
  float left
  margin  0px 5px

.component
  width 200px
</style>
