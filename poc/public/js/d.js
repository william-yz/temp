$(function() {
  $('#submitBtn').on('click', function() {
    var tableName = $('#tableName').val();

    $.get('/api/table/' + tableName, postSubmit);
  });


  function postSubmit(data) {
    $('#editor header').html(data.tableName);
    var columns = data.columns,
        components = $('.component');
    console.log(columns);
    columns.forEach(function(column) {
      var cmp = '<li draggable="true"><label class="d-label-block" for="' + column.name + '">'+ column.name +'</label><input id="'+ column.name+'" name="'+ column.name +'" class="d-column-input" /></li>';
      components.append(cmp);
    });
  }









});