'use strict'

$(document).ready(init);

function init(){
  $('#createNewUser').click(createNewUser);
}

function createNewUser(event){
  event.preventDefault();
  if ($('#passconf').val() !== $('#newPassword').val()){
    debugger;
    alert('Passwords do not match');
    return;
  }

  var newUser = {};
  newUser.username = $('#newUsername').val();
  newUser.password = $('#newPassword').val();
  newUser.startPokemon = $('input[name="startPokemon"]:checked').val()

  $.post('/users/register', newUser)
  .done(function(data){
    console.log(data);
  }).fail(function(err){
    console.log(err);
  });
}
