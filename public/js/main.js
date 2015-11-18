'use strict'

$(document).ready(init);

function init(){
  $('#createNewUser').click(createNewUser);
  $('#login').click(login);
  $('.home').click(visitHome);
}

function visitHome(){
  var username = $(this).attr('id')

  $.get(`/homes/${username}`)
  .done(function(data){
    var userHome = data.username;

    window.location.replace(`/homes/${username}`)
  }).fail(function(err){
    console.log(err);
  });
}

function login(event){
  event.preventDefault();

  var user = {};
  user.username = $('#username').val();
  user.password = $('#password').val();

  $.post('/users/login', user)
  .done(function(data){
    window.location.replace(`/homes/${user.username}`)
  }).fail(function(err){
    $('#username').val('');
    $('#password').val('');
    swal('Error:', err.responseText, 'error');
  });
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
