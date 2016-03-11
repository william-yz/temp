'use strict';
var $ = require('jquery');
var Class = require('Class');

Class.create('Component', {
  rootEl : '.component'
});  


$(function() {
  var columns;
  
    $('#submitBtn').on('click', function() {
    var tableName = $('#tableName').val();

    $.get('/api/table/' + tableName, postSubmit);
  });

  $('.component').on('dragstart', '.d-column-li', function(event) {
     console.log(event);
    event.dataTransfer.setData("id",event.target.id);
  });

  $('.component').on('dragend', '.d-column-li', function(event) {
     // console.log(event);
  });

  $('.view').on('dragover', function(event) {
    // console.log(event);
    event.preventDefault();
  }); 
  $('.view').on('drop', function(event) {
    console.log(event);
  });

  $('.view').on('dragenter', function(event) {
    console.log(event);
    event.preventDefault();
  });
  function postSubmit(data) {
    $('#editor header').html(data.tableName);
    columns = data.columns;
        components = $('.component');

    columns.forEach(function(column) {
      var cmp = '<li id="'+ column.name+'" draggable="true" class="d-column-li">'+
                  '<label class="d-label-block" for="' + column.name + '">' 
                    + column.name +
                  '</label>'+
                  '<input name="'+column.name +'" class="d-column-input" />'+
                '</li>';
      components.append(cmp);
    });
  }









});