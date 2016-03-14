<template>
  <div>
    <label for="tableName">Table Name: <input id="tableName" v-model="tableName"></label>
    <button type="button" id="submitBtn" @click="submit">Submit</button>
    <button type="button" id="saveBtn" @click="save" >Save</button>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        tableName : 'course'
      };
    },
    methods : {
      submit : function (event) {
        $.get('/api/table/' + this.tableName, function (data) {
          console.log(data);
        })
      }
    }
  }
</script>

<style lang="stylus" media="screen" scoped>
button, input
  opacity 0.4
  border 1px solid white
  width 100px
  margin 10px

#submitBtn:hover
  opacity 0.7


#tableName:focus
  opacity 0.7
</style>
