<template>
  <div>
    <label for="tableName">Table Name: <input id="tableName" v-model="tableName"></label>
    <button type="button" id="submitBtn" @click="submit">Add</button>
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
            var type = 'PanelComponent',
                sub_ids = [];
            var panel = Vue.Models.ComponentModel.create({type,sub_ids});
            dispatch(TYPE.COMPONENTS_ADD, panel);
            dispatch(TYPE.STYLE_INIT, _.last(panel._id));
            data.columns.forEach(column => {
              var model = Vue.Models.ComponentModel.create(column);
              panel.sub_ids.push(model._id);
              model.type = 'InputComponent';
              dispatch(TYPE.COMPONENTS_ADD, model);
              dispatch(TYPE.STYLE_INIT, _.last(model._id));
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
