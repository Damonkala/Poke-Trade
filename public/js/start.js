'use strict';

$(document).ready(init);

function init(){
  $('#start').click(start);
}

function start(e){
  e.preventDefault();

  var userPrefs = {};

  userPrefs.name = $('#name').val();
  userPrefs.pokemon = $('input[name=startPokemon]:checked').val()

  if (userPrefs.name){
    $.post('/users/update', userPrefs)
    .done(function(authUser){
      console.log(authUser);
      window.location.replace('/homes');
    })
    .fail(function(err){
      console.log(err);
      swal('Oops!', err.responseText, 'error')
    })
  }
}
