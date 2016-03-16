<template>
  <div>
    <label for="tableName">Table Name: <input id="tableName" v-model="tableName"></label>
    <button type="button" id="submitBtn" @click="submit">Submit</button>
    <button type="button" id="saveBtn" @click="save" >Save</button>
  </div>
</template>

<script>
  var TYPE = require('../MutationTypes');
  module.exports = {
    data() {
      return {
        tableName : 'course'
      };
    },

    vuex : {

      actions : {
        submit({ dispatch, state }) {
          $.get('/api/table/' + this.tableName, function (data) {
            data.columns.forEach(column => {
              dispatch(TYPE.ADD_COMPONENT, column);
            });
          });
        }
      }
    }
  }
</script>

<style lang="stylus" media="screen" scoped>



#tableName:focus
  opacity 0.7
</style>
