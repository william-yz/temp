  <div>
    <label for="tableName">Table Name: <input id="tableName" value="{data.tableName}"></label>
    <button type="button" id="submitBtn" onclick="{ add }">Add</button>
    <button type="button" id="saveBtn">Save</button>
  </div>
  <style scoped>
  #tableName:focus {
    opacity : 0.7
  }
  </style>
