'use strict';
var $ = require('jquery');
var Class = require('Class');


$(function() {
  
  
    $('#submitBtn').on('click', function() {
    var tableName = $('#tableName').val();

    $.get('/api/table/' + tableName, postSubmit);
  });

  $('.component').on('dragstart', '.d-column-li', function(event) {
    // console.log(event);
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
    var columns = data.columns,
        components = $('.component');

    columns.forEach(function(column) {
      Class.create('Component',column);
      var cmp = '<li draggable="true" class="d-column-li" data-columns="columns">'+
                  '<label class="d-label-block" for="' + column.name + '">' 
                    + column.name +
                  '</label>'+
                  '<input id="'+ column.name+'" name="'+column.name +'" class="d-column-input" />'+
                '</li>';
      components.append(cmp);
    });
  }









});